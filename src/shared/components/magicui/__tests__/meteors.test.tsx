import { render } from '@testing-library/react';

import { Meteors } from '../meteors';

describe('Meteors', () => {
  it('renders without crashing', () => {
    render(<Meteors />);
  });

  it('renders specified number of meteors', () => {
    const { container } = render(<Meteors number={5} />);
    // Should render 5 meteor spans
    const meteors = container.querySelectorAll('span');
    expect(meteors.length).toBe(5);
  });

  it('applies custom className to meteors', () => {
    const { container } = render(
      <Meteors className="custom-meteors" number={1} />,
    );
    const meteor = container.querySelector('span');
    expect(meteor).toHaveClass('custom-meteors');
  });

  it('uses custom angle for meteor direction', () => {
    const { container } = render(<Meteors angle={180} number={1} />);
    const meteor = container.querySelector('span');
    expect(meteor).toHaveStyle('--angle: -180deg');
  });

  it('renders meteor tails', () => {
    const { container } = render(<Meteors number={1} />);
    const tail = container.querySelector('div');
    expect(tail).toHaveClass('bg-gradient-to-r');
  });
});
