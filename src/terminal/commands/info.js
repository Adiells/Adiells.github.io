export const infoCommands = {
  help: {
    name: 'help',
    aliases: ['commands', '?'],
    summary: 'Display list of available commands and shortcuts',
    usage: 'help',
    run: (_args, ctx) => ({
      output: [{
        view: 'help',
        commands: ctx.commandList.filter((c) => !c.hidden),
      }],
      exitCode: 0,
    }),
  },
  man: {
    name: 'man',
    aliases: ['manual'],
    summary: 'Show manual page for a command',
    usage: 'man <command>',
    run: (args, ctx) => {
      const target = (args[0] || '').toLowerCase().trim();
      if (!target) {
        return {
          output: [{ view: 'error', text: 'What manual page do you want? Try: man help' }],
          exitCode: 1,
        };
      }

      if (target === 'easter-eggs') {
        return {
          output: [{
            view: 'man',
            name: 'easter-eggs',
            section: '7',
            synopsis: 'sudo, pacman, yay, vim, rm -rf /',
            description: 'A collection of classic Unix and Linux inside jokes baked into this portfolio.',
          }],
          exitCode: 0,
        };
      }

      const cmd = ctx.commandList.find((c) => c.name === target || (c.aliases && c.aliases.includes(target)));
      if (!cmd) {
        return {
          output: [{ view: 'error', text: `No manual entry for ${target}` }],
          exitCode: 1,
        };
      }

      return {
        output: [{
          view: 'man',
          name: cmd.name,
          section: '1',
          synopsis: cmd.usage || cmd.name,
          description: cmd.summary || 'Portfolio CLI command.',
          aliases: cmd.aliases,
        }],
        exitCode: 0,
      };
    },
  },
  fastfetch: {
    name: 'fastfetch',
    aliases: ['fetch', 'neofetch'],
    summary: 'Display system information and ASCII logo',
    usage: 'fastfetch',
    run: (_args, ctx) => ({
      output: [{
        view: 'fastfetch',
        system: ctx.system,
        profile: ctx.profile,
      }],
      exitCode: 0,
    }),
  },
  cat: {
    name: 'cat',
    aliases: ['view'],
    summary: 'Concatenate and display virtual file content',
    usage: 'cat <filename>',
    run: (args, ctx) => {
      const filename = (args[0] || '').trim();
      if (!filename) {
        return {
          output: [{ view: 'error', text: 'cat: missing file operand. Try: cat about.txt' }],
          exitCode: 1,
        };
      }

      const file = ctx.files[filename];
      if (!file) {
        return {
          output: [{ view: 'error', text: `cat: ${filename}: No such file or directory` }],
          exitCode: 1,
        };
      }

      if (file.type === 'directory') {
        return {
          output: [{ view: 'error', text: `cat: ${filename}: Is a directory` }],
          exitCode: 1,
        };
      }

      return {
        output: [{
          view: filename.endsWith('.json') ? 'json' : 'text',
          text: file.content,
        }],
        exitCode: 0,
      };
    },
  },
  tree: {
    name: 'tree',
    aliases: [],
    summary: 'Display directory structure as a tree',
    usage: 'tree [skills|projects]',
    run: (_args, ctx) => ({
      output: [{
        view: 'text',
        text: ctx.files['skills.tree'] ? ctx.files['skills.tree'].content : 'skills.tree',
      }],
      exitCode: 0,
    }),
  },
  uname: {
    name: 'uname',
    aliases: [],
    summary: 'Print system information',
    usage: 'uname [-a]',
    run: () => ({
      output: [{
        view: 'text',
        text: 'Linux manjaro-linux 6.18.49-1-MANJARO #2 SMP PREEMPT_DYNAMIC x86_64 React/19.2.0 Vite/7.2.4 GNU/Linux',
      }],
      exitCode: 0,
    }),
  },
  date: {
    name: 'date',
    aliases: [],
    summary: 'Display current date and time',
    usage: 'date',
    run: () => ({
      output: [{ view: 'text', text: new Date().toString() }],
      exitCode: 0,
    }),
  },
  echo: {
    name: 'echo',
    aliases: [],
    summary: 'Write arguments to standard output',
    usage: 'echo [string ...]',
    run: (args) => ({
      output: [{ view: 'text', text: args.join(' ') }],
      exitCode: 0,
    }),
  },
  history: {
    name: 'history',
    aliases: [],
    summary: 'Display the command history list',
    usage: 'history',
    run: (_args, ctx) => ({
      output: [{
        view: 'history',
        history: ctx.history || [],
      }],
      exitCode: 0,
    }),
  },
  clear: {
    name: 'clear',
    aliases: ['cls'],
    summary: 'Clear the terminal screen buffer',
    usage: 'clear',
    run: () => ({
      output: [],
      exitCode: 0,
      effects: [{ type: 'clear' }],
    }),
  },
};
