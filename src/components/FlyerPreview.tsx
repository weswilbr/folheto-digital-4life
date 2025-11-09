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
      <div className="p-8 text-white" style={{ backgroundColor: colors.primary }}>
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
            {products.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="border-2 rounded-lg overflow-hidden"
                style={{ borderColor: colors.secondary }}
              >
                {product.image && (
                  <div className="aspect-video bg-slate-100 flex items-center justify-center overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{product.name}</h3>
                  {product.price && (
                    <p className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
                      {product.price}
                    </p>
                  )}

                  {product.description && (
                    <p className="text-xs text-slate-600 mb-3 line-clamp-2">{product.description}</p>
                  )}

                  {product.benefits && product.benefits.length > 0 && (
                    <div className="space-y-1 mb-3">
                      {product.benefits.slice(0, 3).map((benefit, index) => (
                        benefit && (
                          <div key={index} className="flex items-start gap-1">
                            <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: colors.secondary }} />
                            <span className="text-xs text-slate-700">{benefit}</span>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {product.link && (
                    <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-center">
                      <div className="text-center">
                        <QRCodeSVG
                          value={product.link}
                          size={80}
                          level="M"
                          includeMargin={false}
                        />
                        <p className="text-xs text-slate-500 mt-1 font-medium">Escaneie para comprar</p>
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
      <div className="mt-auto p-6 text-white" style={{ backgroundColor: colors.primary }}>
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
        <div className="relative p-10 text-center border-b-4" style={{ borderColor: colors.primary }}>
          {company.logo && (
            <img src={company.logo} alt={company.name} className="h-20 mx-auto mb-4 object-contain" />
          )}
          <h1 className="text-5xl font-bold mb-2" style={{ color: colors.primary }}>{title}</h1>
          {subtitle && <p className="text-xl text-slate-600">{subtitle}</p>}
        </div>
      </div>

      {/* Products in List Style */}
      <div className="p-8">
        {products.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">Adicione produtos para visualizar o folheto</p>
          </div>
        ) : (
          <div className="space-y-6">
            {products.slice(0, 4).map((product, index) => (
              <div
                key={product.id}
                className="flex gap-6 p-4 rounded-lg border-l-4"
                style={{ borderColor: colors.secondary, backgroundColor: index % 2 === 0 ? '#f8fafc' : 'white' }}
              >
                {product.image && (
                  <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex-1 flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold" style={{ color: colors.primary }}>{product.name}</h3>
                      {product.price && (
                        <span className="text-3xl font-bold" style={{ color: colors.secondary }}>{product.price}</span>
                      )}
                    </div>

                    {product.description && (
                      <p className="text-sm text-slate-700 mb-3">{product.description}</p>
                    )}

                    {product.benefits && product.benefits.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {product.benefits.slice(0, 4).map((benefit, idx) => (
                          benefit && (
                            <div key={idx} className="flex items-start gap-2">
                              <Star size={14} className="mt-0.5 flex-shrink-0 fill-current" style={{ color: colors.secondary }} />
                              <span className="text-xs text-slate-700">{benefit}</span>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </div>

                  {product.link && (
                    <div className="flex flex-col items-center justify-center px-4 border-l border-slate-200">
                      <QRCodeSVG
                        value={product.link}
                        size={90}
                        level="M"
                        includeMargin={false}
                      />
                      <p className="text-xs text-slate-600 mt-2 font-medium text-center">Escaneie para comprar</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 text-center border-t-4" style={{ borderColor: colors.primary, backgroundColor: '#f8fafc' }}>
        <h3 className="text-3xl font-bold mb-3" style={{ color: colors.primary }}>{company.name}</h3>
        <div className="flex items-center justify-center gap-8 text-sm text-slate-700">
          {company.contact?.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{company.contact.phone}</span>
            </div>
          )}
          {company.contact?.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{company.contact.email}</span>
            </div>
          )}
          {company.contact?.website && (
            <div className="flex items-center gap-2">
              <Globe size={16} />
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
      <div className="p-12 border-b">
        <div className="flex items-center justify-between">
          {company.logo && (
            <img src={company.logo} alt={company.name} className="h-14 object-contain" />
          )}
          <div className="text-right">
            <h1 className="text-4xl font-light tracking-tight" style={{ color: colors.primary }}>{title}</h1>
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Products in Clean Grid */}
      <div className="p-12">
        {products.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">Adicione produtos para visualizar o folheto</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {products.slice(0, 6).map((product) => (
              <div key={product.id} className="group">
                {product.image && (
                  <div className="aspect-square bg-slate-50 mb-4 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                )}

                <h3 className="text-sm font-semibold text-slate-900 mb-1">{product.name}</h3>
                {product.price && (
                  <p className="text-xl font-bold mb-2" style={{ color: colors.primary }}>{product.price}</p>
                )}

                {product.description && (
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">{product.description}</p>
                )}

                {product.link && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex justify-center">
                    <div className="text-center">
                      <QRCodeSVG
                        value={product.link}
                        size={70}
                        level="M"
                        includeMargin={false}
                      />
                      <p className="text-xs text-slate-500 mt-2">Escaneie aqui</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Minimal Footer */}
      <div className="p-8 border-t">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span className="font-semibold" style={{ color: colors.primary }}>{company.name}</span>
          <div className="flex items-center gap-6">
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
        className="p-8 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
        }}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            {company.logo && (
              <div className="bg-white rounded-xl p-3 shadow-lg">
                <img src={company.logo} alt={company.name} className="h-12 object-contain" />
              </div>
            )}
          </div>
          <h1 className="text-5xl font-black mb-2 drop-shadow-lg">{title}</h1>
          {subtitle && <p className="text-xl font-semibold opacity-95">{subtitle}</p>}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20" style={{ backgroundColor: 'white', transform: 'translate(30%, -30%)' }}></div>
      </div>

      {/* Products with Cards */}
      <div className="p-8">
        {products.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-xl">Adicione produtos para visualizar o folheto</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {products.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-4 hover:shadow-xl transition-shadow"
                style={{ borderColor: colors.secondary }}
              >
                {product.image && (
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-5">
                  <div
                    className="inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-3"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {product.category || 'Produto'}
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2">{product.name}</h3>

                  {product.price && (
                    <p className="text-3xl font-black mb-3" style={{ color: colors.secondary }}>
                      {product.price}
                    </p>
                  )}

                  {product.benefits && product.benefits.length > 0 && (
                    <div className="space-y-1 mb-3">
                      {product.benefits.slice(0, 2).map((benefit, index) => (
                        benefit && (
                          <div key={index} className="flex items-start gap-2">
                            <Check size={16} className="mt-0.5 flex-shrink-0 font-bold" style={{ color: colors.primary }} />
                            <span className="text-xs font-medium text-slate-700">{benefit}</span>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {product.link && (
                    <div className="mt-4 pt-4 border-t-2 border-dashed" style={{ borderColor: colors.secondary }}>
                      <div className="flex items-center justify-center gap-3">
                        <QRCodeSVG
                          value={product.link}
                          size={80}
                          level="M"
                          includeMargin={false}
                        />
                        <div className="text-center">
                          <p className="text-sm font-bold" style={{ color: colors.primary }}>COMPRE AGORA!</p>
                          <p className="text-xs text-slate-600">Escaneie o QR Code</p>
                        </div>
                      </div>
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
