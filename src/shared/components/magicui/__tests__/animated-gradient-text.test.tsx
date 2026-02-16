import { render, screen } from '@testing-library/react';

import { AnimatedGradientText } from '../animated-gradient-text';

describe('AnimatedGradientText', () => {
  it('renders children with default animation speed', () => {
    const { container } = render(
      <AnimatedGradientText>Highlighted</AnimatedGradientText>,
    );

    expect(screen.getByText('Highlighted')).toBeInTheDocument();

    const animatedElements = container.querySelectorAll(
      '.animate-gradient',
    );

    animatedElements.forEach((element) => {
      expect(element).toHaveStyle({ animationDuration: '6s' });
    });
  });

  it('renders the icon when showIcon is true', () => {
    const { container } = render(
      <AnimatedGradientText showIcon>Label</AnimatedGradientText>,
    );

    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom classes and animation speed', () => {
    const { container } = render(
      <AnimatedGradientText
        className="custom-class"
        animationSpeed="fast"
      >
        Fast
      </AnimatedGradientText>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');

    const animatedElements = container.querySelectorAll(
      '.animate-gradient',
    );

    animatedElements.forEach((element) => {
      expect(element).toHaveStyle({ animationDuration: '4s' });
    });
  });
});
