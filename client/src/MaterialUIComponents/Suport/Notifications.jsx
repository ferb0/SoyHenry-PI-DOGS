import { useDispatch } from "react-redux";
import { Alert, Snackbar } from '@mui/material';

import { cleanStatusCreateBreed, cleanStatuModifyBreed } from '../../redux/actions.js';

export default function Notifications({ condition }) {
    const dispatch = useDispatch();

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway')
            return;
        dispatch(cleanStatusCreateBreed());
        dispatch(cleanStatuModifyBreed());
    };

    return (
        <>
            <Snackbar
                open={condition}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
                    Breed successfully created.
                </Alert>
            </Snackbar>
            <Snackbar
                open={condition === false}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity='error' sx={{ width: '100%' }}>
                    Something went wrong.
                </Alert>
            </Snackbar>
        </>
    )
};