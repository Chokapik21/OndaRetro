import React from 'react';
import { RefreshCw, Edit2, Trash2, Library } from 'lucide-react';

export default function OndaRetroList({ items, onRefresh, onEdit, onDelete, loading }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
        <h2 className="font-bold text-white flex items-center gap-2 text-base">
          <Library className="w-5 h-5 text-purple-400" />
          Consulta General (GET /api/OndaRetro)
        </h2>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Actualizar Lista
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 uppercase text-xs font-semibold border-b border-slate-800">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Artista</th>
              <th className="px-6 py-3">Género</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Cantidad</th>
              <th className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {items.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                  No hay registros disponibles en la memoria del Backend.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id_onda_retro} className="hover:bg-slate-800/30 transition">
                  <td className="px-6 py-4 font-mono text-purple-400 font-bold">#{item.id_onda_retro}</td>
                  <td className="px-6 py-4 text-white font-medium">{item.nombre_onda_retro}</td>
                  <td className="px-6 py-4">{item.artista}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-800 text-purple-300 border border-slate-700">
                      {item.genero}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-emerald-400">${item.precio}</td>
                  <td className="px-6 py-4 font-mono">{item.cantidad} un.</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-1.5 text-slate-400 hover:text-purple-400 hover:bg-slate-800 rounded-lg transition"
                        title="Modificar (PUT)"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id_onda_retro)}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
                        title="Eliminar (DELETE)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}