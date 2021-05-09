import Friends from '../views/Friends';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
    BrowserRouter as Router
} from "react-router-dom";

it('testing that the friends page is rendered', () => {
    render(<Router><Friends /></Router>);
    expect(screen.queryByText('Friends')).not.toBeNull();
});