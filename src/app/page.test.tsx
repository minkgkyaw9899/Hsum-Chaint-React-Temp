import { render, screen } from '../lib/test-utils';
import Home from './page';

describe('Home Page', () => {
  it('should render Next.js logo with correct src', () => {
    render(<Home />);
    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
    // ensure the image source points to the expected file
    expect(logo).toHaveAttribute('src', expect.stringContaining('/next.svg'));
  });

  it('should render heading text', () => {
    render(<Home />);
    expect(
      screen.getByText('To get started, edit the page.tsx file.'),
    ).toBeInTheDocument();
  });

  it('should render description text', () => {
    render(<Home />);
    expect(
      screen.getByText(/Looking for a starting point/i),
    ).toBeInTheDocument();
  });

  it('should have correct href for Templates link', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /templates/i });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('vercel.com/templates'),
    );
  });

  it('should have correct href for Learning link', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /learning/i });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('nextjs.org/learn'),
    );
  });

  it('should have correct href for Deploy Now link', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /deploy now/i });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('vercel.com/new'),
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should have correct href for Documentation link', () => {
    render(<Home />);
    const link = screen.getByRole('link', { name: /documentation/i });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('nextjs.org/docs'),
    );
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should have noopener noreferrer on all external links', () => {
    render(<Home />);
    const externalLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('target') === '_blank');

    expect(externalLinks).toHaveLength(2); // deploy and documentation links open in new tab

    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
