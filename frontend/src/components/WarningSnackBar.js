import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

function WarningSnackBar({ openSBar, setOpenSBar }) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSBar(false);
    };

    return (
        <Snackbar open={openSBar} autoHideDuration={9000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                Warning: You can NOT save or clear an empty canvas! 😥
         </Alert>
        </Snackbar>
    );
}

export default WarningSnackBar;