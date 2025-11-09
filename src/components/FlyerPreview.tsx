import React from 'react';
import type { FlyerData } from '../types';
import { Phone, Mail, Globe, MapPin, Check } from 'lucide-react';

interface FlyerPreviewProps {
  flyerData: FlyerData;
}

export const FlyerPreview: React.FC<FlyerPreviewProps> = ({ flyerData }) => {
  const { company, products, title, subtitle, colors } = flyerData;

  return (
    <div
      id="flyer-preview"
      className="print-page bg-white shadow-2xl"
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <div
        className="p-8 text-white"
        style={{ backgroundColor: colors.primary || '#2563eb' }}
      >
        <div className="flex items-center justify-between mb-6">
          {company.logo && (
            <img
              src={company.logo}
              alt={company.name}
              className="h-16 w-auto object-contain bg-white rounded-lg p-2"
            />
          )}
          <div className="text-right">
            <h1 className="text-4xl font-bold mb-1">{title || 'Seu Folheto'}</h1>
            {subtitle && <p className="text-lg opacity-90">{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-8">
        {products.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">Adicione produtos para visualizar o folheto</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                style={{ borderColor: colors.secondary || '#10b981' }}
              >
                {/* Product Image */}
                {product.image && (
                  <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                      {product.name || 'Nome do Produto'}
                    </h3>
                    {product.price && (
                      <p
                        className="text-2xl font-bold"
                        style={{ color: colors.primary || '#2563eb' }}
                      >
                        {product.price}
                      </p>
                    )}
                  </div>

                  {product.description && (
                    <p className="text-sm text-slate-600 mb-3 line-clamp-3">
                      {product.description}
                    </p>
                  )}

                  {product.benefits && product.benefits.length > 0 && (
                    <div className="space-y-1">
                      {product.benefits.slice(0, 3).map((benefit, index) => (
                        benefit && (
                          <div key={index} className="flex items-start gap-2">
                            <Check
                              size={16}
                              className="mt-0.5 flex-shrink-0"
                              style={{ color: colors.secondary || '#10b981' }}
                            />
                            <span className="text-xs text-slate-700">{benefit}</span>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="mt-auto p-6 text-white"
        style={{ backgroundColor: colors.primary || '#2563eb' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{company.name}</h3>
            <div className="space-y-1 text-sm">
              {company.contact?.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>{company.contact.phone}</span>
                </div>
              )}
              {company.contact?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>{company.contact.email}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-right text-sm">
            {company.contact?.website && (
              <div className="flex items-center gap-2 justify-end mb-1">
                <Globe size={14} />
                <span>{company.contact.website}</span>
              </div>
            )}
            {company.contact?.address && (
              <div className="flex items-center gap-2 justify-end">
                <MapPin size={14} />
                <span className="text-xs">{company.contact.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
