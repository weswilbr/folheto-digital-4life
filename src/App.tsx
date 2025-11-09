import { useState, useEffect } from 'react';
import type { FlyerData } from './types';
import { ProductEditor } from './components/ProductEditor';
import { CompanyEditor } from './components/CompanyEditor';
import { StyleEditor } from './components/StyleEditor';
import { FlyerPreview } from './components/FlyerPreview';
import { Download, Save, FileText, Eye, Settings, Palette } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const STORAGE_KEY = 'folheto-digital-data';

function App() {
  const [activeTab, setActiveTab] = useState<'company' | 'products' | 'style'>('company');
  const [showPreview, setShowPreview] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const [flyerData, setFlyerData] = useState<FlyerData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Se falhar ao parsear, usa dados padrão
      }
    }

    return {
      id: 'flyer-1',
      title: 'Catálogo de Produtos',
      subtitle: 'Transformando vidas através da saúde',
      company: {
        name: '4Life Brasil',
        contact: {
          phone: '(11) 9999-9999',
          email: 'contato@4life.com.br',
          website: 'www.4life.com.br',
        },
      },
      products: [],
      colors: {
        primary: '#8B1538',
        secondary: '#FFD700',
        accent: '#1a1a1a',
      },
      template: 'modern',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  // Auto-save
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flyerData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [flyerData]);

  const updateFlyerData = (updates: Partial<FlyerData>) => {
    setFlyerData((prev) => ({
      ...prev,
      ...updates,
      updatedAt: new Date().toISOString(),
    }));
  };

  const exportToPDF = async () => {
    setIsExporting(true);

    try {
      const element = document.getElementById('flyer-preview');
      if (!element) {
        alert('Erro ao encontrar o preview do folheto');
        return;
      }

      // Captura o elemento como imagem
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Cria o PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`folheto-${flyerData.company.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const saveProject = () => {
    const dataStr = JSON.stringify(flyerData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `folheto-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadProject = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            setFlyerData(data);
            alert('Projeto carregado com sucesso!');
          } catch (error) {
            alert('Erro ao carregar o projeto. Verifique se o arquivo é válido.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={32} className="text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Editor de Folhetos 4Life
                </h1>
                <p className="text-sm text-slate-600">
                  Crie folhetos profissionais em minutos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={loadProject}
                className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                title="Carregar projeto"
              >
                Abrir
              </button>
              <button
                onClick={saveProject}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Salvar projeto"
              >
                <Save size={20} />
                Salvar
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Eye size={20} />
                {showPreview ? 'Ocultar' : 'Mostrar'} Preview
              </button>
              <button
                onClick={exportToPDF}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={20} />
                {isExporting ? 'Exportando...' : 'Exportar PDF'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 flex gap-2 no-print">
              <button
                onClick={() => setActiveTab('company')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'company'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Settings size={20} />
                Empresa
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'products'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <FileText size={20} />
                Produtos
              </button>
              <button
                onClick={() => setActiveTab('style')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'style'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Palette size={20} />
                Estilo
              </button>
            </div>

            {/* Editor Content */}
            <div className="no-print">
              {activeTab === 'company' && (
                <CompanyEditor flyerData={flyerData} onUpdate={updateFlyerData} />
              )}
              {activeTab === 'products' && (
                <ProductEditor
                  products={flyerData.products}
                  onProductsChange={(products) => updateFlyerData({ products })}
                />
              )}
              {activeTab === 'style' && (
                <StyleEditor flyerData={flyerData} onUpdate={updateFlyerData} />
              )}
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="lg:sticky lg:top-8 h-fit">
              <div className="bg-slate-200 rounded-xl p-8 shadow-lg">
                <div className="mb-4 flex items-center justify-between no-print">
                  <h3 className="text-lg font-bold text-slate-800">Preview</h3>
                  <button
                    onClick={handlePrint}
                    className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Imprimir
                  </button>
                </div>
                <div className="transform scale-75 origin-top shadow-2xl">
                  <FlyerPreview flyerData={flyerData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
