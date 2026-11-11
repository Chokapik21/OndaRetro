import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit3, X } from 'lucide-react';

const initialFormState = {
  nombre_onda_retro: '',
  artista: '',
  genero: '',
  precio: '',
  cantidad: '',
  disponible: true
};

export default function OndaRetroForm({ onSubmit, itemToEdit, onCancelEdit, loading }) {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        nombre_onda_retro: itemToEdit.nombre_onda_retro || '',
        artista: itemToEdit.artista || '',
        genero: itemToEdit.genero || '',
        precio: itemToEdit.precio || '',
        cantidad: itemToEdit.cantidad || '',
        disponible: itemToEdit.disponible ?? true
      });
    } else {
      setFormData(initialFormState);
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      precio: parseFloat(formData.precio),
      cantidad: parseInt(formData.cantidad, 10)
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          {itemToEdit ? <Edit3 className="w-5 h-5 text-purple-400" /> : <PlusCircle className="w-5 h-5 text-purple-400" />}
          {itemToEdit ? `Modificar Registro #${itemToEdit.id_onda_retro}` : 'Ingresar Nueva Obra'}
        </h2>
        {itemToEdit && (
          <button
            onClick={onCancelEdit}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg"
          >
            <X className="w-4 h-4" /> Cancelar Edición
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Nombre / Título</label>
          <input
            type="text"
            name="nombre_onda_retro"
            required
            value={formData.nombre_onda_retro}
            onChange={handleChange}
            placeholder="Ej. Daltonico"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Artista / Autor</label>
            <input
              type="text"
              name="artista"
              required
              value={formData.artista}
              onChange={handleChange}
              placeholder="Ej. Enjambre"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Género</label>
            <input
              type="text"
              name="genero"
              required
              value={formData.genero}
              onChange={handleChange}
              placeholder="Ej. Rock / Pop"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Precio ($)</label>
            <input
              type="number"
              name="precio"
              min="0"
              step="0.01"
              required
              value={formData.precio}
              onChange={handleChange}
              placeholder="1000"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Cantidad (Stock)</label>
            <input
              type="number"
              name="cantidad"
              min="0"
              required
              value={formData.cantidad}
              onChange={handleChange}
              placeholder="23"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="disponible"
            name="disponible"
            checked={formData.disponible}
            onChange={handleChange}
            className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
          <label htmlFor="disponible" className="text-xs font-medium text-slate-300 cursor-pointer">
            Disponible para distribución / venta
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-lg transition duration-200"
        >
          {loading ? 'Procesando...' : itemToEdit ? 'Guardar Modificación (PUT)' : 'Registrar (POST)'}
        </button>
      </form>
    </div>
  );
}