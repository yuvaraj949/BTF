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

/**
 * Encodes a string to base64 (URL-safe, no padding)
 */
export function encodeBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Decodes a base64 (URL-safe, no padding) string
 */
export function decodeBase64(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  // Pad with '=' to make length a multiple of 4
  while (str.length % 4) str += '=';
  return decodeURIComponent(escape(atob(str)));
}
