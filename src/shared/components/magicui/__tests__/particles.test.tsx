import { render } from '@testing-library/react';

import { Particles } from '../particles';

describe('Particles', () => {
  beforeAll(() => {
    // Mock canvas context
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      scale: jest.fn(),
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      translate: jest.fn(),
      setTransform: jest.fn(),
      fillStyle: '',
    }));
  });

  it('renders without crashing', () => {
    render(<Particles />);
  });

  it('renders canvas element', () => {
    const { container } = render(<Particles />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Particles className="custom-particles" />,
    );
    expect(container.firstChild).toHaveClass('custom-particles');
  });

  it('uses custom color', () => {
    render(<Particles color="#ff0000" />);
    // Component should render without errors with custom color
  });

  it('uses custom quantity', () => {
    render(<Particles quantity={50} />);
    // Component should render without errors with custom quantity
  });

  it('responds to refresh prop', () => {
    const { rerender } = render(<Particles refresh={false} />);
    rerender(<Particles refresh={true} />);
    // Component should handle refresh changes
  });
});
