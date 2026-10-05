/**
 * Compute the longest common prefix among a list of strings
 */
export function longestCommonPrefix(strings) {
  if (!strings || strings.length === 0) return '';
  if (strings.length === 1) return strings[0];

  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (strings[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (!prefix) return '';
    }
  }
  return prefix;
}

/**
 * Perform bash/zsh-like autocomplete on input string
 */
export function completeInput(rawInput, { commandNames, sections, projectSlugs, files = [] }, { secondTab = false } = {}) {
  const trimmedLeft = rawInput.trimStart();
  const tokens = trimmedLeft.split(/\s+/);

  // Case 1: Completing the first token (command name)
  if (tokens.length <= 1) {
    const prefix = tokens[0] || '';
    const matches = commandNames.filter((cmd) => cmd.startsWith(prefix.toLowerCase()));

    if (matches.length === 0) {
      return { input: rawInput, candidates: [] };
    }

    if (matches.length === 1) {
      return { input: matches[0] + ' ', candidates: [] };
    }

    const lcp = longestCommonPrefix(matches);
    if (lcp.length > prefix.length) {
      return { input: lcp, candidates: secondTab ? matches : [] };
    }

    return { input: rawInput, candidates: matches };
  }

  // Case 2: Completing arguments
  const command = tokens[0].toLowerCase();
  const lastToken = tokens[tokens.length - 1];
  const beforeLast = rawInput.substring(0, rawInput.lastIndexOf(lastToken));

  let pool = [];
  if (command === 'cd') {
    pool = [...sections, '..', '~', 'portfolio', 'projects'];
  } else if (command === 'open' || command === 'xdg-open') {
    pool = projectSlugs;
  } else if (command === 'cat') {
    pool = files;
  } else if (command === 'man') {
    pool = commandNames;
  }

  const matches = pool.filter((item) => item.startsWith(lastToken));

  if (matches.length === 0) {
    return { input: rawInput, candidates: [] };
  }

  if (matches.length === 1) {
    const isDir = matches[0] === 'projects' || matches[0] === 'portfolio';
    return { input: beforeLast + matches[0] + (isDir ? '/' : ' '), candidates: [] };
  }

  const lcp = longestCommonPrefix(matches);
  if (lcp.length > lastToken.length) {
    return { input: beforeLast + lcp, candidates: secondTab ? matches : [] };
  }

  return { input: rawInput, candidates: matches };
}
