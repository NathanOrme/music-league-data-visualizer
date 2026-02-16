import { render } from '@testing-library/react';
import { PlaylistCategoryContent } from '../PlaylistCategoryContent';
import type { PlaylistCategory } from '../types';

describe('PlaylistCategoryContent', () => {
  it('should render without crashing with 1001 category', () => {
    const { container } = render(
      <PlaylistCategoryContent
        category={'1001' as PlaylistCategory}
      />,
    );
    expect(container).toBeInTheDocument();
  });

  it('should render without crashing with words category', () => {
    const { container } = render(
      <PlaylistCategoryContent
        category={'words' as PlaylistCategory}
      />,
    );
    expect(container).toBeInTheDocument();
  });

  it('should render without crashing with coffee category', () => {
    const { container } = render(
      <PlaylistCategoryContent
        category={'coffee' as PlaylistCategory}
      />,
    );
    expect(container).toBeInTheDocument();
  });

  it('should render without crashing with hos category', () => {
    const { container } = render(
      <PlaylistCategoryContent
        category={'hos' as PlaylistCategory}
      />,
    );
    expect(container).toBeInTheDocument();
  });
});
