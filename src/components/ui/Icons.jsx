import React from 'react';

function Icon({ children, className, size = 20, ...props }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowUpRightIcon = (props) => <Icon {...props}><path d="M7 17 17 7M7 7h10v10" /></Icon>;
export const ArrowDownIcon = (props) => <Icon {...props}><path d="M12 5v14M5 12l7 7 7-7" /></Icon>;
export const SearchIcon = (props) => <Icon {...props}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></Icon>;
export const CopyIcon = (props) => <Icon {...props}><rect x="8" y="8" width="12" height="12" rx="1.5" /><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" /></Icon>;
export const CheckIcon = (props) => <Icon {...props}><path d="m5 12.5 4.5 4.5L19 7" /></Icon>;
export const SunIcon = (props) => <Icon {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></Icon>;
export const MoonIcon = (props) => <Icon {...props}><path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" /></Icon>;
export const GitHubIcon = (props) => <Icon {...props}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.8a5.3 5.3 0 0 0-1.4-3.7 4.9 4.9 0 0 0-.1-3.7S17.5 1 15 3.3a13.3 13.3 0 0 0-7 0C5.5 1 4.3 1.3 4.3 1.3a4.9 4.9 0 0 0-.1 3.7 5.3 5.3 0 0 0-1.4 3.7c0 5.3 3.1 6.5 6.1 6.8a3.4 3.4 0 0 0-.9 2.6V22" /></Icon>;
export const LinkedInIcon = (props) => <Icon {...props}><path d="M5 9v10M5 5v.01M10 19v-5.2a3.3 3.3 0 0 1 6.6 0V19M10 9v10" /><rect x="2.5" y="2.5" width="19" height="19" rx="2" /></Icon>;
export const MailIcon = (props) => <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></Icon>;
export const CpuIcon = (props) => <Icon {...props}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 9h6v6H9zM9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" /></Icon>;
export const LayersIcon = (props) => <Icon {...props}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></Icon>;
export const ActivityIcon = (props) => <Icon {...props}><path d="M3 12h4l3-8 4 16 3-8h4" /></Icon>;
export const PlayIcon = (props) => <Icon {...props}><path d="m8 5 11 7-11 7V5Z" /></Icon>;
export const CloseIcon = (props) => <Icon {...props}><path d="m18 6-12 12M6 6l12 12" /></Icon>;
export const MenuIcon = (props) => <Icon {...props}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>;
export const CommandIcon = (props) => <Icon {...props}><path d="M9 7V5a2 2 0 1 0-2 2h10a2 2 0 1 0-2-2v14a2 2 0 1 0 2-2H7a2 2 0 1 0 2 2V7Z" /></Icon>;
