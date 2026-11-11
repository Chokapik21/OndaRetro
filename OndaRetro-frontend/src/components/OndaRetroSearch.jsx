import React, { useState } from 'react';
import { Search, Info } from 'lucide-react';

export default function OndaRetroSearch({ onSearch, searchResult, loading }) {
  const [searchId, setSearchId] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      onSearch(searchId.trim());
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
        <Search className="w-5 h-5 text-indigo-400" />
        Consulta por ID (GET /api/OndaRetro/{'{id}'})
      </h2>

      <form onSubmit={handleSearchSubmit} className="flex gap-3 mb-4">
        <input
          type="number"
          min="1"
          placeholder="Ingrese ID a consultar (ej. 1)"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {searchResult && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-sm animate-fadeIn">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="font-mono text-purple-400 font-bold">ID #{searchResult.id_onda_retro}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${searchResult.disponible ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
              {searchResult.disponible ? 'Disponible' : 'No disponible'}
            </span>
          </div>
          <p className="text-white font-medium text-base">{searchResult.nombre_onda_retro}</p>
          <div className="grid grid-cols-2 text-xs text-slate-400 gap-2">
            <p><strong className="text-slate-300">Artista:</strong> {searchResult.artista}</p>
            <p><strong className="text-slate-300">Género:</strong> {searchResult.genero}</p>
            <p><strong className="text-slate-300">Precio:</strong> ${searchResult.precio}</p>
            <p><strong className="text-slate-300">Stock:</strong> {searchResult.cantidad} un.</p>
          </div>
        </div>
      )}
    </div>
  );
}