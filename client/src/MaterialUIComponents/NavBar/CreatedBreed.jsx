import React from 'react';
import { Alert, Box, TextField, Typography, CardMedia, Button, Stack, Snackbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import checker from '../../controllers/Created/checker.js';
import formatData from '../../controllers/Created/formatData.js';
import sendData from '../../controllers/Created/sendData.js';

import imagePaws from '../../global/images/paws.png';
const sizeTextField = '7rem';

export default function CreatedBreed() {
    const [input, setInput] = React.useState({
        name: '',
        maxHeight: '',
        minHeight: '',
        maxWeight: '',
        minWeight: '',
        minLifeSpan: '',
        maxLifeSpan: '',
        img: '',
        temper: []
    });
    // input con formato de envio.
    const [data, setData] = React.useState(undefined);
    // Error cuando se envia los datos al server.
    const [send, setSend] = React.useState(undefined);
    //Error para formulario controlado
    const [error, setError] = React.useState({
        name: false,
        maxHeight: false,
        minHeight: false,
        maxWeight: false,
        minWeight: false,
        minLifeSpan: false,
        maxLifeSpan: false,
        img: false,
        temper: false
    });

    function handleOnChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
        setError({
            ...error,
            [event.target.name]: checker(event.target.name, event.target.value)
        });
    };

    React.useEffect(() => {
        setData(formatData(input));
    }, [input]);

    async function handleSubmit(e) {
        e.preventDefault();

        let response = await sendData(data);
        if (response.hasOwnProperty('msg'))
            setSend(true);
        else
            setSend(false);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setSend(undefined);
    };

    return (
        <>
            <Typography component='h5' variant='h5' align='center' padding='1rem'>
                Create a New Breed
            </Typography>

            <Stack
                direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row', xl: 'row' }}>
                <CardMedia
                    component='img'
                    src={input.img && !error.img ? input.img : imagePaws}
                    alt='imageDog'
                    sx={{ border: '1px solid #f3f6f4', maxWidth: '20rem', margin: 'auto' }} />
                <Box component='form' padding='1rem'
                    sx={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
                    <TextField
                        error={error.name}
                        variant='outlined'
                        size='small'
                        label='Name'
                        name='name'
                        value={input.name}
                        onChange={handleOnChange} />

                    <Stack direction='row' spacing={1}>
                        <Stack width={sizeTextField}>
                            <Typography component='h6' variant='subtitle1' align='center'>
                                Height
                            </Typography>
                            <TextField
                                error={error.minHeight}
                                variant='outlined'
                                size='small'
                                label='Minimum height'
                                name='minHeight'
                                margin='dense'
                                value={input.minHeight}
                                onChange={handleOnChange} />
                            <TextField
                                error={error.maxHeight}
                                variant='outlined'
                                size='small'
                                label='Maximum height'
                                name='maxHeight'
                                margin='dense'
                                value={input.maxHeight}
                                onChange={handleOnChange} />
                        </Stack>

                        <Stack width={sizeTextField}>
                            <Typography component='h6' variant='subtitle1' align='center'>
                                Weight
                            </Typography>
                            <TextField
                                error={error.minWeight}
                                variant='outlined'
                                size='small'
                                label='Minimum weight'
                                name='minWeight'
                                value={input.minWeight}
                                margin='dense'
                                onChange={handleOnChange} />
                            <TextField
                                error={error.maxWeight}
                                variant='outlined'
                                size='small'
                                label='Maximum weight'
                                name='maxWeight'
                                margin='dense'
                                value={input.maxWeight}
                                onChange={handleOnChange} />
                        </Stack>

                        <Stack width={sizeTextField}>
                            <Typography component='h6' variant='subtitle1' align='center'>
                                Life Span
                            </Typography>
                            <TextField
                                error={error.minLifeSpan}
                                variant='outlined'
                                size='small'
                                label='Minimum'
                                name='minLifeSpan'
                                margin='dense'
                                value={input.minLifeSpan}
                                onChange={handleOnChange} />
                            <TextField
                                error={error.maxLifeSpan}
                                variant='outlined'
                                size='small'
                                label='Maximum'
                                name='maxLifeSpan'
                                margin='dense'
                                value={input.maxLifeSpan}
                                onChange={handleOnChange} />
                        </Stack>
                    </Stack>
                    <TextField
                        error={error.img}
                        variant='outlined'
                        size='small'
                        label='Image'
                        name='img'
                        margin='dense'
                        value={input.img}
                        onChange={handleOnChange} />

                    <TextField
                        error={error.temper}
                        variant='outlined'
                        size='small'
                        label='Temperaments'
                        name='temper'
                        margin='dense'
                        value={input.temper}
                        onChange={handleOnChange} />

                    <Button
                        variant='outlined'
                        disabled={!data}
                        onClick={handleSubmit}
                        endIcon={<SendIcon />}
                        sx={{ marginTop: '2rem' }}>
                        Submit
                    </Button>
                    <Snackbar
                        open={send}
                        autoHideDuration={6000}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
                            Breed successfully created.
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={send === false}
                        autoHideDuration={6000}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity='error' sx={{ width: '100%' }}>
                            Something went wrong.
                        </Alert>
                    </Snackbar>
                </Box>
            </Stack>
        </>
    )
};
