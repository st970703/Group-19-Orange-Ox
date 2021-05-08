import About from '../views/About';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


it('testing that the about page is rendered', () => {
    render(<About />);

    expect(screen.queryByText('About')).not.toBeNull();
    expect(screen.queryByText('Authors')).not.toBeNull();
    expect(screen.queryByText('License')).not.toBeNull();
    expect(screen.queryByText('GitHub Repository')).not.toBeNull();
});