'use client';

import { cn } from '@/shared/lib/utils';
import { useEffect, useRef, useState } from 'react';

export interface GlobeProps {
  className?: string;
  size?: number;
  backgroundColor?: string;
  showGraticule?: boolean;
  globeColor?: string;
  markerColor?: string;
  glowColor?: string;
  markers?: {
    location: [number, number];
    size: number;
  }[];
}

export function Globe({
  className,
  size = 300,
  backgroundColor = 'transparent',
  showGraticule = true,
  globeColor = '#1d4ed8',
  markerColor = '#3b82f6',
  glowColor = '#3b82f6',
  markers = [],
}: Readonly<GlobeProps>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // Skip animation in test environment
    if (process.env.NODE_ENV === 'test') {
      setIsLoaded(true);
      return;
    }

    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      // Create globe gradient
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      );
      gradient.addColorStop(0, globeColor + '40');
      gradient.addColorStop(0.7, globeColor + '80');
      gradient.addColorStop(1, globeColor + '20');

      // Draw globe
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 10, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw outline
      ctx.strokeStyle = globeColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      if (showGraticule) {
        // Draw latitude lines
        ctx.strokeStyle = globeColor + '40';
        ctx.lineWidth = 1;
        for (let i = 1; i < 6; i++) {
          const y = (size / 6) * i;
          ctx.beginPath();
          ctx.ellipse(
            size / 2,
            y,
            (size / 2 - 10) * Math.sin((i * Math.PI) / 6),
            (size / 2 - 10) / 8,
            0,
            0,
            Math.PI * 2,
          );
          ctx.stroke();
        }

        // Draw longitude lines
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3 + rotation;
          ctx.beginPath();
          ctx.ellipse(
            size / 2,
            size / 2,
            (size / 2 - 10) * Math.cos(angle),
            size / 2 - 10,
            angle,
            0,
            Math.PI * 2,
          );
          ctx.stroke();
        }
      }

      // Draw markers
      markers.forEach((marker) => {
        const [lat, lng] = marker.location;
        const x =
          size / 2 +
          (lng / 180) * (size / 2 - 10) * Math.cos(rotation);
        const y = size / 2 + (lat / 90) * (size / 2 - 10);

        if (x >= 10 && x <= size - 10 && y >= 10 && y <= size - 10) {
          ctx.beginPath();
          ctx.arc(x, y, marker.size, 0, Math.PI * 2);
          ctx.fillStyle = markerColor;
          ctx.fill();

          // Add glow effect
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      rotation += 0.005;
      animationRef.current = requestAnimationFrame(animate);
    };

    setIsLoaded(true);
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    size,
    backgroundColor,
    showGraticule,
    globeColor,
    markerColor,
    glowColor,
    markers,
  ]);

  return (
    <div
      className={cn('flex items-center justify-center', className)}
      style={{ backgroundColor }}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          'transition-opacity duration-1000',
          isLoaded ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
}
