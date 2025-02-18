import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const COLORS = [
  '#FF5733',
  '#33FFBD',
  '#FF33A1',
  '#8E44AD',
  '#F39C12',
  '#2ECC71',
  '#3498DB',
  '#9B59B6',
  '#E74C3C',
  '#1ABC9C',
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}
