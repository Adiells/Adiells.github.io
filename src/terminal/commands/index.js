import { navigationCommands } from './navigation.js';
import { infoCommands } from './info.js';
import { funCommands } from './fun.js';
import { tokenize, suggestCommand } from '../parser.js';

export const allCommands = {
  ...navigationCommands,
  ...infoCommands,
  ...funCommands,
};

export const commandList = Object.values(allCommands);

// Build map including command names and aliases
export const commandMap = new Map();
commandList.forEach((cmd) => {
  commandMap.set(cmd.name.toLowerCase(), cmd);
  if (cmd.aliases) {
    cmd.aliases.forEach((alias) => {
      commandMap.set(alias.toLowerCase(), cmd);
    });
  }
});

// Special multi-word shortcuts
const multiWordAliases = {
  'ls -l projects/': { cmd: 'ls', args: ['-l', 'projects/'] },
  'ls projects/': { cmd: 'ls', args: ['projects/'] },
  'ls -l': { cmd: 'ls', args: ['-l'] },
  'ls -la': { cmd: 'ls', args: ['-la'] },
  'cat about.txt': { cmd: 'cat', args: ['about.txt'] },
  'cat contact.json': { cmd: 'cat', args: ['contact.json'] },
  'cat skills.tree': { cmd: 'cat', args: ['skills.tree'] },
  'tree skills/': { cmd: 'tree', args: ['skills/'] },
  'journalctl -u career --reverse': { cmd: 'experience', args: [] },
  'journalctl -u career': { cmd: 'experience', args: [] },
  ':wq': { cmd: 'exit', args: [] },
  ':q': { cmd: 'exit', args: [] },
};

/**
 * Execute a raw command string through the registry
 */
export function executeCommand(rawInput, context) {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      output: [],
      exitCode: 0,
      effects: [],
    };
  }

  // Check multi-word alias
  if (multiWordAliases[trimmed]) {
    const aliased = multiWordAliases[trimmed];
    const cmd = commandMap.get(aliased.cmd);
    if (cmd) {
      return cmd.run(aliased.args, { ...context, commandList });
    }
  }

  const tokens = tokenize(trimmed);
  const commandName = tokens[0].toLowerCase();
  const args = tokens.slice(1);

  const matchedCommand = commandMap.get(commandName);

  if (!matchedCommand) {
    const availableNames = Array.from(commandMap.keys());
    const suggestion = suggestCommand(commandName, availableNames);
    const suggestionText = suggestion ? `\nDid you mean: '${suggestion}'?` : '';

    return {
      output: [{
        view: 'error',
        text: `zsh: command not found: ${tokens[0]}${suggestionText}\nType 'help' to see available commands.`,
      }],
      exitCode: 127,
      effects: [],
    };
  }

  return matchedCommand.run(args, { ...context, commandList });
}
