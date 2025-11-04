import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ResultCard from '../../components/ResultCard';

describe('ResultCard', () => {
  it('rend le nom en heading et affiche les méta-données de base (AAA)', () => {
    // Arrange
    const props = { name: 'Sir Exura', level: 123, vocation: 'Knight', server: 'Antica' };
    // Act
    render(<ResultCard {...props} />);
    // Assert
    expect(screen.getByRole('heading', { name: /sir exura/i })).toBeInTheDocument();
    expect(screen.getByText(/level/i)).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('Knight')).toBeInTheDocument();
    expect(screen.getByText('Antica')).toBeInTheDocument();
  });

  it('rend un lien "View" quand href est fourni', () => {
    // Arrange
    const props = {
      name: 'Sir Exura',
      level: 123,
      href: '/characters/Sir%20Exura',
    };
    // Act
    render(<ResultCard {...props} />);
    // Assert
    const link = screen.getByRole('link', { name: /view sir exura/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/characters/Sir%20Exura');
  });

  it('n’affiche pas vocation/server/lien quand absents (rendu conditionnel)', () => {
    // Arrange
    const props = { name: 'Ana Maria', level: 80 };
    // Act
    render(<ResultCard {...props} />);
    // Assert
    expect(screen.queryByText('Vocation')).not.toBeInTheDocument();
    expect(screen.queryByText('Server')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /view/i })).not.toBeInTheDocument();
  });

  it('applique la classe "is-highlighted" quand highlight=true', () => {
    // Arrange
    const props = { name: 'Highlighted', level: 200, highlight: true };
    // Act
    const { getByTestId } = render(<ResultCard {...props} />);
    // Assert
    expect(getByTestId('result-card')).toHaveClass('is-highlighted');
  });
});
