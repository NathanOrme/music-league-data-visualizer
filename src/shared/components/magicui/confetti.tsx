'use client';

import { cn } from '@/shared/lib/utils';
import { useCallback, useEffect, useRef } from 'react';

export interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: { x?: number; y?: number };
  colors?: string[];
  shapes?: ('square' | 'circle')[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
}

export interface ConfettiRef {
  fire: (options?: ConfettiOptions) => void;
}

export interface ConfettiProps {
  className?: string;
  children?: React.ReactNode;
  options?: ConfettiOptions;
  globalOptions?: ConfettiOptions;
  manualstart?: boolean;
}

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  decay: number;
  gravity: number;
  drift: number;
  ticks: number;
  ticksMax: number;
  color: string;
  shape: 'square' | 'circle';
  scalar: number;
}

export const Confetti = ({
  className,
  children,
  options = {},
  globalOptions = {},
  manualstart = false,
}: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<ConfettiParticle[]>([]);
  const animationId = useRef<number>();

  const defaultOptions: Required<ConfettiOptions> = {
    particleCount: 50,
    angle: 90,
    spread: 45,
    startVelocity: 45,
    decay: 0.9,
    gravity: 1,
    drift: 0,
    ticks: 200,
    origin: { x: 0.5, y: 0.5 },
    colors: [
      '#9b59b6',
      '#1abc9c',
      '#f39c12',
      '#e74c3c',
      '#3498db',
      '#2ecc71',
    ],
    shapes: ['square', 'circle'],
    scalar: 1,
    zIndex: 100,
    disableForReducedMotion: false,
  };

  const fire = useCallback(
    (opts: ConfettiOptions = {}) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const mergedOptions = {
        ...defaultOptions,
        ...globalOptions,
        ...opts,
      };

      // Skip animation in test environment
      if (process.env.NODE_ENV === 'test') {
        return;
      }

      // Check for reduced motion
      if (
        mergedOptions.disableForReducedMotion &&
        window.matchMedia('(prefers-reduced-motion)').matches
      ) {
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return;
      }

      // Set canvas size
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Create particles
      for (let i = 0; i < mergedOptions.particleCount; i++) {
        const angle =
          mergedOptions.angle -
          mergedOptions.spread / 2 +
          Math.random() * mergedOptions.spread;
        const velocity =
          mergedOptions.startVelocity * (0.5 + Math.random() * 0.5);

        const particle: ConfettiParticle = {
          x: canvas.width * mergedOptions.origin.x!,
          y: canvas.height * mergedOptions.origin.y!,
          vx: Math.cos((angle * Math.PI) / 180) * velocity,
          vy: Math.sin((angle * Math.PI) / 180) * velocity,
          decay: mergedOptions.decay,
          gravity: mergedOptions.gravity,
          drift: mergedOptions.drift,
          ticks: 0,
          ticksMax: mergedOptions.ticks,
          color:
            mergedOptions.colors[
              Math.floor(Math.random() * mergedOptions.colors.length)
            ],
          shape:
            mergedOptions.shapes[
              Math.floor(Math.random() * mergedOptions.shapes.length)
            ],
          scalar: mergedOptions.scalar,
        };

        particles.current.push(particle);
      }

      // Start animation if not already running
      if (!animationId.current) {
        animate();
      }
    },
    [globalOptions],
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current = particles.current.filter((particle) => {
      // Update particle position
      particle.x += particle.vx;
      particle.y += particle.vy + particle.gravity;
      particle.vx += particle.drift;
      particle.vy *= particle.decay;
      particle.ticks++;

      // Draw particle
      const alpha = 1 - particle.ticks / particle.ticksMax;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;

      const size = 4 * particle.scalar;

      if (particle.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size / 2, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        ctx.fillRect(
          particle.x - size / 2,
          particle.y - size / 2,
          size,
          size,
        );
      }

      // Remove particle if expired or out of bounds
      return (
        particle.ticks < particle.ticksMax &&
        particle.y < canvas.height + 100
      );
    });

    ctx.globalAlpha = 1;

    if (particles.current.length > 0) {
      animationId.current = requestAnimationFrame(animate);
    } else {
      animationId.current = undefined;
    }
  }, []);

  useEffect(() => {
    if (!manualstart) {
      fire(options);
    }

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [fire, manualstart, options]);

  return (
    <div className={cn('relative', className)}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{
          zIndex: globalOptions.zIndex || defaultOptions.zIndex,
        }}
      />
      {children && (
        <button
          type="button"
          onClick={() => fire(options)}
          className="appearance-none border-none bg-transparent p-0 m-0 cursor-pointer"
        >
          {children}
        </button>
      )}
    </div>
  );
};
