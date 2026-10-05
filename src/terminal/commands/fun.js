export const funCommands = {
  sudo: {
    name: 'sudo',
    aliases: ['su'],
    summary: 'Execute a command as superuser',
    usage: 'sudo <command>',
    hidden: true,
    run: (_args, ctx) => ({
      output: [
        { view: 'text', text: `[sudo] password for ${ctx.profile ? ctx.profile.user : 'adiel'}: ` },
        { view: 'error', text: 'Permission denied: nice try 😏 This incident will be reported to /dev/null.' },
      ],
      exitCode: 1,
    }),
  },
  exit: {
    name: 'exit',
    aliases: ['quit', ':q', ':wq', 'logout'],
    summary: 'Exit the shell palette',
    usage: 'exit',
    run: () => ({
      output: [{ view: 'text', text: 'logout\n[Process completed with exit code 0]' }],
      exitCode: 0,
      effects: [{ type: 'close', delay: 200 }],
    }),
  },
  pacman: {
    name: 'pacman',
    aliases: [],
    summary: 'Arch / Manjaro package manager',
    usage: 'pacman -S <package>',
    hidden: true,
    run: (args) => ({
      output: [{
        view: 'error',
        text: `error: cannot initialize libalpm (you cannot perform '${args.join(' ')}' unless you are root)`,
      }],
      exitCode: 1,
    }),
  },
  yay: {
    name: 'yay',
    aliases: ['pamac'],
    summary: 'AUR helper',
    usage: 'yay -Syu',
    hidden: true,
    run: () => ({
      output: [{
        view: 'text',
        text: ':: Synchronizing package databases...\n:: Searching AUR for intelligence...\n→ Found 1 match: portfolio-adiel (installed, latest).',
      }],
      exitCode: 0,
    }),
  },
  vim: {
    name: 'vim',
    aliases: ['nvim', 'nano', 'emacs', 'vi'],
    summary: 'Terminal text editor',
    usage: 'vim [file]',
    hidden: true,
    run: () => ({
      output: [{
        view: 'text',
        text: "You are now trapped in vim. Just kidding — type ':q' or press Esc to exit.",
      }],
      exitCode: 0,
    }),
  },
  rm: {
    name: 'rm',
    aliases: [],
    summary: 'Remove files or directories',
    usage: 'rm -rf /',
    hidden: true,
    run: (args) => {
      const isDangerous = args.some((a) => a === '/' || a === '/*' || a === '--no-preserve-root');
      if (isDangerous) {
        return {
          output: [{
            view: 'error',
            text: "rm: it is dangerous to operate recursively on '/'\nrm: use --no-preserve-root to override this failsafe (not going to let you though 😉)",
          }],
          exitCode: 1,
        };
      }
      return {
        output: [{ view: 'error', text: 'rm: read-only filesystem' }],
        exitCode: 1,
      };
    },
  },
};
