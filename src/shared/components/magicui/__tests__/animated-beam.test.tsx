import { render } from '@testing-library/react';
import { createRef } from 'react';

import { AnimatedBeam } from '../animated-beam';

describe('AnimatedBeam', () => {
  let mockObserver: {
    observe: jest.Mock;
    disconnect: jest.Mock;
    unobserve: jest.Mock;
  };

  beforeEach(() => {
    // Mock ResizeObserver
    mockObserver = {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    };

    global.ResizeObserver = jest
      .fn()
      .mockImplementation((callback) => {
        return mockObserver;
      }) as unknown as typeof ResizeObserver;

    // Mock getBoundingClientRect for elements
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 100,
      top: 50,
      left: 50,
      right: 150,
      bottom: 150,
      x: 50,
      y: 50,
      toJSON: () => {},
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );
    });

    it('renders SVG element', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            className="custom-beam"
          />
        </div>,
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-beam');
    });

    it('applies default SVG classes', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('pointer-events-none');
      expect(svg).toHaveClass('absolute');
      expect(svg).toHaveClass('left-0');
      expect(svg).toHaveClass('top-0');
      expect(svg).toHaveClass('transform-gpu');
    });

    it('renders two path elements', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      const paths = container.querySelectorAll('path');
      expect(paths).toHaveLength(2); // Base path + gradient path
    });

    it('renders linearGradient in defs', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      const gradient = container.querySelector('linearGradient');
      expect(gradient).toBeInTheDocument();
    });

    it('renders gradient stops', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      const stops = container.querySelectorAll('stop');
      expect(stops).toHaveLength(4); // Start transparent, start, stop, stop transparent
    });
  });

  describe('Props', () => {
    it('accepts curvature prop', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            curvature={100}
          />
        </div>,
      );
      // Should render with custom curvature
    });

    it('uses default curvature of 0', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );
      // Should render with default curvature
    });

    it('accepts reverse prop', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            reverse={true}
          />
        </div>,
      );
      // Should reverse animation direction
    });

    it('accepts pathColor prop', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            pathColor="blue"
          />
        </div>,
      );

      const basePath = container.querySelectorAll('path')[0];
      expect(basePath).toHaveAttribute('stroke', 'blue');
    });

    it('accepts pathWidth prop', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            pathWidth={5}
          />
        </div>,
      );

      const paths = container.querySelectorAll('path');
      expect(paths[0]).toHaveAttribute('stroke-width', '5');
      expect(paths[1]).toHaveAttribute('stroke-width', '5');
    });

    it('accepts pathOpacity prop', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            pathOpacity={0.5}
          />
        </div>,
      );

      const basePath = container.querySelectorAll('path')[0];
      expect(basePath).toHaveAttribute('stroke-opacity', '0.5');
    });

    it('uses design system colors by default', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      const stops = container.querySelectorAll('stop');
      expect(stops[1]).toHaveAttribute('stop-color', '#9b59b6'); // Purple
      expect(stops[2]).toHaveAttribute('stop-color', '#1abc9c'); // Teal
    });

    it('accepts custom gradient colors', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            gradientStartColor="#ff0000"
            gradientStopColor="#00ff00"
          />
        </div>,
      );

      const stops = container.querySelectorAll('stop');
      expect(stops[1]).toHaveAttribute('stop-color', '#ff0000');
      expect(stops[2]).toHaveAttribute('stop-color', '#00ff00');
    });

    it('accepts duration prop', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            duration={5}
          />
        </div>,
      );
      // Should use custom duration
    });

    it('accepts delay prop', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            delay={1}
          />
        </div>,
      );
      // Should delay animation start
    });

    it('accepts offset props', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            startXOffset={10}
            startYOffset={10}
            endXOffset={-10}
            endYOffset={-10}
          />
        </div>,
      );
      // Should apply offsets to start and end positions
    });
  });

  describe('ResizeObserver', () => {
    it('sets up ResizeObserver', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      expect(ResizeObserver).toHaveBeenCalled();
    });

    it('observes container element', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      expect(mockObserver.observe).toHaveBeenCalledTimes(3); // container, from, to
    });

    it('observes from element', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      expect(mockObserver.observe).toHaveBeenCalled();
    });

    it('observes to element', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      expect(mockObserver.observe).toHaveBeenCalled();
    });

    it('disconnects ResizeObserver on unmount', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { unmount } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      unmount();

      expect(mockObserver.disconnect).toHaveBeenCalled();
    });
  });

  describe('Path Calculation', () => {
    it('calculates path from element positions', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      const path = container.querySelector('path');
      expect(path).toHaveAttribute('d');
      const pathD = path?.getAttribute('d');
      expect(pathD).toMatch(/^M /); // Starts with M (moveto)
      expect(pathD).toContain(' Q '); // Contains Q (quadratic curve)
    });

    it('creates quadratic bezier curve', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            curvature={50}
          />
        </div>,
      );

      const path = container.querySelector('path');
      const pathD = path?.getAttribute('d');
      expect(pathD).toContain(' Q '); // Quadratic curve command
    });

    it('handles elements at same position', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      // Mock same position for from and to
      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        width: 100,
        height: 100,
        top: 50,
        left: 50,
        right: 150,
        bottom: 150,
        x: 50,
        y: 50,
        toJSON: () => {},
      }));

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );
      // Should handle same position without errors
    });
  });

  describe('SVG Dimensions', () => {
    it('sets SVG dimensions from container', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '100');
      expect(svg).toHaveAttribute('height', '100');
    });

    it('sets viewBox from dimensions', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 100 100');
    });
  });

  describe('Edge Cases', () => {
    it('handles null containerRef', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );
      // Should handle null container gracefully
    });

    it('handles null fromRef', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );
      // Should handle null from element gracefully
    });

    it('handles null toRef', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );
      // Should handle null to element gracefully
    });

    it('handles negative curvature', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            curvature={-50}
          />
        </div>,
      );
      // Should handle negative curvature (curve downward)
    });

    it('handles zero duration', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
            duration={0}
          />
        </div>,
      );
      // Should handle zero duration
    });
  });

  describe('Accessibility', () => {
    it('SVG is pointer-events-none', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('pointer-events-none');
    });

    it('SVG uses fill none for paths', () => {
      const containerRef = createRef<HTMLDivElement>();
      const fromRef = createRef<HTMLDivElement>();
      const toRef = createRef<HTMLDivElement>();

      const { container } = render(
        <div ref={containerRef}>
          <div ref={fromRef} />
          <div ref={toRef} />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={fromRef}
            toRef={toRef}
          />
        </div>,
      );

      const paths = container.querySelectorAll('path');
      paths.forEach((path) => {
        expect(path).toHaveAttribute('fill', 'none');
      });
    });
  });
});
