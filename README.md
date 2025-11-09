# 📄 Editor de Folhetos Digital 4Life

Uma aplicação web moderna e intuitiva para criar folhetos digitais profissionais sem precisar do Canva. Edite produtos, descrições e exporte para impressão em minutos!

## ✨ Características

- 🎨 **Interface Intuitiva**: Editor visual com preview em tempo real
- 📝 **Edição Fácil**: Formulários simples para adicionar produtos e informações
- 🖼️ **Upload de Imagens**: Adicione fotos de produtos e logo da empresa
- 🎨 **Temas de Cores**: 6 esquemas de cores prontos + personalização total
- 💾 **Salvamento Automático**: Seus dados são salvos automaticamente no navegador
- 📥 **Exportar/Importar**: Salve seus projetos como arquivo JSON
- 🖨️ **Pronto para Impressão**: Exporte em PDF de alta qualidade ou imprima diretamente
- 📱 **Responsivo**: Funciona perfeitamente em desktop e tablet

## 🚀 Como Usar

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd folheto-digital-4life
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra seu navegador em `http://localhost:5173`

### Criando seu Primeiro Folheto

#### 1. Configure a Empresa

Na aba **"Empresa"**:
- Nome da empresa (ex: 4Life Brasil)
- Título do folheto (ex: Catálogo de Produtos 2024)
- Subtítulo (opcional)
- Faça upload do logo da empresa
- Adicione informações de contato (telefone, email, website, endereço)

#### 2. Adicione Produtos

Na aba **"Produtos"**:
- Clique em "Adicionar Produto"
- Preencha:
  - Nome do produto
  - Preço
  - Descrição
  - Faça upload da imagem do produto
  - Adicione benefícios (opcional, lista de pontos)
- Repita para todos os produtos que deseja incluir

#### 3. Escolha o Estilo

Na aba **"Estilo"**:
- Selecione um dos 6 esquemas de cores prontos
- Ou personalize as cores manualmente:
  - Cor Principal (cabeçalho e rodapé)
  - Cor Secundária (destaques)
  - Cor de Destaque (elementos especiais)

#### 4. Exporte seu Folheto

Use os botões no topo:
- **Exportar PDF**: Gera um arquivo PDF pronto para impressão
- **Imprimir**: Abre a janela de impressão do navegador
- **Salvar**: Baixa o projeto como arquivo JSON
- **Abrir**: Carrega um projeto salvo anteriormente

## 🎯 Recursos Principais

### Preview em Tempo Real
Veja as alterações instantaneamente conforme você edita. O preview mostra exatamente como o folheto ficará impresso.

### Salvamento Automático
Não se preocupe em perder seu trabalho! A aplicação salva automaticamente todas as alterações no navegador.

### Templates de Cores

1. **4Life Classic**: Vermelho vinho e dourado (cores oficiais 4Life)
2. **Azul Profissional**: Azul e verde
3. **Verde Saúde**: Verde e azul
4. **Roxo Moderno**: Roxo e rosa
5. **Laranja Energia**: Laranja e azul turquesa
6. **Rosa Elegante**: Rosa e roxo

### Formato de Impressão
- Tamanho: A4 (210mm x 297mm)
- Orientação: Retrato
- Otimizado para impressão em alta qualidade

## 📂 Estrutura do Projeto

```
folheto-digital-4life/
├── src/
│   ├── components/          # Componentes React
│   │   ├── ProductEditor.tsx    # Editor de produtos
│   │   ├── CompanyEditor.tsx    # Editor de informações da empresa
│   │   ├── StyleEditor.tsx      # Seletor de cores e estilos
│   │   └── FlyerPreview.tsx     # Preview do folheto
│   ├── types.ts            # Definições TypeScript
│   ├── App.tsx             # Componente principal
│   ├── index.css           # Estilos globais com Tailwind
│   └── main.tsx            # Entry point
├── package.json
├── tailwind.config.js      # Configuração do Tailwind
├── vite.config.ts          # Configuração do Vite
└── README.md
```

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilização moderna
- **jsPDF** - Geração de PDF
- **html2canvas** - Captura de elementos HTML
- **Lucide React** - Ícones modernos

## 💡 Dicas de Uso

1. **Imagens**: Use imagens quadradas (1:1) para melhor resultado nos produtos
2. **Logo**: Recomendado PNG com fundo transparente
3. **Cores**: Use cores contrastantes para melhor legibilidade
4. **Descrições**: Seja conciso - descrições muito longas podem ficar cortadas
5. **Benefícios**: Máximo de 3 benefícios por produto no preview
6. **Backup**: Salve seu projeto regularmente usando o botão "Salvar"

## 🎨 Personalização

### Modificar Cores Padrão

Edite o arquivo `src/components/StyleEditor.tsx` para adicionar seus próprios presets de cores:

```typescript
const colorPresets = [
  {
    name: 'Meu Esquema',
    primary: '#sua-cor-primaria',
    secondary: '#sua-cor-secundaria',
    accent: '#sua-cor-destaque',
  },
  // ...
];
```

## 📋 Comandos Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm run preview      # Preview do build de produção
npm run lint         # Verifica código
```

## 🐛 Resolução de Problemas

**O preview não aparece?**
- Verifique se há produtos adicionados
- Recarregue a página

**PDF não está exportando?**
- Certifique-se de ter adicionado pelo menos um produto
- Verifique se as imagens foram carregadas corretamente
- Tente com imagens menores se o PDF estiver muito pesado

**Perdi meu trabalho?**
- Verifique se o localStorage do navegador está habilitado
- Os dados são salvos automaticamente no navegador
- Use o botão "Salvar" para fazer backup em arquivo JSON

## 📄 Licença

Este projeto foi criado para uso interno da 4Life Brasil.

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

**Desenvolvido com ❤️ para facilitar a criação de folhetos profissionais**
