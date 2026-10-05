import { profile, socials, skills, projects } from '../data/portfolioData.js';

export function getVirtualFiles() {
  return {
    'about.txt': {
      name: 'about.txt',
      type: 'file',
      permissions: '-rw-r--r--',
      content: `${profile.name}\n${profile.role}\n${profile.education}\nStatus: ${profile.status}\nLocation: ${profile.location}\n\n${profile.bio.join('\n\n')}`,
    },
    'contact.json': {
      name: 'contact.json',
      type: 'file',
      permissions: '-rw-r--r--',
      content: JSON.stringify(
        {
          name: profile.name,
          email: 'adielenilson@gmail.com',
          socials: socials.reduce((acc, curr) => {
            acc[curr.id] = curr.url;
            return acc;
          }, {}),
          location: profile.location,
          status: profile.status,
        },
        null,
        2
      ),
    },
    'skills.tree': {
      name: 'skills.tree',
      type: 'file',
      permissions: '-rw-r--r--',
      content: `.\n` + skills.map((g, i) => {
        const isLastGroup = i === skills.length - 1;
        const groupPrefix = isLastGroup ? '└── ' : '├── ';
        const childIndent = isLastGroup ? '    ' : '│   ';
        const items = g.items.map((item, j) => {
          const isLastItem = j === g.items.length - 1;
          return `${childIndent}${isLastItem ? '└── ' : '├── '}${item}`;
        }).join('\n');
        return `${groupPrefix}${g.title}/\n${items}`;
      }).join('\n') + `\n\n${skills.length} directories, ${skills.reduce((acc, g) => acc + g.items.length, 0)} files`,
    },
    'projects': {
      name: 'projects',
      type: 'directory',
      permissions: 'drwxr-xr-x',
      children: projects.map((p) => `${p.slug}.md`),
    },
    '.zshrc': {
      name: '.zshrc',
      type: 'file',
      permissions: '-rw-r--r--',
      content: `# ~/.zshrc for ${profile.user}@${profile.host}\nexport EDITOR="nvim"\nexport THEME="dracula"\nalias ls="ls --color=auto"\nalias ll="ls -la"\nalias grep="grep --color=auto"\nalias cls="clear"\n`,
    },
  };
}
