import { useDispatch } from "react-redux";
import { Alert, Snackbar } from '@mui/material';

import {
    cleanStatusCreateBreed,
    cleanStatuModifyBreed,
    cleanStatuDeleteBreed
} from '../../redux/actions.js';

export default function Notifications({ condition, positiveMessage, negativeMessage }) {
    const dispatch = useDispatch();

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway')
            return;
        // Limpia todas las modificaciones.
        dispatch(cleanStatusCreateBreed());
        dispatch(cleanStatuModifyBreed());
        dispatch(cleanStatuDeleteBreed());
    };

    return (
        <>
            <Snackbar
                open={condition}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
                    {positiveMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={condition === false}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity='error' sx={{ width: '100%' }}>
                    {negativeMessage}
                </Alert>
            </Snackbar>
        </>
    )
};