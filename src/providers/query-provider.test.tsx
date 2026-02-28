import React from 'react';
import { render, screen } from '@testing-library/react';
import { useQueryClient } from '@tanstack/react-query';
import QueryProvider from './query-provider';
import { describe, it, expect } from 'vitest';

// A consumer component that checks if QueryClient is available
const Consumer = () => {
  const queryClient = useQueryClient();
  return <div>{queryClient ? 'QueryClient Found' : 'No QueryClient'}</div>;
};

describe('QueryProvider', () => {
  it('should provide a QueryClient to its children', () => {
    render(
      <QueryProvider>
        <Consumer />
      </QueryProvider>,
    );

    expect(screen.getByText('QueryClient Found')).toBeInTheDocument();
  });

  it('should render children correctly', () => {
    render(
      <QueryProvider>
        <div data-testid="test-child">Child Element</div>
      </QueryProvider>,
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });
});
