// Utility functions for the frontend (e.g. className merging helper).

// Example usage:
//   cn('btn', isActive && 'btn-active', customClass)

/**
 * cn(...inputs): Merges class names using clsx and tailwind-merge
 * - Use for conditional and deduplicated className strings
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
