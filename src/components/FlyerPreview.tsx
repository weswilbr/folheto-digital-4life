import React from 'react';
import type { FlyerData } from '../types';
import { Phone, Mail, Globe, MapPin, Check, Star } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface FlyerPreviewProps {
  flyerData: FlyerData;
}

export const FlyerPreview: React.FC<FlyerPreviewProps> = ({ flyerData }) => {
  const { template } = flyerData;

  switch (template) {
    case 'classic':
      return <ClassicTemplate flyerData={flyerData} />;
    case 'minimal':
      return <MinimalTemplate flyerData={flyerData} />;
    case 'vibrant':
      return <VibrantTemplate flyerData={flyerData} />;
    default:
      return <ModernTemplate flyerData={flyerData} />;
  }
};

// Modern Template (Original)
const ModernTemplate: React.FC<{ flyerData: FlyerData }> = ({ flyerData }) => {
  const { company, products, title, subtitle, colors } = flyerData;

  return (
    <div
      id="flyer-preview"
      className="print-page bg-white shadow-2xl"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Header */}
      <div className="p-4 text-white" style={{ backgroundColor: colors.primary }}>
        <div className="flex items-center justify-between mb-2">
          {company.logo && (
            <img
              src={company.logo}
              alt={company.name}
              className="h-12 w-auto object-contain bg-white rounded-lg p-2"
            />
          )}
          <div className="text-right">
            <h1 className="text-3xl font-bold mb-1">{title || 'Seu Folheto'}</h1>
            {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Products Grid - 3 colunas x 4 linhas = 12 produtos */}
      <div className="p-4">
        {products.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">Adicione produtos para visualizar o folheto</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="border-2 rounded-lg overflow-hidden"
                style={{ borderColor: colors.secondary }}
              >
                {product.image && (
                  <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-2">
                  <h3 className="text-sm font-bold text-slate-800 mb-1 line-clamp-2" style={{ minHeight: '2.5rem' }}>
                    {product.name}
                  </h3>
                  {product.price && (
                    <p className="text-lg font-bold mb-1" style={{ color: colors.primary }}>
                      {product.price}
                    </p>
                  )}

                  {product.benefits && product.benefits.length > 0 && (
                    <div className="space-y-0.5 mb-2">
                      {product.benefits.slice(0, 2).map((benefit, index) => (
                        benefit && (
                          <div key={index} className="flex items-start gap-1">
                            <Check size={10} className="mt-0.5 flex-shrink-0" style={{ color: colors.secondary }} />
                            <span className="text-xs text-slate-700 line-clamp-1">{benefit}</span>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {product.link && (
                    <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-center">
                      <div className="text-center">
                        <QRCodeSVG
                          value={product.link}
                          size={50}
                          level="M"
                          includeMargin={false}
                        />
                        <p className="text-xs text-slate-500 mt-1">Escaneie</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto p-3 text-white text-sm" style={{ backgroundColor: colors.primary }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">{company.name}</h3>
            <div className="flex gap-4 text-xs">
              {company.contact?.phone && (
                <div className="flex items-center gap-1">
                  <Phone size={12} />
                  <span>{company.contact.phone}</span>
                </div>
              )}
              {company.contact?.email && (
                <div className="flex items-center gap-1">
                  <Mail size={12} />
                  <span>{company.contact.email}</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-right text-xs">
            {company.contact?.website && (
              <div className="flex items-center gap-1 justify-end mb-1">
                <Globe size={12} />
                <span>{company.contact.website}</span>
              </div>
            )}
            {company.contact?.address && (
              <div className="flex items-center gap-1 justify-end">
                <MapPin size={12} />
                <span className="text-xs">{company.contact.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Classic Template
const ClassicTemplate: React.FC<{ flyerData: FlyerData }> = ({ flyerData }) => {
  const { company, products, title, subtitle, colors } = flyerData;

  return (
    <div
      id="flyer-preview"
      className="print-page bg-white shadow-2xl"
      style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
    >
      {/* Header with Banner Style */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundColor: colors.secondary }}></div>
        <div className="relative p-4 text-center border-b-4" style={{ borderColor: colors.primary }}>
          {company.logo && (
            <img src={company.logo} alt={company.name} className="h-12 mx-auto mb-2 object-contain" />
          )}
          <h1 className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>{title}</h1>
          {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
        </div>
      </div>

      {/* Products in Grid 2 Columns */}
      <div className="p-4">
        {products.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">Adicione produtos para visualizar o folheto</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="p-2 rounded-lg border-l-4"
                style={{ borderColor: colors.secondary, backgroundColor: index % 2 === 0 ? '#f8fafc' : 'white' }}
              >
                {product.image && (
                  <div className="aspect-square bg-slate-100 rounded overflow-hidden mb-2">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-bold mb-1 line-clamp-2" style={{ color: colors.primary, minHeight: '2.5rem' }}>
                    {product.name}
                  </h3>
                  {product.price && (
                    <p className="text-lg font-bold mb-2" style={{ color: colors.secondary }}>{product.price}</p>
                  )}

                  {product.benefits && product.benefits.length > 0 && (
                    <div className="space-y-1 mb-2">
                      {product.benefits.slice(0, 2).map((benefit, idx) => (
                        benefit && (
                          <div key={idx} className="flex items-start gap-1">
                            <Star size={10} className="mt-0.5 flex-shrink-0 fill-current" style={{ color: colors.secondary }} />
                            <span className="text-xs text-slate-700 line-clamp-1">{benefit}</span>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {product.link && (
                    <div className="mt-2 pt-2 border-t border-slate-200 flex justify-center">
                      <div className="text-center">
                        <QRCodeSVG
                          value={product.link}
                          size={50}
                          level="M"
                          includeMargin={false}
                        />
                        <p className="text-xs text-slate-600 mt-1">Escaneie</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 text-center border-t-4" style={{ borderColor: colors.primary, backgroundColor: '#f8fafc' }}>
        <h3 className="text-lg font-bold mb-2" style={{ color: colors.primary }}>{company.name}</h3>
        <div className="flex items-center justify-center gap-4 text-xs text-slate-700">
          {company.contact?.phone && (
            <div className="flex items-center gap-1">
              <Phone size={12} />
              <span>{company.contact.phone}</span>
            </div>
          )}
          {company.contact?.email && (
            <div className="flex items-center gap-1">
              <Mail size={12} />
              <span>{company.contact.email}</span>
            </div>
          )}
          {company.contact?.website && (
            <div className="flex items-center gap-1">
              <Globe size={12} />
              <span>{company.contact.website}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Minimal Template
const MinimalTemplate: React.FC<{ flyerData: FlyerData }> = ({ flyerData }) => {
  const { company, products, title, subtitle, colors } = flyerData;

  return (
    <div
      id="flyer-preview"
      className="print-page bg-white shadow-2xl"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Minimal Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {company.logo && (
            <img src={company.logo} alt={company.name} className="h-10 object-contain" />
          )}
          <div className="text-right">
            <h1 className="text-2xl font-light tracking-tight" style={{ color: colors.primary }}>{title}</h1>
            {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Products in Clean Grid - 4 colunas x 3 linhas */}
      <div className="p-4">
        {products.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">Adicione produtos para visualizar o folheto</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {products.map((product) => (
              <div key={product.id} className="group">
                {product.image && (
                  <div className="aspect-square bg-slate-50 mb-2 overflow-hidden rounded">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <h3 className="text-xs font-semibold text-slate-900 mb-1 line-clamp-2" style={{ minHeight: '2rem' }}>
                  {product.name}
                </h3>
                {product.price && (
                  <p className="text-sm font-bold mb-1" style={{ color: colors.primary }}>{product.price}</p>
                )}

                {product.link && (
                  <div className="mt-2 pt-2 border-t border-slate-100 flex justify-center">
                    <div className="text-center">
                      <QRCodeSVG
                        value={product.link}
                        size={45}
                        level="M"
                        includeMargin={false}
                      />
                      <p className="text-xs text-slate-500 mt-1">Escaneie</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Minimal Footer */}
      <div className="p-3 border-t">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="font-semibold" style={{ color: colors.primary }}>{company.name}</span>
          <div className="flex items-center gap-4">
            {company.contact?.phone && <span>{company.contact.phone}</span>}
            {company.contact?.email && <span>{company.contact.email}</span>}
            {company.contact?.website && <span>{company.contact.website}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

// Vibrant Template
const VibrantTemplate: React.FC<{ flyerData: FlyerData }> = ({ flyerData }) => {
  const { company, products, title, subtitle, colors } = flyerData;

  return (
    <div
      id="flyer-preview"
      className="print-page shadow-2xl"
      style={{
        fontFamily: 'Poppins, system-ui, sans-serif',
        background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.secondary}15 100%)`
      }}
    >
      {/* Bold Header */}
      <div
        className="p-4 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
        }}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            {company.logo && (
              <div className="bg-white rounded-lg p-2 shadow-lg">
                <img src={company.logo} alt={company.name} className="h-10 object-contain" />
              </div>
            )}
          </div>
          <h1 className="text-3xl font-black mb-1 drop-shadow-lg">{title}</h1>
          {subtitle && <p className="text-sm font-semibold opacity-95">{subtitle}</p>}
        </div>
      </div>

      {/* Products with Cards - 3 colunas x 4 linhas */}
      <div className="p-3">
        {products.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">Adicione produtos para visualizar o folheto</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border-4"
                style={{ borderColor: colors.secondary }}
              >
                {product.image && (
                  <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-2">
                  <div
                    className="inline-block px-2 py-0.5 rounded-full text-white text-xs font-bold mb-2"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {product.category || 'Produto'}
                  </div>

                  <h3 className="text-sm font-black text-slate-900 mb-1 line-clamp-2" style={{ minHeight: '2.5rem' }}>
                    {product.name}
                  </h3>

                  {product.price && (
                    <p className="text-lg font-black mb-2" style={{ color: colors.secondary }}>
                      {product.price}
                    </p>
                  )}

                  {product.link && (
                    <div className="mt-2 pt-2 border-t-2 border-dashed" style={{ borderColor: colors.secondary }}>
                      <div className="flex items-center justify-center">
                        <QRCodeSVG
                          value={product.link}
                          size={50}
                          level="M"
                          includeMargin={false}
                        />
                      </div>
                      <p className="text-xs text-center font-bold mt-1" style={{ color: colors.primary }}>COMPRE!</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bold Footer */}
      <div
        className="p-6 text-white font-bold"
        style={{ background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)` }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-black">{company.name}</h3>
          <div className="text-right space-y-1">
            {company.contact?.phone && <div className="text-lg">{company.contact.phone}</div>}
            {company.contact?.website && <div>{company.contact.website}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
