/**
 * Browser-native compression utilities for cache optimization
 * Uses the built-in CompressionStream API (available in modern browsers)
 */

import { logger } from './logger';

/**
 * Compress a string using gzip compression
 * @param data - String data to compress
 * @returns Promise<string> - Base64 encoded compressed data
 */
export async function compressString(data: string): Promise<string> {
  try {
    // Check if CompressionStream is available (modern browsers)
    if (typeof CompressionStream === 'undefined') {
      // Fallback: return original data if compression not available
      return data;
    }

    const stream = new CompressionStream('gzip');
    const writer = stream.writable.getWriter();
    const reader = stream.readable.getReader();

    // Convert string to Uint8Array
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(data);

    // Start compression
    void writer.write(uint8Array);
    void writer.close();

    // Read compressed chunks
    const chunks: Uint8Array[] = [];
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) {
        chunks.push(value);
      }
    }

    // Combine chunks into single array
    const totalLength = chunks.reduce(
      (sum, chunk) => sum + chunk.length,
      0,
    );
    const compressed = new Uint8Array(totalLength);
    let offset = 0;

    for (const chunk of chunks) {
      compressed.set(chunk, offset);
      offset += chunk.length;
    }

    // Convert to base64 for storage
    const base64 = btoa(String.fromCharCode(...compressed));
    return base64;
  } catch (error) {
    logger.warn(
      'Compression failed, returning original data:',
      error,
    );
    return data;
  }
}

/**
 * Decompress a base64 encoded gzip string
 * @param compressedData - Base64 encoded compressed data
 * @returns Promise<string> - Original decompressed string
 */
export async function decompressString(
  compressedData: string,
): Promise<string> {
  try {
    // Check if DecompressionStream is available
    if (typeof DecompressionStream === 'undefined') {
      // Assume data was not compressed if API not available
      return compressedData;
    }

    // Convert base64 back to Uint8Array
    const binaryString = atob(compressedData);
    const compressed = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      compressed[i] = binaryString.charCodeAt(i);
    }

    const stream = new DecompressionStream('gzip');
    const writer = stream.writable.getWriter();
    const reader = stream.readable.getReader();

    // Start decompression
    void writer.write(compressed);
    void writer.close();

    // Read decompressed chunks
    const chunks: Uint8Array[] = [];
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) {
        chunks.push(value);
      }
    }

    // Combine chunks and decode to string
    const totalLength = chunks.reduce(
      (sum, chunk) => sum + chunk.length,
      0,
    );
    const decompressed = new Uint8Array(totalLength);
    let offset = 0;

    for (const chunk of chunks) {
      decompressed.set(chunk, offset);
      offset += chunk.length;
    }

    const decoder = new TextDecoder();
    return decoder.decode(decompressed);
  } catch (error) {
    logger.warn(
      'Decompression failed, returning original data:',
      error,
    );
    return compressedData;
  }
}

/**
 * Check if compression would be beneficial for the given data
 * @param data - String data to check
 * @returns boolean - True if compression should be attempted
 */
export function shouldCompress(data: string): boolean {
  // Only compress if:
  // 1. Data is larger than 1KB (compression overhead not worth it for small data)
  // 2. CompressionStream is available
  // 3. Data appears to be JSON (compresses well)
  return (
    data.length > 1024 &&
    typeof CompressionStream !== 'undefined' &&
    (data.startsWith('{') || data.startsWith('['))
  );
}

/**
 * Get compression statistics for debugging
 * @param original - Original string
 * @param compressed - Compressed string
 * @returns Object with compression stats
 */
export function getCompressionStats(
  original: string,
  compressed: string,
) {
  const originalSize = original.length;
  const compressedSize = compressed.length;
  const ratio =
    ((originalSize - compressedSize) / originalSize) * 100;

  return {
    originalSize,
    compressedSize,
    compressionRatio: Math.round(ratio),
    savedBytes: originalSize - compressedSize,
  };
}
