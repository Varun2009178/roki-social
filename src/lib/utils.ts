import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSevenDaysFromNow() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  // Optional: set to end of day
  d.setHours(23, 59, 59, 999);
  return d.toISOString();
}
