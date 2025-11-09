import React from 'react';
import type { FlyerData } from '../types';
import { Palette } from 'lucide-react';

interface StyleEditorProps {
  flyerData: FlyerData;
  onUpdate: (updates: Partial<FlyerData>) => void;
}

const colorPresets = [
  {
    name: '4Life Classic',
    primary: '#8B1538',
    secondary: '#FFD700',
    accent: '#1a1a1a',
  },
  {
    name: 'Azul Profissional',
    primary: '#2563eb',
    secondary: '#10b981',
    accent: '#f59e0b',
  },
  {
    name: 'Verde Saúde',
    primary: '#059669',
    secondary: '#3b82f6',
    accent: '#8b5cf6',
  },
  {
    name: 'Roxo Moderno',
    primary: '#7c3aed',
    secondary: '#ec4899',
    accent: '#f97316',
  },
  {
    name: 'Laranja Energia',
    primary: '#ea580c',
    secondary: '#0891b2',
    accent: '#84cc16',
  },
  {
    name: 'Rosa Elegante',
    primary: '#db2777',
    secondary: '#8b5cf6',
    accent: '#14b8a6',
  },
];

export const StyleEditor: React.FC<StyleEditorProps> = ({ flyerData, onUpdate }) => {
  const handleColorPresetSelect = (preset: typeof colorPresets[0]) => {
    onUpdate({
      colors: {
        primary: preset.primary,
        secondary: preset.secondary,
        accent: preset.accent,
      },
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Palette size={24} />
        Estilo e Cores
      </h3>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
        {/* Color Presets */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Esquemas de Cores Prontos
          </label>
          <div className="grid grid-cols-2 gap-3">
            {colorPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleColorPresetSelect(preset)}
                className={`p-4 border-2 rounded-lg hover:border-blue-500 transition-all ${
                  flyerData.colors.primary === preset.primary
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: preset.primary }}
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: preset.secondary }}
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: preset.accent }}
                  />
                </div>
                <p className="text-sm font-medium text-slate-700">{preset.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="pt-6 border-t border-slate-200">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Cores Personalizadas
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2">
                Cor Principal
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={flyerData.colors.primary}
                  onChange={(e) =>
                    onUpdate({
                      colors: { ...flyerData.colors, primary: e.target.value },
                    })
                  }
                  className="w-12 h-12 rounded-lg cursor-pointer border-2 border-slate-200"
                />
                <input
                  type="text"
                  value={flyerData.colors.primary}
                  onChange={(e) =>
                    onUpdate({
                      colors: { ...flyerData.colors, primary: e.target.value },
                    })
                  }
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2">
                Cor Secundária
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={flyerData.colors.secondary}
                  onChange={(e) =>
                    onUpdate({
                      colors: { ...flyerData.colors, secondary: e.target.value },
                    })
                  }
                  className="w-12 h-12 rounded-lg cursor-pointer border-2 border-slate-200"
                />
                <input
                  type="text"
                  value={flyerData.colors.secondary}
                  onChange={(e) =>
                    onUpdate({
                      colors: { ...flyerData.colors, secondary: e.target.value },
                    })
                  }
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-2">
                Cor de Destaque
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={flyerData.colors.accent}
                  onChange={(e) =>
                    onUpdate({
                      colors: { ...flyerData.colors, accent: e.target.value },
                    })
                  }
                  className="w-12 h-12 rounded-lg cursor-pointer border-2 border-slate-200"
                />
                <input
                  type="text"
                  value={flyerData.colors.accent}
                  onChange={(e) =>
                    onUpdate({
                      colors: { ...flyerData.colors, accent: e.target.value },
                    })
                  }
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
