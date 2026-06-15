# O Último Brasileiro - Site Oficial

Site oficial do jogo "O Último Brasileiro" - Versão HTML Estático

## 🚀 Deploy no Vercel

Este site foi configurado como um site estático HTML para simplificar o deploy no Vercel e resolver problemas de build do Astro.

### Configuração do Vercel

O arquivo `vercel.json` está configurado para:
- Não executar build command (buildCommand: null)
- Servir arquivos do diretório raiz (outputDirectory: "./")
- Não usar framework específico (framework: null)

### Estrutura do Projeto

- `index.html` - Página principal
- `css/` - Arquivos CSS
- `imagens/` - Imagens do site
- `js/` - Arquivos JavaScript (se existirem)
- `vercel.json` - Configuração do Vercel

### Como Fazer Deploy

1. Faça push do código para o GitHub
2. Importe o projeto no Vercel
3. O Vercel irá detectar automaticamente a configuração estática
4. O site será publicado imediatamente

## 🎨 Características

- Design responsivo
- Animações avançadas com GSAP
- Galeria de imagens com Splide.js
- Efeitos premium CSS
- Cursor personalizado
- Partículas e efeitos visuais

## 📝 Notas

O projeto original foi desenvolvido com Astro, mas devido a problemas de build no Vercel com SSR e adapters, foi convertido para HTML estático puro para garantir deploy confiável.

## 🛠️ Desenvolvimento Local

Para testar localmente, basta abrir o arquivo `index.html` no navegador ou usar um servidor local simples:

```bash
# Python 3
python -m http.server

# Node.js
npx serve

# VS Code
Instale a extensão "Live Server"
```
