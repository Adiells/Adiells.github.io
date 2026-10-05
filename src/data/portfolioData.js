export const profile = {
  name: 'Adiel Emilson',
  user: 'adiel',
  host: 'manjaro-linux',
  tagline: 'Designing models and systems to make sense of complex data.',
  role: 'Data Science & AI Student @ UFPB',
  location: 'Brazil (UTC-3)',
  education: 'UFPB — Data Science & Artificial Intelligence',
  status: 'Available for research & work',
  photo: 'eu.webp',
  careerStart: '2025-06-01',
  bio: [
    'I am a Data Science and Artificial Intelligence student at UFPB in Brazil. My work focuses on machine learning architectures, neural networks, computer vision experiments, and low-level software engineering.',
    'I build data pipelines and integrate intelligent models into usable interfaces, focusing on clear information hierarchies, strict logic, and functional design.',
  ],
};

export const socials = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/adiells',
    handle: 'github.com/adiells',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/adielemilson',
    handle: 'linkedin.com/in/adielemilson',
  },
  {
    id: 'email',
    label: 'Email',
    url: 'mailto:adielenilson@gmail.com',
    handle: 'adielenilson@gmail.com',
  },
];

export const system = {
  os: 'Manjaro Linux x86_64',
  host: 'Portfolio v2.0.0',
  shell: 'zsh 5.9',
  de: 'GNOME 50 (Wayland)',
  wm: 'React + Vite',
  theme: 'Dracula [GTK3/4]',
  font: 'JetBrainsMono Nerd Font',
  editor: 'Neovim',
  cpu: 'Data Science & AI @ UFPB',
  gpu: 'Computer Vision · Neural Networks',
  memory: 'always learning / ∞',
  locale: 'en_US.UTF-8 · Brazil (UTC-3)',
};

export const skills = [
  {
    icon: 'Code',
    title: 'AI Applications',
    slug: 'ai-applications',
    description: 'Applied AI systems, intelligent interfaces and experiments connecting models to real use cases.',
    items: ['Python', 'React', 'Model Integration', 'Data Pipelines', 'APIs', 'Docker'],
  },
  {
    icon: 'Brain',
    title: 'AI & Data Science',
    slug: 'ai-and-data-science',
    description: 'Machine learning workflows, neuroevolution, computer vision experiments and data-driven problem solving.',
    items: ['Python', 'OpenCV', 'YOLO', 'Pandas', 'Scikit-learn', 'Neural Networks', 'Machine Learning'],
  },
  {
    icon: 'ChartLineUp',
    title: 'Data Analysis & Visualization',
    slug: 'data-analysis',
    description: 'Exploratory analysis, statistical thinking and clear visuals for communicating insights.',
    items: ['Matplotlib', 'Seaborn', 'Data Wrangling', 'Statistical Analysis'],
  },
];

export const experiences = [
  {
    title: 'TAIL',
    subtitle: 'Technology and Artificial Intelligence League',
    role: 'Trainee',
    date: 'June 2026 - Present',
    icon: 'Brain',
    description:
      'Joined the Technology and Artificial Intelligence League to collaborate on AI projects, research, and learning initiatives.',
    image: 'TAIL.webp',
    tags: ['Artificial Intelligence', 'Machine Learning', 'Research', 'Technology'],
  },
  {
    title: 'Cortechx League',
    subtitle: 'Human-Computer Interaction',
    role: 'Data researcher',
    date: 'July 2025 - Present',
    icon: 'Users',
    description: 'Worked with web page development and data engineering.',
    image: 'cortechx.webp',
    tags: ['Python', 'Data engineering', 'AI Research', 'Data Analysis', 'React'],
  },
  {
    title: 'LASER Lab',
    subtitle: 'Robotics Systems Engineering Lab',
    role: 'Member / Researcher',
    date: 'June 2025 - December 2025',
    icon: 'Cpu',
    description: 'Worked on robotics systems, control algorithms, and real-time embedded systems.',
    image: 'laser.webp',
    tags: ['ROS', 'C++', 'Computer Vision', 'Robotics', 'YOLO', 'Embedded Systems'],
  },
];

export const projects = [
  {
    slug: 'neuroevolution-snake',
    title: 'Neuroevolution Snake',
    category: 'AI',
    year: '2026',
    permissions: 'drwxr-xr-x',
    highlight: 'Snake agent trained with a genetic algorithm',
    description:
      'Neuroevolution project where neural-network-controlled Snake agents improve over generations through selection, crossover, and mutation, learning to survive longer and collect food through genetic optimization.',
    tools: ['Python', 'Genetic Algorithm', 'Neural Networks', 'Pygame'],
    icon: 'Brain',
    mediaType: 'video',
    media: 'neuroevolution.webm',
    link: 'https://github.com/Adiells/neuro-evolution-snake',
  },
  {
    slug: 'structured-recommendation-system',
    title: 'Structured Recommendation System',
    category: 'DATA SCIENCE',
    year: '2025',
    permissions: 'drwxr-xr-x',
    highlight: 'Hybrid Python and C++ recommender',
    description:
      'Product recommendation engine built for a Structured Programming project. It uses user-based collaborative filtering over purchase history, combining CSV ingestion in Python with customer-product, intersection, and similarity matrices computed in C++ via pybind11 to rank top-k unseen products for each target customer.',
    tools: ['Python', 'C++', 'pybind11'],
    icon: 'ChartLineUp',
    mediaType: 'video',
    media: 'recomendation.webm',
    link: 'https://github.com/Adiells/structured-recommendation-system',
  },
];

export const sections = [
  { id: 'home', label: '1:~', path: '~', title: 'whoami' },
  { id: 'projects', label: '2:projects', path: '~/portfolio', title: 'ls -l projects/' },
  { id: 'experience', label: '3:experience', path: '~/portfolio', title: 'journalctl -u career --reverse' },
  { id: 'skills', label: '4:skills', path: '~/portfolio', title: 'tree skills/' },
  { id: 'contact', label: '5:contact', path: '~/portfolio', title: 'cat contact.json' },
];

export const quickCommands = [
  'whoami',
  'projects',
  'experience',
  'skills',
  'contact',
  'fastfetch',
  'help',
];
