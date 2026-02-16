import { render, screen } from '@testing-library/react';

import { Avatar, AvatarFallback, AvatarImage } from '../avatar';

describe('Avatar', () => {
  it('renders Avatar component', () => {
    render(
      <Avatar data-testid="avatar">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>,
    );

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass(
      'relative',
      'flex',
      'h-10',
      'w-10',
      'shrink-0',
      'overflow-hidden',
      'rounded-full',
    );
  });

  it('applies custom className to Avatar', () => {
    render(
      <Avatar className="custom-class" data-testid="avatar">
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>,
    );

    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('custom-class');
  });

  it('renders AvatarFallback when image fails to load', () => {
    render(
      <Avatar>
        <AvatarImage src="invalid-image.jpg" alt="Test" />
        <AvatarFallback data-testid="avatar-fallback">
          CN
        </AvatarFallback>
      </Avatar>,
    );

    const fallback = screen.getByTestId('avatar-fallback');
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveTextContent('CN');
  });

  it('applies custom className to AvatarFallback', () => {
    render(
      <Avatar>
        <AvatarFallback
          className="custom-fallback"
          data-testid="avatar-fallback"
        >
          CN
        </AvatarFallback>
      </Avatar>,
    );

    const fallback = screen.getByTestId('avatar-fallback');
    expect(fallback).toHaveClass('custom-fallback');
    expect(fallback).toHaveClass(
      'flex',
      'h-full',
      'w-full',
      'items-center',
      'justify-center',
      'rounded-full',
    );
  });

  it('forwards ref to Avatar', () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement>;

    render(
      <Avatar ref={ref} data-testid="avatar">
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>,
    );

    expect(ref.current).toBeTruthy();
  });

  it('forwards ref to AvatarFallback', () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement>;

    render(
      <Avatar>
        <AvatarFallback ref={ref} data-testid="avatar-fallback">
          CN
        </AvatarFallback>
      </Avatar>,
    );

    expect(ref.current).toBeTruthy();
  });
});
