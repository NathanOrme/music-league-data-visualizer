import { render } from '@testing-library/react';
import SpotifyPlayer from '../SpotifyPlayer';

describe('SpotifyPlayer', () => {
  const mockProps = {
    playlistUrl: 'https://open.spotify.com/playlist/test123',
  };

  it('should render without crashing', () => {
    const { container } = render(<SpotifyPlayer {...mockProps} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with empty playlistUrl', () => {
    const { container } = render(<SpotifyPlayer playlistUrl="" />);
    expect(container).toBeInTheDocument();
  });

  it('should render iframe when playlistUrl is provided', () => {
    const { container } = render(<SpotifyPlayer {...mockProps} />);
    const iframe = container.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });
});
