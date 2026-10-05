import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { executeCommand } from '../terminal/commands/index.js';
import { completeInput } from '../terminal/completion.js';
import { getVirtualFiles } from '../terminal/files.js';

const STORAGE_KEY = 'adiel_portfolio_history';
const MAX_HISTORY = 100;

function terminalReducer(state, action) {
  switch (action.type) {
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [...state.entries, action.payload],
        lastExitCode: action.payload.exitCode,
      };
    case 'CLEAR_ENTRIES':
      return {
        ...state,
        entries: [],
      };
    default:
      return state;
  }
}

export function useTerminal({ profile, system, projects, sections, onEffect }) {
  const [state, dispatch] = useReducer(terminalReducer, {
    entries: [],
    lastExitCode: 0,
  });

  const [input, setInput] = useState('');
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const historyIndexRef = useRef(-1);
  const draftInputRef = useRef('');
  const virtualFiles = useRef(getVirtualFiles());

  // Keep localStorage history synced
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-MAX_HISTORY)));
    } catch {
      // Ignore storage errors
    }
  }, [history]);

  const execute = useCallback(
    (rawInput) => {
      const trimmed = rawInput.trim();
      if (!trimmed) return;

      // Update history list
      setHistory((prev) => {
        if (prev[prev.length - 1] === trimmed) return prev;
        return [...prev, trimmed].slice(-MAX_HISTORY);
      });
      historyIndexRef.current = -1;
      draftInputRef.current = '';

      const context = {
        profile,
        system,
        projects,
        sections,
        files: virtualFiles.current,
        history,
      };

      const result = executeCommand(trimmed, context);

      if (result.effects) {
        result.effects.forEach((eff) => {
          if (eff.type === 'clear') {
            dispatch({ type: 'CLEAR_ENTRIES' });
          } else if (onEffect) {
            onEffect(eff);
          }
        });
      }

      dispatch({
        type: 'ADD_ENTRY',
        payload: {
          id: Date.now() + Math.random(),
          input: rawInput,
          output: result.output,
          exitCode: result.exitCode,
        },
      });

      setInput('');
    },
    [profile, system, projects, sections, history, onEffect]
  );

  const handleKeyDown = useCallback(
    (e) => {
      // Arrow Up -> Older history
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length === 0) return;

        if (historyIndexRef.current === -1) {
          draftInputRef.current = input;
          historyIndexRef.current = history.length - 1;
        } else if (historyIndexRef.current > 0) {
          historyIndexRef.current -= 1;
        }
        setInput(history[historyIndexRef.current] || '');
        return;
      }

      // Arrow Down -> Newer history
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndexRef.current === -1) return;

        if (historyIndexRef.current < history.length - 1) {
          historyIndexRef.current += 1;
          setInput(history[historyIndexRef.current] || '');
        } else {
          historyIndexRef.current = -1;
          setInput(draftInputRef.current);
        }
        return;
      }

      // Tab -> Autocomplete
      if (e.key === 'Tab') {
        e.preventDefault();
        const completionContext = {
          commandNames: [
            'about', 'projects', 'experience', 'skills', 'contact', 'home',
            'cd', 'ls', 'pwd', 'open', 'help', 'man', 'fastfetch', 'cat',
            'tree', 'uname', 'date', 'echo', 'history', 'clear', 'sudo', 'exit',
          ],
          sections: sections.map((s) => s.id),
          projectSlugs: projects.map((p) => p.slug),
          files: Object.keys(virtualFiles.current),
        };

        const res = completeInput(input, completionContext);
        if (res.input !== input) {
          setInput(res.input);
        }
        return;
      }

      // Ctrl + L -> Clear screen
      if (e.ctrlKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        dispatch({ type: 'CLEAR_ENTRIES' });
        return;
      }

      // Ctrl + U -> Clear input line
      if (e.ctrlKey && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        setInput('');
        return;
      }

      // Enter -> Run command
      if (e.key === 'Enter') {
        e.preventDefault();
        execute(input);
      }
    },
    [input, history, sections, projects, execute]
  );

  return {
    entries: state.entries,
    lastExitCode: state.lastExitCode,
    input,
    setInput,
    execute,
    handleKeyDown,
    clear: () => dispatch({ type: 'CLEAR_ENTRIES' }),
  };
}
