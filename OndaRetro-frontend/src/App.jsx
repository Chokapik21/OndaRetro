import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Radio, Terminal } from 'lucide-react';
import { 
  checkHealth, 
  getOndaRetro, 
  getOndaRetroById, 
  createOndaRetro, 
  updateOndaRetro, 
  deleteOndaRetro 
} from './services/OndaRetroService';

import LibreriaForm from './components/OndaRetroForm';
import LibreriaList from './components/OndaRetroList';
import LibreriaSearch from './components/OndaRetroSearch';

export default function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('checking'); // 'online' | 'offline'
  const [rawResponse, setRawResponse] = useState(null); // Presentación en pantalla de Payload JSON

  useEffect(() => {
    initIntegration();
  }, []);

  const notify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const initIntegration = async () => {
    setLoading(true);
    try {
      const health = await checkHealth();
      setConnectionStatus('online');
      setRawResponse(health);
      await loadAllItems();
    } catch (error) {
      setConnectionStatus('offline');
      setRawResponse({ error: "No fue posible conectarse con el Backend API Python en http://127.0.0.1:7000" });
      notify('error', '✕ No fue posible conectarse con el Backend');
    } finally {
      setLoading(false);
    }
  };

const loadAllItems = async () => {
    setLoading(true);
    try {
      const res = await getOndaRetro();
      // Si el backend responde una lista directa o un objeto con propiedad data
      const itemsList = Array.isArray(res) ? res : (res?.data || []);
      
      setItems(itemsList);
      setRawResponse(res);
      setConnectionStatus('online');
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    setLoading(true);
    try {
      if (editingItem) {
        // PUT
        const res = await updateOndaRetro(editingItem.id_onda_retro, formData);
        setRawResponse(res);
        notify('success', 'Modificación realizada correctamente');
        setEditingItem(null);
      } else {
        // POST
        const res = await createOndaRetro(formData);
        setRawResponse(res);
        notify('success', 'Ingreso realizado correctamente');
      }
      await loadAllItems();
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

const handleSearchById = async (id) => {
    setLoading(true);
    setSearchResult(null);
    try {
      const res = await getOndaRetroById(id);
      // Extrae la entidad sea cual sea la estructura de retorno del service
      const itemFound = res.data !== undefined ? res.data : res;
      
      setSearchResult(itemFound);
      setRawResponse(res);
      notify('success', `Consulta por ID #${id} exitosa`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setRawResponse(error.response.data || { detail: "OndaRetro no encontrada" });
        notify('warning', 'OndaRetro no encontrada');
      } else {
        handleApiError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`¿Confirmar eliminación de la onda retro ID #${id}?`)) return;
    setLoading(true);
    try {
      const res = await deleteOndaRetro(id);
      setRawResponse(res);
      notify('success', 'Eliminación realizada correctamente');
      await loadAllItems();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        notify('warning', 'OndaRetro no encontrada para eliminar');
      } else {
        handleApiError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error) => {
    if (!error.response) {
      setConnectionStatus('offline');
      setRawResponse({ error: "No fue posible conectarse con el Backend" });
      notify('error', 'No fue posible conectarse con el Backend');
    } else {
      setRawResponse(error.response.data);
      notify('error', `Error HTTP ${error.response.status}: ${error.response.data?.detail || 'Error en la petición'}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-600 p-2 rounded-xl text-white">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-white">OndaRetro – Frontend Web</h1>
              <p className="text-xs text-slate-400">Api Onda Retro</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 border ${
              connectionStatus === 'online' 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-red-500/10 text-red-400 border-red-500/30'
            }`}>
              <span className={`w-2 h-2 rounded-full ${connectionStatus === 'online' ? 'bg-emerald-400 animate-ping' : 'bg-red-500'}`}></span>
              {connectionStatus === 'online' ? 'Conectado a Backend (7000)' : 'Sin Conexión con Backend'}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Notificaciones según requerimienton */}
        {notification && (
          <div className={`p-4 rounded-xl border flex items-center gap-3 animate-fadeIn ${
            notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' :
            notification.type === 'warning' ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' :
            'bg-red-500/10 border-red-500/40 text-red-400'
          }`}>
            {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
            {notification.type === 'warning' && <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
            {notification.type === 'error' && <XCircle className="w-5 h-5 flex-shrink-0" />}
            <p className="text-sm font-semibold">{notification.message}</p>
          </div>
        )}

        {/* Paneles Superiores (Formulario y Búsqueda) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LibreriaForm
            onSubmit={handleCreateOrUpdate}
            itemToEdit={editingItem}
            onCancelEdit={() => setEditingItem(null)}
            loading={loading}
          />
          
          <div className="space-y-6">
            <LibreriaSearch
              onSearch={handleSearchById}
              searchResult={searchResult}
              loading={loading}
            />

            {/* Consola de Visualización del Payload de Respuesta JSON */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                Respuesta RAW del Backend (JSON Response):
              </h3>
              <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto border border-slate-800 max-h-48">
                {rawResponse ? JSON.stringify(rawResponse, null, 2) : '// Esperando ejecución de operación...'}
              </pre>
            </div>
          </div>
        </div>

        {/* Listado General */}
        <LibreriaList
          items={items}
          onRefresh={loadAllItems}
          onEdit={(item) => setEditingItem(item)}
          onDelete={handleDelete}
          loading={loading}
        />
      </main>
    </div>
  );
}