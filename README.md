# Portfólio Vinícius Shiguemori

Site de portfólio profissional multilíngue (Português/Inglês) com design moderno, efeitos parallax e gráficos interativos.

## Características

- ✨ Design moderno e responsivo
- 🌍 Multilíngue (Português/Inglês)
- 📊 Gráficos interativos de habilidades
- 🎨 Efeitos parallax e animações
- 🏢 Logos das empresas onde trabalhou
- 📱 Totalmente responsivo

## Tecnologias Utilizadas

- React 18
- Vite
- Tailwind CSS
- Framer Motion (animações)
- Recharts (gráficos)
- Lucide React (ícones)
- shadcn/ui (componentes)

## Como executar localmente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra http://localhost:5173 no navegador

## Deploy no GitHub Pages

### Opção 1: Upload manual dos arquivos

1. Faça o build do projeto:
   ```bash
   npm run build
   ```
2. Copie todos os arquivos da pasta `dist/` para o repositório do GitHub Pages
3. Faça commit e push das alterações

### Opção 2: GitHub Actions (Recomendado)

1. Crie um arquivo `.github/workflows/deploy.yml` no seu repositório:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. Vá nas configurações do repositório > Pages
3. Selecione "GitHub Actions" como source
4. Faça push do código para a branch main

## Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # Componentes shadcn/ui
│   └── SkillsChart.jsx  # Gráficos de habilidades
├── assets/
│   └── images/
│       ├── profile.jpg  # Foto do perfil
│       └── logos/       # Logos das empresas
├── App.jsx              # Componente principal
├── App.css              # Estilos globais
└── main.jsx             # Ponto de entrada

dist/                    # Arquivos de produção (após build)
```

## Personalização

Para personalizar o portfólio:

1. **Dados pessoais**: Edite as constantes no início do `App.jsx`
2. **Experiências**: Modifique o array `experiences`
3. **Educação**: Atualize o array `education`
4. **Habilidades**: Ajuste o objeto `skills`
5. **Traduções**: Modifique o objeto `translations`
6. **Imagens**: Substitua os arquivos em `src/assets/images/`

## Suporte

Para dúvidas ou suporte, entre em contato através do email: shiguemori@hotmail.com

