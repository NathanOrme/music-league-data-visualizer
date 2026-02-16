import { fireEvent, render, screen } from '@testing-library/react';

import LeaguesView from '../LeaguesView';

import type { LeagueCategory } from '../types';

// Mock the music league styles
jest.mock('@/music-league/styles/music-league.styles', () => ({
  musicLeagueStyles: {
    text: {
      hero: 'text-hero',
      body: 'text-body',
      subheading: 'text-subheading',
      muted: 'text-muted',
    },
    layout: {
      grid: 'grid-layout',
    },
    cards: {
      base: 'card-base',
      hover: 'card-hover',
      content: 'card-content',
      header: 'card-header',
      category: 'card-category',
      title: 'card-title',
      body: 'card-body',
      footer: 'card-footer',
    },
    buttons: {
      ghost: 'button-ghost',
    },
    categories: {
      category1: {
        gradient: 'gradient-1',
        border: 'border-1',
        icon: 'icon-1',
        accent: 'accent-1',
      },
    },
  },
}));

describe('LeaguesView Component', () => {
  const mockOnNavigateToCategory = jest.fn();

  const mockLeagueCategories: LeagueCategory[] = [
    {
      id: 'category1',
      name: 'Rock & Alternative',
      description: 'Explore the best in rock and alternative music',
      icon: '🎸',
      leagueCount: 5,
      totalParticipants: 150,
      leagues: [
        {
          id: 'league1',
          name: 'Classic Rock Legends',
          description: 'A league for classic rock enthusiasts',
          participants: 50,
          isActive: true,
          createdAt: '2024-01-01',
        },
        {
          id: 'league2',
          name: 'Indie Alternative',
          description: 'Discover indie and alternative tracks',
          participants: 100,
          isActive: true,
          createdAt: '2024-02-01',
        },
      ],
    },
    {
      id: 'category2',
      name: 'Electronic & Dance',
      description: 'Electronic beats and dance music',
      icon: '🎧',
      leagueCount: 3,
      totalParticipants: 80,
      leagues: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the header correctly', () => {
    render(
      <LeaguesView
        leagueCategories={mockLeagueCategories}
        onNavigateToCategory={mockOnNavigateToCategory}
      />,
    );

    expect(screen.getByText('League Categories')).toBeInTheDocument();
    expect(
      screen.getByText(/Choose from our diverse collection/),
    ).toBeInTheDocument();
  });

  it('should render league categories', () => {
    render(
      <LeaguesView
        leagueCategories={mockLeagueCategories}
        onNavigateToCategory={mockOnNavigateToCategory}
      />,
    );

    expect(
      screen.getByText('Rock & Alternative'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Electronic & Dance'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Explore the best in rock and alternative music',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Electronic beats and dance music'),
    ).toBeInTheDocument();
  });

  it('should display category statistics correctly', () => {
    render(
      <LeaguesView
        leagueCategories={mockLeagueCategories}
        onNavigateToCategory={mockOnNavigateToCategory}
      />,
    );

    expect(screen.getByText('5 leagues')).toBeInTheDocument();
    expect(screen.getByText('150 participants')).toBeInTheDocument();
    expect(screen.getByText('3 leagues')).toBeInTheDocument();
    expect(screen.getByText('80 participants')).toBeInTheDocument();
  });

  it('should display league information when leagues exist', () => {
    render(
      <LeaguesView
        leagueCategories={mockLeagueCategories}
        onNavigateToCategory={mockOnNavigateToCategory}
      />,
    );

    expect(
      screen.getByText('Classic Rock Legends +1 more'),
    ).toBeInTheDocument();
  });

  it('should display "No leagues yet" when category has no leagues', () => {
    render(
      <LeaguesView
        leagueCategories={mockLeagueCategories}
        onNavigateToCategory={mockOnNavigateToCategory}
      />,
    );

    expect(screen.getByText('No leagues yet')).toBeInTheDocument();
  });

  it('should call onNavigateToCategory when category is clicked', () => {
    render(
      <LeaguesView
        leagueCategories={mockLeagueCategories}
        onNavigateToCategory={mockOnNavigateToCategory}
      />,
    );

    const categoryCard = screen
      .getByText('Rock & Alternative')
      .closest('div');
    fireEvent.click(categoryCard!);

    expect(mockOnNavigateToCategory).toHaveBeenCalledWith(
      'category1',
      'Rock & Alternative',
    );
  });

  it('should render empty state when no categories are provided', () => {
    render(
      <LeaguesView
        leagueCategories={[]}
        onNavigateToCategory={mockOnNavigateToCategory}
      />,
    );

    expect(
      screen.getByText('No categories available'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Categories will appear here once league data is loaded.',
      ),
    ).toBeInTheDocument();
  });

  it('should render category icons', () => {
    render(
      <LeaguesView
        leagueCategories={mockLeagueCategories}
        onNavigateToCategory={mockOnNavigateToCategory}
      />,
    );

    expect(screen.getByText('🎸')).toBeInTheDocument();
    expect(screen.getByText('🎧')).toBeInTheDocument();
  });

  it('should render explore buttons for each category', () => {
    render(
      <LeaguesView
        leagueCategories={mockLeagueCategories}
        onNavigateToCategory={mockOnNavigateToCategory}
      />,
    );

    const exploreButtons = screen.getAllByText('Explore');
    expect(exploreButtons).toHaveLength(2);
  });

  it('should have proper component structure and styling classes', () => {
    render(
      <LeaguesView
        leagueCategories={mockLeagueCategories}
        onNavigateToCategory={mockOnNavigateToCategory}
      />,
    );

    const header = screen.getByText('League Categories');
    expect(header).toHaveClass('text-hero');

    const description = screen.getByText(
      /Choose from our diverse collection/,
    );
    expect(description).toHaveClass('text-body');
  });

  it('should have correct displayName', () => {
    expect(LeaguesView.displayName).toBe('LeaguesView');
  });

  it('should handle single league in category', () => {
    const singleLeagueCategory: LeagueCategory[] = [
      {
        id: 'single',
        name: 'Single League Category',
        description: 'A category with only one league',
        icon: '🎵',
        leagueCount: 1,
        totalParticipants: 25,
        leagues: [
          {
            id: 'league-single',
            name: 'Solo League',
            description: 'The only league in this category',
            participants: 25,
            isActive: true,
            createdAt: '2024-03-01',
          },
        ],
      },
    ];

    render(
      <LeaguesView
        leagueCategories={singleLeagueCategory}
        onNavigateToCategory={mockOnNavigateToCategory}
      />,
    );

    expect(
      screen.getByText('Solo League +0 more'),
    ).toBeInTheDocument();
  });
});
