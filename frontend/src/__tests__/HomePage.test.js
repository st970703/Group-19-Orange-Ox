import Home from '../views/Home';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


it('testing that the home page is rendered', () => {

    render(<Home />);
    expect(screen.queryByText('Virtual Playground')).not.toBeNull();
    expect(screen.queryByText('Welcome kiddies!! 😀')).not.toBeNull();
    expect(screen.queryByAltText('painting_image')).not.toBeNull();
    expect(screen.queryByText('*Image from')).not.toBeNull();
})