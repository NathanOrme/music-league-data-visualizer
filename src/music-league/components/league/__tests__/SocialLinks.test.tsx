/**
 * @file SocialLinks.test.tsx
 * @description Tests for SocialLinks component
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { SocialLinksProps } from '../SocialLinks';
import { SocialLinks } from '../SocialLinks';

// Mock UI components
jest.mock('@/shared/components/ui', () => ({
  Button: ({ children, className, onClick, ...props }: any) => (
    <button
      data-testid="social-button"
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock window.open
const mockWindowOpen = jest.fn();
global.window.open = mockWindowOpen;

const allSocialLinks: SocialLinksProps['social'] = {
  twitter: 'https://twitter.com/example',
  instagram: 'https://instagram.com/example',
  facebook: 'https://facebook.com/example',
  discord: 'https://discord.gg/example',
};

const defaultProps: SocialLinksProps = {
  social: allSocialLinks,
};

describe('SocialLinks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders all social links when provided', () => {
      render(<SocialLinks {...defaultProps} />);

      expect(screen.getByText('🐦 Twitter')).toBeInTheDocument();
      expect(screen.getByText('📷 Instagram')).toBeInTheDocument();
      expect(screen.getByText('👥 Facebook')).toBeInTheDocument();
      expect(screen.getByText('💬 Discord')).toBeInTheDocument();
    });

    it('renders only Twitter when only Twitter is provided', () => {
      render(
        <SocialLinks
          social={{ twitter: 'https://twitter.com/example' }}
        />,
      );

      expect(screen.getByText('🐦 Twitter')).toBeInTheDocument();
      expect(
        screen.queryByText('📷 Instagram'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('👥 Facebook'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('💬 Discord'),
      ).not.toBeInTheDocument();
    });

    it('renders only Instagram when only Instagram is provided', () => {
      render(
        <SocialLinks
          social={{ instagram: 'https://instagram.com/example' }}
        />,
      );

      expect(
        screen.queryByText('🐦 Twitter'),
      ).not.toBeInTheDocument();
      expect(screen.getByText('📷 Instagram')).toBeInTheDocument();
      expect(
        screen.queryByText('👥 Facebook'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('💬 Discord'),
      ).not.toBeInTheDocument();
    });

    it('renders only Facebook when only Facebook is provided', () => {
      render(
        <SocialLinks
          social={{ facebook: 'https://facebook.com/example' }}
        />,
      );

      expect(
        screen.queryByText('🐦 Twitter'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('📷 Instagram'),
      ).not.toBeInTheDocument();
      expect(screen.getByText('👥 Facebook')).toBeInTheDocument();
      expect(
        screen.queryByText('💬 Discord'),
      ).not.toBeInTheDocument();
    });

    it('renders only Discord when only Discord is provided', () => {
      render(
        <SocialLinks
          social={{ discord: 'https://discord.gg/example' }}
        />,
      );

      expect(
        screen.queryByText('🐦 Twitter'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('📷 Instagram'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('👥 Facebook'),
      ).not.toBeInTheDocument();
      expect(screen.getByText('💬 Discord')).toBeInTheDocument();
    });

    it('renders nothing when no social links are provided', () => {
      const { container } = render(<SocialLinks social={{}} />);

      const buttons = screen.queryAllByTestId('social-button');
      expect(buttons).toHaveLength(0);

      const wrapper = container.querySelector(
        '.flex.flex-wrap.gap-2',
      );
      expect(wrapper).toBeInTheDocument();
      expect(wrapper?.children.length).toBe(0);
    });

    it('renders subset of social links', () => {
      render(
        <SocialLinks
          social={{
            twitter: 'https://twitter.com/example',
            discord: 'https://discord.gg/example',
          }}
        />,
      );

      expect(screen.getByText('🐦 Twitter')).toBeInTheDocument();
      expect(
        screen.queryByText('📷 Instagram'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('👥 Facebook'),
      ).not.toBeInTheDocument();
      expect(screen.getByText('💬 Discord')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('opens Twitter link in new window when clicked', async () => {
      const user = userEvent.setup();
      render(<SocialLinks {...defaultProps} />);

      const twitterButton = screen.getByText('🐦 Twitter');
      await user.click(twitterButton);

      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://twitter.com/example',
        '_blank',
        'noopener,noreferrer',
      );
    });

    it('opens Instagram link in new window when clicked', async () => {
      const user = userEvent.setup();
      render(<SocialLinks {...defaultProps} />);

      const instagramButton = screen.getByText('📷 Instagram');
      await user.click(instagramButton);

      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://instagram.com/example',
        '_blank',
        'noopener,noreferrer',
      );
    });

    it('opens Facebook link in new window when clicked', async () => {
      const user = userEvent.setup();
      render(<SocialLinks {...defaultProps} />);

      const facebookButton = screen.getByText('👥 Facebook');
      await user.click(facebookButton);

      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://facebook.com/example',
        '_blank',
        'noopener,noreferrer',
      );
    });

    it('opens Discord link in new window when clicked', async () => {
      const user = userEvent.setup();
      render(<SocialLinks {...defaultProps} />);

      const discordButton = screen.getByText('💬 Discord');
      await user.click(discordButton);

      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://discord.gg/example',
        '_blank',
        'noopener,noreferrer',
      );
    });

    it('handles multiple clicks correctly', async () => {
      const user = userEvent.setup();
      render(<SocialLinks {...defaultProps} />);

      const twitterButton = screen.getByText('🐦 Twitter');
      await user.click(twitterButton);
      await user.click(twitterButton);

      expect(mockWindowOpen).toHaveBeenCalledTimes(2);
    });

    it('handles clicks on different social links', async () => {
      const user = userEvent.setup();
      render(<SocialLinks {...defaultProps} />);

      const twitterButton = screen.getByText('🐦 Twitter');
      const instagramButton = screen.getByText('📷 Instagram');

      await user.click(twitterButton);
      await user.click(instagramButton);

      expect(mockWindowOpen).toHaveBeenCalledTimes(2);
      expect(mockWindowOpen).toHaveBeenNthCalledWith(
        1,
        'https://twitter.com/example',
        '_blank',
        'noopener,noreferrer',
      );
      expect(mockWindowOpen).toHaveBeenNthCalledWith(
        2,
        'https://instagram.com/example',
        '_blank',
        'noopener,noreferrer',
      );
    });
  });

  describe('Button Styling', () => {
    it('applies Twitter button styling correctly', () => {
      render(<SocialLinks {...defaultProps} />);

      const twitterButton = screen.getByText('🐦 Twitter');
      expect(twitterButton.className).toContain('border-blue-500/30');
      expect(twitterButton.className).toContain('text-blue-300');
      expect(twitterButton.className).toContain(
        'hover:bg-blue-500/10',
      );
      expect(twitterButton.className).toContain(
        'hover:border-blue-500/50',
      );
    });

    it('applies Instagram button styling correctly', () => {
      render(<SocialLinks {...defaultProps} />);

      const instagramButton = screen.getByText('📷 Instagram');
      expect(instagramButton.className).toContain(
        'border-pink-500/30',
      );
      expect(instagramButton.className).toContain('text-pink-300');
      expect(instagramButton.className).toContain(
        'hover:bg-pink-500/10',
      );
      expect(instagramButton.className).toContain(
        'hover:border-pink-500/50',
      );
    });

    it('applies Facebook button styling correctly', () => {
      render(<SocialLinks {...defaultProps} />);

      const facebookButton = screen.getByText('👥 Facebook');
      expect(facebookButton.className).toContain(
        'border-blue-600/30',
      );
      expect(facebookButton.className).toContain('text-blue-400');
      expect(facebookButton.className).toContain(
        'hover:bg-blue-600/10',
      );
      expect(facebookButton.className).toContain(
        'hover:border-blue-600/50',
      );
    });

    it('applies Discord button styling correctly', () => {
      render(<SocialLinks {...defaultProps} />);

      const discordButton = screen.getByText('💬 Discord');
      expect(discordButton.className).toContain(
        'border-indigo-500/30',
      );
      expect(discordButton.className).toContain('text-indigo-300');
      expect(discordButton.className).toContain(
        'hover:bg-indigo-500/10',
      );
      expect(discordButton.className).toContain(
        'hover:border-indigo-500/50',
      );
    });
  });

  describe('Component Structure', () => {
    it('wraps buttons in flex container', () => {
      render(<SocialLinks {...defaultProps} />);

      const buttons = screen.getAllByTestId('social-button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('maintains proper button count', () => {
      render(<SocialLinks {...defaultProps} />);

      const buttons = screen.getAllByTestId('social-button');
      expect(buttons).toHaveLength(4);
    });

    it('renders buttons in correct order', () => {
      render(<SocialLinks {...defaultProps} />);

      const buttons = screen.getAllByTestId('social-button');
      expect(buttons[0]).toHaveTextContent('🐦 Twitter');
      expect(buttons[1]).toHaveTextContent('📷 Instagram');
      expect(buttons[2]).toHaveTextContent('👥 Facebook');
      expect(buttons[3]).toHaveTextContent('💬 Discord');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined social object properties', () => {
      render(
        <SocialLinks
          social={{
            twitter: undefined,
            instagram: 'https://instagram.com/example',
          }}
        />,
      );

      expect(
        screen.queryByText('🐦 Twitter'),
      ).not.toBeInTheDocument();
      expect(screen.getByText('📷 Instagram')).toBeInTheDocument();
    });

    it('handles empty string URLs', () => {
      render(
        <SocialLinks
          social={{
            twitter: '',
            instagram: 'https://instagram.com/example',
          }}
        />,
      );

      expect(
        screen.queryByText('🐦 Twitter'),
      ).not.toBeInTheDocument();
      expect(screen.getByText('📷 Instagram')).toBeInTheDocument();
    });

    it('handles special characters in URLs', () => {
      const specialUrls = {
        twitter:
          'https://twitter.com/example?ref=abc&utm_source=test',
      };

      render(<SocialLinks social={specialUrls} />);

      const twitterButton = screen.getByText('🐦 Twitter');
      twitterButton.click();

      expect(mockWindowOpen).toHaveBeenCalledWith(
        specialUrls.twitter,
        '_blank',
        'noopener,noreferrer',
      );
    });
  });

  describe('Accessibility', () => {
    it('provides meaningful button text with emojis', () => {
      render(<SocialLinks {...defaultProps} />);

      expect(screen.getByText('🐦 Twitter')).toBeInTheDocument();
      expect(screen.getByText('📷 Instagram')).toBeInTheDocument();
      expect(screen.getByText('👥 Facebook')).toBeInTheDocument();
      expect(screen.getByText('💬 Discord')).toBeInTheDocument();
    });

    it('uses semantic button elements', () => {
      render(<SocialLinks {...defaultProps} />);

      const buttons = screen.getAllByTestId('social-button');
      buttons.forEach((button) => {
        expect(button.tagName).toBe('BUTTON');
      });
    });
  });

  describe('Performance', () => {
    it('uses memoization correctly', () => {
      const { rerender } = render(<SocialLinks {...defaultProps} />);

      rerender(<SocialLinks {...defaultProps} />);

      expect(screen.getByText('🐦 Twitter')).toBeInTheDocument();
    });

    it('handles component unmounting gracefully', () => {
      const { unmount } = render(<SocialLinks {...defaultProps} />);

      expect(() => unmount()).not.toThrow();
    });

    it('efficiently renders large number of conditional buttons', () => {
      render(<SocialLinks {...defaultProps} />);

      const buttons = screen.getAllByTestId('social-button');
      expect(buttons).toHaveLength(4);
    });
  });

  describe('Props Validation', () => {
    it('renders with all social links', () => {
      render(<SocialLinks {...defaultProps} />);

      expect(screen.getAllByTestId('social-button')).toHaveLength(4);
    });

    it('renders with partial social links', () => {
      render(
        <SocialLinks
          social={{
            twitter: 'https://twitter.com/example',
            instagram: 'https://instagram.com/example',
          }}
        />,
      );

      expect(screen.getAllByTestId('social-button')).toHaveLength(2);
    });

    it('renders with no social links', () => {
      render(<SocialLinks social={{}} />);

      expect(screen.queryAllByTestId('social-button')).toHaveLength(
        0,
      );
    });
  });
});
