/**
 * @file PrivacyToggle.tsx
 * @description Toggle component for GDPR privacy mode on name display.
 */

import { mlCard } from '@/music-league/styles/music-league-theme';
import type { PrivacyMode } from '@/music-league/utils/privacyUtils';
import { Eye, EyeOff, Shield } from 'lucide-react';
import type { FC } from 'react';

interface PrivacyToggleProps {
  mode: PrivacyMode;
  onChange: (mode: PrivacyMode) => void;
}

const options: {
  value: PrivacyMode;
  label: string;
  icon: typeof Eye;
}[] = [
  { value: 'full', label: 'Full Names', icon: Eye },
  { value: 'initials', label: 'Initials', icon: Shield },
  { value: 'first-only', label: 'First Only', icon: EyeOff },
];

const PrivacyToggle: FC<PrivacyToggleProps> = ({
  mode,
  onChange,
}) => {
  return (
    <div
      className={`${mlCard.base} inline-flex items-center gap-1 p-1`}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = mode === opt.value;

        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              isActive
                ? 'bg-white/10 text-white'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
            title={`Show ${opt.label.toLowerCase()}`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default PrivacyToggle;
