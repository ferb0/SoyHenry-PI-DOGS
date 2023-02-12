import { createTheme } from '@mui/material/styles';

const grey = '#464646';

const theme = createTheme({
    palette: {
        primary: {
            50: grey,
            100: grey,
            200: grey,
            300: grey,
            400: grey,
            500: grey,
            600: grey,
            700: grey,
            800: grey,
            900: grey,
            A100: grey,
            A200: grey,
            A400: grey,
            A700: grey,
        }
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                standardSuccess: {
                    backgroundColor: 'grey',
                    color: 'white'
                },
                standardError: {
                    backgroundColor: 'grey',
                    color: 'white'
                },
                standardWarning: {
                    backgroundColor: 'grey',
                    color: 'white'
                },
                standardInfo: {
                    backgroundColor: 'grey',
                    color: 'white'
                }
            }
        },

    },
});

export default theme;