import { Typography, Container, CircularProgress } from '@mui/material';

export default function LoadingAnimation({ ArrayMessage, style, firstLoading }) {

    return (
        <Container align='center' sx={style}>
            <CircularProgress
                color="inherit"
                size='3rem' />

            <Container sx={{ paddingTop: '2rem' }}>
                {ArrayMessage?.map(el =>
                    <Typography key={el}>
                        {el}
                    </Typography>)}
            </Container>

            {firstLoading ?
                <Typography component='p' variant='caption'>
                    The first upload may be very slow due to technical characteristics of the server. Please wait.
                </Typography> : null}
        </Container>
    )
};
