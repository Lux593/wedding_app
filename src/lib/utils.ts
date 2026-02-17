import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Kombiniert clsx und tailwind-merge für saubere, überschreibbare Klassen */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
