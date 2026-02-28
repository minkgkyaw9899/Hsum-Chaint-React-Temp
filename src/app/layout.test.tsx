import { render, screen } from '../lib/test-utils';
import RootLayout from './layout';

describe('RootLayout', () => {
  it('should render children', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should have expected font and antialiased classes on body', () => {
    render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>,
    );
    const body = screen.getByTestId('body-root');
    expect(body).toHaveClass('--font-geist-sans');
    expect(body).toHaveClass('--font-geist-mono');
    expect(body).toHaveClass('antialiased');
  });

  it('should have html lang attribute set to "en"', () => {
    render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>,
    );
    const html = screen.getByTestId('html-root');
    expect(html).toHaveAttribute('lang', 'en');
  });
});
