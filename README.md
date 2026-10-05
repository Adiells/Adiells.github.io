# Adiel Emilson — Landing Page & Portfólio

Repositório da página principal/landing page (`adiels.me`), construída com **React**, **Vite** e estilizada sob a estética de um **terminal Linux minimalista** (paleta Dracula, tipografia JetBrains Mono, Starship prompt e status bar estilo Waybar/tmux).

---

## 🛠️ Stack Tecnológica

- **Framework**: [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/)
- **Estilização**: CSS Modules + Tokens CSS puros (sem frameworks CSS pesados)
- **Tema**: [Dracula Theme](https://draculatheme.com/)
- **Tipografia**: [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- **Testes**: [Vitest](https://vitest.dev/) + [jsdom](https://github.com/jsdom/jsdom)

---

## 🚀 Funcionalidades & Destaques

- **Identidade Linux/Unix Autêntica**:
  - Hero com comando `whoami`, foto de perfil em destaque, biografia e metadados com badges de permissão POSIX (`-rwxr-xr-x`).
  - Gaveta expansível com `fastfetch` trazendo o logo ASCII do Manjaro Linux, especificações de kernel/stack e cálculo dinâmico de `Uptime`.
  - Cabeçalhos de seção com animação de digitação automática (*typewriter*).
  - Catálogo de projetos formatado como listagem `ls -l` com reprodução automática de vídeos `.webm` via IntersectionObserver.
  - Linha do tempo de laboratórios e ligas acadêmicas formatada no estilo `journalctl -u career --reverse`.
  - Visualização de competências técnicas em árvore de diretórios ASCII estilo `tree skills/`.
  - Contato com visualização de código em `cat contact.json` e botão com cópia rápida para o clipboard.

- **Shell Interativo Opcional (`⌘K` / `Ctrl+K` / `/`)**:
  - Modal com terminal interativo `zsh`.
  - Comandos de navegação rápida: `cd projects`, `about`, `skills`, `open neuroevolution-snake`.
  - Histórico persistente no `localStorage` navegável com `↑`/`↓` e autocompletar via tecla `Tab`.
  - Easter eggs clássicos: `sudo`, `pacman`, `yay`, `vim`, `rm -rf /`, `uname -a`.

---

## 📦 Scripts Disponíveis

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (http://localhost:4173)
npm run dev

# Executar testes unitários
npm test

# Executar o linter
npm run lint

# Gerar build de produção
npm run build

# Pré-visualizar o build localmente
npm run preview

# Deploy para o GitHub Pages
npm run deploy:gh
```

---

## 📂 Estrutura de Diretórios

```
├── public/                # Assets estáticos (imagens .webp, vídeos .webm, favicon, CNAME)
├── src/
│   ├── components/
│   │   ├── layout/        # StatusBar (Waybar/tmux) e Footer
│   │   ├── sections/      # Hero, Projects, Experience, Skills, Contact, FastfetchBlock
│   │   ├── shell/         # CommandPalette, ShellOutput, ShellViews
│   │   └── ui/            # Prompt, Pane, PermBadge, Cursor, Tag, CommandButton, SectionHeader
│   ├── data/              # portfolioData.js (Fonte única de dados)
│   ├── hooks/             # useTerminal, useActiveSection, useSectionNav, useHotkey, useTypewriter, useClock
│   ├── styles/            # tokens.css (Design tokens Dracula)
│   ├── terminal/          # Parser, Autocomplete, Virtual Filesystem, Command Registry e Testes
│   ├── App.jsx            # Layout principal
│   ├── index.css          # Reset e estilos globais
│   └── main.jsx           # Entrypoint do React
├── index.html             # Template HTML com fontes e metadados
├── package.json           # Dependências e scripts
└── vite.config.js         # Configuração do Vite e Vitest
```

---

## 👤 Autor

**Adiel Emilson**
- GitHub: [@adiells](https://github.com/adiells)
- LinkedIn: [Adiel Emilson](https://linkedin.com/in/adielemilson)
- E-mail: [adielenilson@gmail.com](mailto:adielenilson@gmail.com)
