/**
 * @file Custom type declarations for the application.
 * This file contains ambient module declarations for modules that do not have their own type definitions,
 * or for file types that need to be handled by TypeScript.
 */

/// <reference types="vite/client" />

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'vite-plugin-babel';
