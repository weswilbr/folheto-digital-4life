import React from 'react';
import type { FlyerData } from '../types';
import { Upload, X } from 'lucide-react';

interface CompanyEditorProps {
  flyerData: FlyerData;
  onUpdate: (updates: Partial<FlyerData>) => void;
}

export const CompanyEditor: React.FC<CompanyEditorProps> = ({ flyerData, onUpdate }) => {
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({
          company: {
            ...flyerData.company,
            logo: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Informações da Empresa</h3>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nome da Empresa *
          </label>
          <input
            type="text"
            value={flyerData.company.name}
            onChange={(e) =>
              onUpdate({
                company: { ...flyerData.company, name: e.target.value },
              })
            }
            placeholder="Ex: 4Life Brasil"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Título do Folheto *
          </label>
          <input
            type="text"
            value={flyerData.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Ex: Catálogo de Produtos 2024"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Subtítulo (opcional)
          </label>
          <input
            type="text"
            value={flyerData.subtitle || ''}
            onChange={(e) => onUpdate({ subtitle: e.target.value })}
            placeholder="Ex: Transformando vidas através da saúde"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Logo da Empresa
          </label>
          <div className="flex items-start gap-4">
            {flyerData.company.logo ? (
              <div className="relative">
                <img
                  src={flyerData.company.logo}
                  alt="Logo"
                  className="w-32 h-32 object-contain rounded-lg border-2 border-slate-200 bg-white p-2"
                />
                <button
                  onClick={() =>
                    onUpdate({
                      company: { ...flyerData.company, logo: undefined },
                    })
                  }
                  className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <Upload size={24} className="text-slate-400 mb-2" />
                <span className="text-xs text-slate-500 text-center px-2">
                  Fazer upload
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <h4 className="text-md font-semibold text-slate-700 mb-4">Contato</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Telefone
              </label>
              <input
                type="text"
                value={flyerData.company.contact?.phone || ''}
                onChange={(e) =>
                  onUpdate({
                    company: {
                      ...flyerData.company,
                      contact: {
                        ...flyerData.company.contact,
                        phone: e.target.value,
                      },
                    },
                  })
                }
                placeholder="(11) 9999-9999"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={flyerData.company.contact?.email || ''}
                onChange={(e) =>
                  onUpdate({
                    company: {
                      ...flyerData.company,
                      contact: {
                        ...flyerData.company.contact,
                        email: e.target.value,
                      },
                    },
                  })
                }
                placeholder="contato@empresa.com"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Website
              </label>
              <input
                type="text"
                value={flyerData.company.contact?.website || ''}
                onChange={(e) =>
                  onUpdate({
                    company: {
                      ...flyerData.company,
                      contact: {
                        ...flyerData.company.contact,
                        website: e.target.value,
                      },
                    },
                  })
                }
                placeholder="www.empresa.com.br"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Endereço
              </label>
              <input
                type="text"
                value={flyerData.company.contact?.address || ''}
                onChange={(e) =>
                  onUpdate({
                    company: {
                      ...flyerData.company,
                      contact: {
                        ...flyerData.company.contact,
                        address: e.target.value,
                      },
                    },
                  })
                }
                placeholder="Rua Example, 123 - Cidade/UF"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
