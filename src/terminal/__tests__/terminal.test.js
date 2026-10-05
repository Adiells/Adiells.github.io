import { describe, it, expect } from 'vitest';
import { tokenize, levenshtein, suggestCommand } from '../parser.js';
import { longestCommonPrefix, completeInput } from '../completion.js';
import { executeCommand } from '../commands/index.js';
import { profile, system, projects, sections } from '../../data/portfolioData.js';
import { getVirtualFiles } from '../files.js';

describe('Terminal Parser', () => {
  it('tokenizes simple strings', () => {
    expect(tokenize('cat about.txt')).toEqual(['cat', 'about.txt']);
  });

  it('tokenizes quotes and flags properly', () => {
    expect(tokenize('echo "hello world" -n')).toEqual(['echo', 'hello world', '-n']);
    expect(tokenize("cd 'projects folder'")).toEqual(['cd', 'projects folder']);
  });

  it('computes levenshtein distance correctly', () => {
    expect(levenshtein('projects', 'projcts')).toBe(1);
    expect(levenshtein('help', 'help')).toBe(0);
  });

  it('suggests closest command on typo', () => {
    const candidates = ['about', 'projects', 'skills', 'contact', 'help'];
    expect(suggestCommand('projcts', candidates)).toBe('projects');
    expect(suggestCommand('hlp', candidates)).toBe('help');
    expect(suggestCommand('xyz123', candidates)).toBeNull();
  });
});

describe('Terminal Autocomplete Engine', () => {
  it('calculates longest common prefix', () => {
    expect(longestCommonPrefix(['project', 'projects', 'project-detail'])).toBe('project');
    expect(longestCommonPrefix(['cat', 'cd'])).toBe('c');
  });

  it('completes single matching command name with a space', () => {
    const result = completeInput('pro', {
      commandNames: ['about', 'projects', 'skills'],
      sections: ['home', 'projects'],
      projectSlugs: ['neuroevolution-snake'],
      files: ['about.txt'],
    });
    expect(result.input).toBe('projects ');
  });

  it('completes argument for cd and open', () => {
    const result = completeInput('open neuro', {
      commandNames: ['open'],
      sections: ['home', 'projects'],
      projectSlugs: ['neuroevolution-snake'],
      files: ['about.txt'],
    });
    expect(result.input).toBe('open neuroevolution-snake ');
  });
});

describe('Command Execution Engine', () => {
  const context = {
    profile,
    system,
    projects,
    sections,
    files: getVirtualFiles(),
    history: [],
  };

  it('executes whoami / about and returns scrollTo effect', () => {
    const res = executeCommand('whoami', context);
    expect(res.exitCode).toBe(0);
    expect(res.effects.some((e) => e.type === 'scrollTo' && e.id === 'about')).toBe(true);
  });

  it('executes help and lists commands', () => {
    const res = executeCommand('help', context);
    expect(res.exitCode).toBe(0);
    expect(res.output[0].view).toBe('help');
  });

  it('handles multi-word aliases like ls -l projects/', () => {
    const res = executeCommand('ls -l projects/', context);
    expect(res.exitCode).toBe(0);
    expect(res.output[0].view).toBe('lsProjects');
  });

  it('returns typo suggestions on unknown commands (exitCode 127)', () => {
    const res = executeCommand('projcts', context);
    expect(res.exitCode).toBe(127);
    expect(res.output[0].text).toContain("Did you mean: 'projects'?");
  });

  it('handles easter egg sudo with exitCode 1', () => {
    const res = executeCommand('sudo rm -rf /', context);
    expect(res.exitCode).toBe(1);
    expect(res.output[1].text).toContain('Permission denied');
  });
});
