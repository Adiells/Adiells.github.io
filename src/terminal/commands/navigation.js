export const navigationCommands = {
  about: {
    name: 'about',
    aliases: ['whoami'],
    summary: 'Jump to biography & background section',
    usage: 'about',
    run: () => ({
      output: [{ view: 'text', text: '→ scrolling to #about' }],
      exitCode: 0,
      effects: [{ type: 'scrollTo', id: 'about' }, { type: 'close', delay: 250 }],
    }),
  },
  projects: {
    name: 'projects',
    aliases: [],
    summary: 'Jump to projects catalog',
    usage: 'projects',
    run: () => ({
      output: [{ view: 'text', text: '→ scrolling to #projects' }],
      exitCode: 0,
      effects: [{ type: 'scrollTo', id: 'projects' }, { type: 'close', delay: 250 }],
    }),
  },
  experience: {
    name: 'experience',
    aliases: ['labs', 'career'],
    summary: 'Jump to experience & academic lab timeline',
    usage: 'experience',
    run: () => ({
      output: [{ view: 'text', text: '→ scrolling to #experience' }],
      exitCode: 0,
      effects: [{ type: 'scrollTo', id: 'experience' }, { type: 'close', delay: 250 }],
    }),
  },
  skills: {
    name: 'skills',
    aliases: ['expertise'],
    summary: 'Jump to technical skills tree',
    usage: 'skills',
    run: () => ({
      output: [{ view: 'text', text: '→ scrolling to #skills' }],
      exitCode: 0,
      effects: [{ type: 'scrollTo', id: 'skills' }, { type: 'close', delay: 250 }],
    }),
  },
  contact: {
    name: 'contact',
    aliases: ['email', 'socials'],
    summary: 'Jump to contact & social channels',
    usage: 'contact',
    run: () => ({
      output: [{ view: 'text', text: '→ scrolling to #contact' }],
      exitCode: 0,
      effects: [{ type: 'scrollTo', id: 'contact' }, { type: 'close', delay: 250 }],
    }),
  },
  home: {
    name: 'home',
    aliases: [],
    summary: 'Jump to top hero fastfetch view',
    usage: 'home',
    run: () => ({
      output: [{ view: 'text', text: '→ scrolling to top' }],
      exitCode: 0,
      effects: [{ type: 'scrollTo', id: 'home' }, { type: 'close', delay: 250 }],
    }),
  },
  cd: {
    name: 'cd',
    aliases: [],
    summary: 'Navigate to section or directory',
    usage: 'cd <section|~|..>',
    run: (args, ctx) => {
      const target = (args[0] || '~').trim().toLowerCase();
      if (target === '~' || target === 'home' || target === '') {
        return {
          output: [{ view: 'text', text: '→ navigating to ~ (home)' }],
          exitCode: 0,
          effects: [{ type: 'scrollTo', id: 'home' }, { type: 'close', delay: 250 }],
        };
      }

      const clean = target.replace(/^(\.\/|~\/|\/)?(portfolio\/)?|\/$/g, '');
      const validSections = ctx.sections.map((s) => s.id);
      
      if (clean === '..' || clean === 'portfolio') {
        return {
          output: [{ view: 'text', text: '→ navigating to ~/portfolio' }],
          exitCode: 0,
          effects: [{ type: 'scrollTo', id: 'about' }, { type: 'close', delay: 250 }],
        };
      }

      if (validSections.includes(clean)) {
        return {
          output: [{ view: 'text', text: `→ navigating to #${clean}` }],
          exitCode: 0,
          effects: [{ type: 'scrollTo', id: clean }, { type: 'close', delay: 250 }],
        };
      }

      return {
        output: [{ view: 'error', text: `cd: no such file or directory: ${target}` }],
        exitCode: 1,
      };
    },
  },
  ls: {
    name: 'ls',
    aliases: ['dir'],
    summary: 'List files and sections',
    usage: 'ls [-l|-a|-la] [path]',
    run: (args, ctx) => {
      const isLong = args.some((a) => a.includes('-l'));
      const target = args.find((a) => !a.startsWith('-')) || '';

      if (target.includes('projects')) {
        return {
          output: [{
            view: 'lsProjects',
            projects: ctx.projects,
            isLong,
          }],
          exitCode: 0,
        };
      }

      return {
        output: [{
          view: 'lsFiles',
          files: Object.values(ctx.files),
          isLong,
        }],
        exitCode: 0,
      };
    },
  },
  pwd: {
    name: 'pwd',
    aliases: [],
    summary: 'Print working directory',
    usage: 'pwd',
    run: () => ({
      output: [{ view: 'text', text: '/home/adiel/portfolio' }],
      exitCode: 0,
    }),
  },
  open: {
    name: 'open',
    aliases: ['xdg-open'],
    summary: 'Focus project and scroll to its preview',
    usage: 'open <project-slug>',
    run: (args, ctx) => {
      const slug = (args[0] || '').toLowerCase().trim();
      if (!slug) {
        return {
          output: [{ view: 'error', text: 'open: specify a project slug. Example: open neuroevolution-snake' }],
          exitCode: 1,
        };
      }

      const match = ctx.projects.find((p) => p.slug.toLowerCase() === slug || p.slug.toLowerCase().includes(slug));
      if (!match) {
        return {
          output: [{ view: 'error', text: `open: project not found: ${slug}` }],
          exitCode: 1,
        };
      }

      return {
        output: [{ view: 'text', text: `→ opening project: ${match.title}` }],
        exitCode: 0,
        effects: [
          { type: 'scrollTo', id: 'projects' },
          { type: 'highlight', slug: match.slug },
          { type: 'close', delay: 300 },
        ],
      };
    },
  },
};
