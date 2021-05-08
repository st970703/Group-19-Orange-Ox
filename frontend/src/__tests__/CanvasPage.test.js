import WarningSnackBar from '../components/WarningSnackBar';
import SmallScreenMsg from '../components/SmallScreenMsg';
import Toolbar from '../components/Toolbar';
import Colourbar from '../components/Colourbar';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
    BrowserRouter as Router
} from "react-router-dom";
import { colors, brushes } from '../config/CanvasConfig';
import { capitalise } from '../config/helperFunctions';



describe('testing that the home page is rendered', () => {
    it('testing that the WarningSnackBar is rendered when necessary', () => {
        const setOpenSBar = jest.fn();
        const openSBar = true;
        render(<WarningSnackBar openSBar={openSBar} setOpenSBar={setOpenSBar} />);
        expect(screen.queryByText(/Warning: You can NOT save or clear an empty canvas! 😥/)).not.toBeNull();
    });

    it('testing that the SmallCreenMsg is rendered when necessary', () => {
        render(<Router><SmallScreenMsg /></Router>);

        expect(screen.queryByText(/Uh Oh!/)).not.toBeNull();
        expect(screen.queryByText(/Virtual Playground is not available for a screen this small 😥/)).not.toBeNull();
        expect(screen.queryByText(/Please use a device with a larger screen!/)).not.toBeNull();
        expect(screen.queryByText(/Return to Home/)).not.toBeNull();
    });

    it('testing that the Colourbar is rendered', () => {
        render(<Colourbar />);

        const colours = colors.map(color => capitalise(color.name));

        for (const colour of colours) {
            expect(screen.queryByTitle(colour)).not.toBeNull();
        }

    });

    it('testing that the Toolbar is rendered', () => {
        const handleClear = jest.fn();
        const handleSave = jest.fn();

        const tools = brushes.map(brush => capitalise(brush.brushType));
        tools.push('Save');
        tools.push('Clear');

        render(<Toolbar handleClear={handleClear}
            handleSave={handleSave} />)

        for (const tool of tools) {
            expect(screen.queryByTitle(tool)).not.toBeNull();
        }
    });
});

