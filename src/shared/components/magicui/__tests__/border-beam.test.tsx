import { render } from '@testing-library/react';

import { BorderBeam } from '../border-beam';

describe('BorderBeam', () => {
  it('renders without crashing', () => {
    render(<BorderBeam />);
  });

  it('applies custom className', () => {
    const { container } = render(
      <BorderBeam className="custom-class" />,
    );
    const beamElement = container.querySelector('.custom-class');
    expect(beamElement).toBeInTheDocument();
  });

  it('uses custom colors from design system', () => {
    const { container } = render(
      <BorderBeam colorFrom="#9b59b6" colorTo="#1abc9c" />,
    );

    const motionDiv = container.querySelector(
      '[style*="--color-from"]',
    );
    expect(motionDiv).toBeInTheDocument();
  });

  it('applies custom size', () => {
    const { container } = render(<BorderBeam size={100} />);
    const motionDiv = container.querySelector(
      '[style*="width: 100"]',
    );
    expect(motionDiv).toBeInTheDocument();
  });

  it('applies custom duration', () => {
    render(<BorderBeam duration={10} />);
    // Component should render without errors with custom duration
  });
});
