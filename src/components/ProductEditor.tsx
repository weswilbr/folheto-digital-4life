import React from 'react';
import type { Product } from '../types';
import { Plus, X, Upload, Trash2 } from 'lucide-react';

interface ProductEditorProps {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
}

export const ProductEditor: React.FC<ProductEditorProps> = ({ products, onProductsChange }) => {
  const addProduct = () => {
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: '',
      description: '',
      price: '',
      benefits: [],
    };
    onProductsChange([...products, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    onProductsChange(
      products.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const removeProduct = (id: string) => {
    onProductsChange(products.filter((product) => product.id !== id));
  };

  const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProduct(id, { image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addBenefit = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      updateProduct(productId, {
        benefits: [...(product.benefits || []), ''],
      });
    }
  };

  const updateBenefit = (productId: string, benefitIndex: number, value: string) => {
    const product = products.find((p) => p.id === productId);
    if (product && product.benefits) {
      const newBenefits = [...product.benefits];
      newBenefits[benefitIndex] = value;
      updateProduct(productId, { benefits: newBenefits });
    }
  };

  const removeBenefit = (productId: string, benefitIndex: number) => {
    const product = products.find((p) => p.id === productId);
    if (product && product.benefits) {
      updateProduct(productId, {
        benefits: product.benefits.filter((_, index) => index !== benefitIndex),
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800">Produtos</h3>
        <button
          onClick={addProduct}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Adicionar Produto
        </button>
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
          <p className="text-slate-500 mb-4">Nenhum produto adicionado ainda</p>
          <button
            onClick={addProduct}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Adicionar Primeiro Produto
          </button>
        </div>
      )}

      {products.map((product, index) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-slate-700">
              Produto {index + 1}
            </h4>
            <button
              onClick={() => removeProduct(product.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Remover produto"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nome do Produto *
              </label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                placeholder="Ex: Transfer Factor Plus"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preço
              </label>
              <input
                type="text"
                value={product.price}
                onChange={(e) => updateProduct(product.id, { price: e.target.value })}
                placeholder="Ex: R$ 189,90"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Descrição
            </label>
            <textarea
              value={product.description}
              onChange={(e) => updateProduct(product.id, { description: e.target.value })}
              placeholder="Descreva os benefícios e características do produto..."
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Imagem do Produto
            </label>
            <div className="flex items-start gap-4">
              {product.image ? (
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-lg border-2 border-slate-200"
                  />
                  <button
                    onClick={() => updateProduct(product.id, { image: undefined })}
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
                    onChange={(e) => handleImageUpload(product.id, e)}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-700">
                Benefícios (opcional)
              </label>
              <button
                onClick={() => addBenefit(product.id)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Adicionar
              </button>
            </div>
            <div className="space-y-2">
              {product.benefits?.map((benefit, benefitIndex) => (
                <div key={benefitIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) =>
                      updateBenefit(product.id, benefitIndex, e.target.value)
                    }
                    placeholder="Ex: Fortalece o sistema imunológico"
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => removeBenefit(product.id, benefitIndex)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
