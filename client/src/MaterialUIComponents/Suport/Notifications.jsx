import { Alert, Snackbar } from '@mui/material';

import { useState } from "react";

// Tiempo en milisegundos
const timeNotification = 4000;

export default function Notifications({ condition, positiveMessage, negativeMessage }) {
    const [open, setOpen] = useState(true);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway')
            return;

        setOpen(false);
    };
    console.log(condition, open)
    return (
        <>
            <Snackbar
                open={condition && open}
                autoHideDuration={timeNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
                    {positiveMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={condition === false && open}
                autoHideDuration={timeNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity='error' sx={{ width: '100%' }}>
                    {negativeMessage}
                </Alert>
            </Snackbar>
        </>
    )
};