# Arthur Henrique - Portfolio Futurista

## 🚀 O Projeto

Este é um portfólio de alta performance desenvolvido para destacar habilidades em desenvolvimento frontend moderno, combinando estética futurista (Cyberpunk/Glassmorphism) com tecnologias de ponta para experiências imersivas.

O projeto utiliza uma abordagem "Cinematic First", onde o usuário é recebido por uma intro progressiva em 3D antes de acessar o conteúdo principal.

## 🛠️ Stack Tecnológica

- **Vue 3 (Composition API)**: Framework base pela sua reatividade eficiente e estrutura modular.
- **Vite**: Ferramenta de build ultra-rápida.
- **TresJS**: Integração declarativa do Three.js com Vue, utilizada para a intro 3D e o sistema de partículas.
- **GSAP (GreenSock)**: Motor de animação principal para transições complexas e o efeito de "docking" do logo.
- **Lenis Scroll**: Implementação de Smooth Scroll para uma navegação fluida e luxuosa.
- **SCSS**: Pré-processador CSS para uma arquitetura de estilos escalável e organizada.

## ✨ Principais Funcionalidades

### 1. Intro 3D Imersiva
- Carregamento progressivo com feedback visual.
- Animação de revelação "Aggressive Reveal".
- Transição sem emendas (Seamless transition) do logo 3D para a barra de navegação.

### 2. Design System Futurista
- **Glassmorphism**: Uso de `backdrop-filter` e transparências sutis para criar profundidade.
- **Gradients & Neon**: Paleta baseada em Ciano Neon e tons escuros espaciais.
- **Micro-interações**: Elementos que reagem ao mouse e teclado para aumentar o engajamento.

### 3. Seções Especializadas
- **Sobre**: Pilares de atuação com design em blocos neon.
- **Tecnologias**: Grid interativo com iconografia limpa.
- **Projetos**: Carregamento horizontal responsivo para melhor visualização de portfólio.
- **Currículo**: Integração direta para download de PDF com CTA estilizado.

## ⚙️ Arquitetura de Código

O código foi refatorado seguindo os princípios de:
- **Single Responsibility**: Componentes focados em uma única tarefa.
- **DRY (Don't Repeat Yourself)**: Uso de variáveis globais SCSS e centralização de dados em `data/portfolio.js`.
- **Acessibilidade**: Implementação de ARIA labels, roles semânticos e suporte a navegação por teclado.
- **Performance**: Lazy loading de imagens e otimização de renderização 3D.

## 📦 Como Rodar Localmente

1. Clone o repositório.
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`
4. Para produção: `npm run build`

## 🌍 Deployment (GitHub Pages)

O projeto está configurado para ser hospedado no GitHub Pages. 
> [!NOTE]
> Ao buildar para o GitHub Pages, certifique-se de que a `base` no `vite.config.js` está correta caso o repositório não seja o root da sua conta.
