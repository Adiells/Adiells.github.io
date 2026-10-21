export const profile = {
  name: 'Adiel Emilson',
  user: 'adiel',
  host: 'ufpb-ai-lab',
  tagline: 'Designing intelligent models and high-performance data systems.',
  role: 'AI & Data Systems Researcher @ UFPB',
  location: 'João Pessoa, Brazil (UTC-3)',
  education: 'B.S. in Data Science & Artificial Intelligence — UFPB',
  status: 'Available for R&D and Software Engineering',
  photo: 'eu.webp',
  careerStart: '2025-06-01',
  affiliations: ['UFPB', 'TAIL', 'Cortechx League', 'LASER Lab'],
  focusAreas: [
    'Deep Learning & Audio DSP',
    'Computer Vision & Robotics',
    'C++/Python Systems',
  ],
  bio: [
    'I research and engineer machine learning architectures, signal processing pipelines, and high-performance software systems at the Federal University of Paraíba (UFPB).',
    'My work bridges deep learning models and low-level execution—combining PyTorch neural networks, C++ computational kernels via pybind11, and real-time interactive visualizers into production-grade tools.',
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
  os: 'R&D Systems Environment',
  host: 'Portfolio Architecture v3.0',
  shell: 'Command Palette (⌘K)',
  de: 'Precision Engineering UI',
  wm: 'React 19 + Vite 7',
  theme: 'Dark Mineral / Light Industrial',
  font: 'Space Grotesk · Plus Jakarta Sans · JetBrains Mono',
  editor: 'PyTorch · C++17 · Python 3.12',
  cpu: 'Data Science & AI @ UFPB',
  gpu: 'PyTorch · Audio DSP · Computer Vision',
  memory: 'C++17 / pybind11 / Python Runtime',
  locale: 'João Pessoa, Brazil (UTC-3)',
};

export const skills = [
  {
    layer: '01',
    icon: 'Brain',
    slug: 'ml-computer-vision',
    title: 'Machine Learning & Computer Vision',
    subtitle: 'Neural Architectures · Signal & Visual Perception',
    description:
      'End-to-end training and inference pipelines spanning deep neural networks, spectral audio processing, real-time object detection, and evolutionary optimization.',
    items: [
      'PyTorch',
      'Deep Learning',
      'Computer Vision (YOLO / OpenCV)',
      'Audio DSP & STFT',
      'Neuroevolution & Genetic Algorithms',
      'Scikit-learn',
    ],
  },
  {
    layer: '02',
    icon: 'Cpu',
    slug: 'high-performance-robotics',
    title: 'High-Performance & Robotics Systems',
    subtitle: 'Native C++ Kernels · Autonomous Control',
    description:
      'Low-latency native computation, Python/C++ interoperability, and embedded robotic perception and control loops engineered for deterministic execution.',
    items: [
      'C++',
      'pybind11',
      'ROS (Robot Operating System)',
      'Embedded Systems',
      'Algorithmic Control',
      'Similarity & Matrix Kernels',
    ],
  },
  {
    layer: '03',
    icon: 'ChartLineUp',
    slug: 'data-engineering-interfaces',
    title: 'Data Engineering & Interactive Interfaces',
    subtitle: 'Analytical Pipelines · Technical Web Systems',
    description:
      'Structured data ingestion, statistical modeling, and high-contrast web interfaces that expose complex model telemetry and 3D previews in real time.',
    items: [
      'Python',
      'Pandas & Data Pipelines',
      'Statistical Analysis',
      'React & 3D Web Previewers',
      'Model Serving & APIs',
      'Docker & Linux',
    ],
  },
];

export const experiences = [
  {
    id: 'tail',
    title: 'TAIL',
    subtitle: 'Technology and Artificial Intelligence League',
    role: 'Trainee Researcher',
    date: 'June 2026 - Present',
    domain: 'Machine Learning & Applied AI Research',
    icon: 'Brain',
    description:
      'Design and evaluate deep learning architectures, applied machine learning pipelines, and collaborative research experiments within UFPB’s AI league.',
    image: 'TAIL.webp',
    tags: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Applied Research'],
  },
  {
    id: 'cortechx',
    title: 'Cortechx League',
    subtitle: 'Human-Computer Interaction & Data Systems',
    role: 'Data Researcher',
    date: 'July 2025 - Present',
    domain: 'Data Engineering & Human-Computer Interaction',
    icon: 'Users',
    description:
      'Architect data engineering workflows, analytical pipelines, and interactive React interfaces supporting human-computer interaction research.',
    image: 'cortechx.webp',
    tags: ['Python', 'Data Engineering', 'AI Research', 'Data Analysis', 'React'],
  },
  {
    id: 'laser',
    title: 'LASER Lab',
    subtitle: 'Robotics Systems Engineering Lab',
    role: 'Member / Researcher',
    date: 'June 2025 - December 2025',
    domain: 'Robotics, Computer Vision & Embedded C++',
    icon: 'Cpu',
    description:
      'Implemented real-time computer vision detection with YOLO, autonomous robotic control algorithms, and embedded C++ modules over ROS.',
    image: 'laser.webp',
    tags: ['ROS', 'C++', 'Computer Vision', 'Robotics', 'YOLO', 'Embedded Systems'],
  },
];

const music2chartMetrics = [
  { label: 'Pipeline', value: 'Audio DSP → PyTorch → 3D' },
  { label: 'Export Formats', value: '.chart / .sng' },
  { label: 'Preview Engine', value: 'Real-Time 3D Highway' },
];

const music2chartNodes = [
  {
    id: 'm2c-input',
    stage: 'INPUT / INGESTION',
    title: 'Spectral Audio & STFT Pipeline',
    tech: 'Python · Audio DSP · Mel Spectrograms',
    detail:
      'Decodes raw audio streams and computes multi-resolution short-time Fourier transforms and onset strength envelopes for frame-accurate temporal alignment.',
  },
  {
    id: 'm2c-engine',
    stage: 'CORE ENGINE',
    title: 'PyTorch Beat & Onset Transcription Net',
    tech: 'PyTorch · Deep Neural Networks',
    detail:
      'Runs neural sequence inference to detect transient onsets, estimate tempo maps, and quantize polyphonic note patterns across difficulty tiers.',
  },
  {
    id: 'm2c-output',
    stage: 'OUTPUT / RUNTIME',
    title: 'Chart Serializer & 3D Highway Preview',
    tech: 'WebGL / 3D · .chart & .sng',
    detail:
      'Compiles quantized note events into rhythm-game packages (.chart / .sng) and streams synchronized telemetry to an interactive 3D highway visualizer.',
  },
];

const snakeMetrics = [
  { label: 'Optimization', value: 'Genetic Crossover & Mutation' },
  { label: 'Policy Network', value: 'Feedforward MLP' },
  { label: 'Simulation', value: 'Multi-Agent Pygame Loop' },
];

const snakeNodes = [
  {
    id: 'snake-input',
    stage: 'INPUT / INGESTION',
    title: 'Directional Raycast Sensor Array',
    tech: 'Python · Spatial Feature Extraction',
    detail:
      'Samples multi-axis distances to walls, body segments, and targets at every tick to form a normalized state vector for each autonomous agent.',
  },
  {
    id: 'snake-engine',
    stage: 'CORE ENGINE',
    title: 'MLP Policy & Genetic Evolution Loop',
    tech: 'Neural Networks · Elitism & Crossover',
    detail:
      'Evaluates population fitness across episodes, applying tournament selection, weight crossover, and Gaussian mutation to evolve higher-scoring policies.',
  },
  {
    id: 'snake-output',
    stage: 'OUTPUT / RUNTIME',
    title: 'Autonomous Navigation Telemetry',
    tech: 'Pygame · Real-Time Agent Visualizer',
    detail:
      'Executes deterministic argmax action selection per frame while rendering live generation statistics, survival curves, and trajectory overlays.',
  },
];

const recommenderMetrics = [
  { label: 'Core Kernel', value: 'C++17 via pybind11' },
  { label: 'Algorithm', value: 'User-Based Collaborative Filtering' },
  { label: 'Data Layer', value: 'Sparse Matrix Similarity' },
];

const recommenderNodes = [
  {
    id: 'rec-input',
    stage: 'INPUT / INGESTION',
    title: 'Transactional CSV Ingestion & Indexing',
    tech: 'Python · Structured Data Parsing',
    detail:
      'Parses raw customer purchase logs, normalizes entity identifiers, and builds contiguous index mappings for zero-copy transfer into native memory.',
  },
  {
    id: 'rec-engine',
    stage: 'CORE ENGINE',
    title: 'Native C++ Intersection & Similarity Kernel',
    tech: 'C++ · pybind11 · Matrix Algebra',
    detail:
      'Computes customer-product incidence, co-occurrence intersections, and pairwise cosine similarity matrices in compiled C++ exposed to Python via pybind11.',
  },
  {
    id: 'rec-output',
    stage: 'OUTPUT / RUNTIME',
    title: 'Top-K Unseen Product Ranker',
    tech: 'Python · Collaborative Scoring',
    detail:
      'Aggregates neighbor-weighted preference scores and filters historical purchases to emit deterministic top-k product recommendations per target user.',
  },
];

export const projects = [
  {
    slug: 'music2chart',
    title: 'Music2Chart',
    category: 'AI & AUDIO DSP',
    domain: 'Deep Learning & Audio Signal Processing',
    role: 'Lead ML & Systems Engineer',
    year: '2026',
    flagship: true,
    highlight: 'End-to-end deep learning pipeline converting raw audio into playable rhythm game charts with a 3D web previewer.',
    description:
      'Deep learning system that transcribes raw audio tracks into playable Clone Hero and YARG rhythm game charts (.chart / .sng). Combines spectral audio DSP with PyTorch neural networks for beat tracking, onset detection, and note quantization, paired with a real-time 3D highway visualizer.',
    tools: ['PyTorch', 'Python', 'Audio DSP', 'Deep Learning', 'Neural Networks'],
    icon: 'Brain',
    mediaType: 'video',
    media: 'music2chart.webm',
    link: 'https://music2chart.adiels.me/',
    repo: 'https://github.com/Adiells/music2chart',
    metrics: music2chartMetrics,
    architectureNodes: music2chartNodes,
    architecture: {
      summary: 'Spectral Audio DSP → PyTorch Onset & Beat Net → 3D Highway & .chart Serializer',
      metrics: music2chartMetrics,
      nodes: music2chartNodes,
    },
  },
  {
    slug: 'neuroevolution-snake',
    title: 'Neuroevolution Snake',
    category: 'AI & GENETIC OPTIMIZATION',
    domain: 'Evolutionary Computation & Autonomous Agents',
    role: 'AI Researcher & Developer',
    year: '2026',
    flagship: false,
    highlight: 'Autonomous neural-network agents evolved via genetic selection, crossover, and mutation.',
    description:
      'Neuroevolution simulation where populations of neural-network-controlled agents learn optimal navigation and foraging policies without backpropagation, evolving weights across generations through elitism, crossover, and Gaussian mutation.',
    tools: ['Python', 'Genetic Algorithm', 'Neural Networks', 'Pygame'],
    icon: 'Brain',
    mediaType: 'video',
    media: 'neuroevolution.webm',
    link: 'https://github.com/Adiells/neuro-evolution-snake',
    repo: 'https://github.com/Adiells/neuro-evolution-snake',
    metrics: snakeMetrics,
    architectureNodes: snakeNodes,
    architecture: {
      summary: 'Raycast Sensor State → Genetic Crossover & MLP Policy → Autonomous Control Loop',
      metrics: snakeMetrics,
      nodes: snakeNodes,
    },
  },
  {
    slug: 'structured-recommendation-system',
    title: 'Structured Recommendation System',
    category: 'DATA SCIENCE & C++ SYSTEMS',
    domain: 'High-Performance Collaborative Filtering',
    role: 'Systems & Data Engineer',
    year: '2025',
    flagship: false,
    highlight: 'Hybrid Python/C++ collaborative filtering engine powered by pybind11 matrix kernels.',
    description:
      'High-performance product recommendation engine combining Python data ingestion with native C++ matrix kernels via pybind11. Computes customer-product incidence, intersection, and similarity matrices to rank top-k unseen products per user.',
    tools: ['Python', 'C++', 'pybind11'],
    icon: 'ChartLineUp',
    mediaType: 'video',
    media: 'recomendation.webm',
    link: 'https://github.com/Adiells/structured-recommendation-system',
    repo: 'https://github.com/Adiells/structured-recommendation-system',
    metrics: recommenderMetrics,
    architectureNodes: recommenderNodes,
    architecture: {
      summary: 'Python CSV Ingestion → pybind11 C++ Similarity Kernel → Top-K Ranking Output',
      metrics: recommenderMetrics,
      nodes: recommenderNodes,
    },
  },
];

export const sections = [
  { id: 'home', index: '01', label: 'Overview', title: 'Overview' },
  { id: 'projects', index: '02', label: 'Projects', title: 'Selected Projects & Systems' },
  { id: 'experience', index: '03', label: 'Research', title: 'Research Labs' },
  { id: 'skills', index: '04', label: 'Capabilities', title: 'Capabilities Matrix' },
  { id: 'contact', index: '05', label: 'Contact', title: 'Contact' },
];

export const quickCommands = [
  'overview',
  'projects',
  'experience',
  'skills',
  'contact',
];
