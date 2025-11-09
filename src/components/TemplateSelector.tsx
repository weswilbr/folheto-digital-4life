import React from 'react';
import type { FlyerData } from '../types';
import { Layout, LayoutGrid, LayoutList, Sparkles } from 'lucide-react';

interface TemplateSelectorProps {
  flyerData: FlyerData;
  onUpdate: (updates: Partial<FlyerData>) => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Design limpo e atual com grid de produtos',
    icon: LayoutGrid,
  },
  {
    id: 'classic',
    name: 'Clássico',
    description: 'Layout tradicional com destaque visual',
    icon: Layout,
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Simplicidade e elegância',
    icon: LayoutList,
  },
  {
    id: 'vibrant',
    name: 'Vibrante',
    description: 'Cores fortes e design impactante',
    icon: Sparkles,
  },
] as const;

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ flyerData, onUpdate }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Templates de Layout</h3>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Escolha um Template
        </label>

        <div className="grid grid-cols-2 gap-4">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <button
                key={template.id}
                onClick={() => onUpdate({ template: template.id as FlyerData['template'] })}
                className={`p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 ${
                  flyerData.template === template.id
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    flyerData.template === template.id ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 mb-1">{template.name}</h4>
                    <p className="text-xs text-slate-600">{template.description}</p>
                  </div>
                </div>
                {flyerData.template === template.id && (
                  <div className="mt-3 text-xs font-medium text-blue-600 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    Selecionado
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            💡 <strong>Dica:</strong> Cada template tem um layout diferente. Experimente todos e veja qual combina melhor com seus produtos!
          </p>
        </div>
      </div>
    </div>
  );
};
