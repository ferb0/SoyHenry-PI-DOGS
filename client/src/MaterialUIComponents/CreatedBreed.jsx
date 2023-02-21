import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { Alert, Box, TextField, Typography, CardMedia, Button, Stack, Snackbar, CircularProgress, Container } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CancelIcon from '@mui/icons-material/Cancel';

import { cleanBreed, getAllBreeds, getBreed, getTempers, putModifyBreed } from '../redux/actions.js';
import checker from '../controllers/Created/checker.js';
import formatData from '../controllers/Created/formatData.js';
import sendData from '../controllers/Created/sendData.js';

import imagePaws from '../global/images/paws.png';
const sizeTextField = '7rem';

function CreatedBreed() {
    const history = useHistory();
    const maxNewBreeds = useSelector(state => state.numberNewBreedsDBReached);
    const loading = useSelector(state => state.loadingBreed);
    const breed = useSelector(state => state.breed);
    // Con id determino si es para editar o para modificar
    const { id } = useParams();
    const dispatch = useDispatch();

    const [input, setInput] = React.useState(
        id ? {
            name: breed.name,
            maxHeight: breed.height && breed.height[1],
            minHeight: breed.height && breed.height[0],
            maxWeight: breed.weight && breed.weight[1],
            minWeight: breed.weight && breed.weight[0],
            minLifeSpan: breed.lifeSpan && breed.lifeSpan[0],
            maxLifeSpan: breed.lifeSpan && breed.lifeSpan[1],
            img: breed.img,
            temper: breed.temper?.join()
        } : {
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
    // Desabilita boton al envier datos
    const [disabledButton, SetDisabledButton] = React.useState(false);

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
        if (id)
            dispatch(getBreed(id));

        return function () {
            dispatch(cleanBreed());
        }
    }, [dispatch, id]);

    React.useEffect(() => {
        setData(formatData(input));
    }, [input]);

    async function handleSubmit(e) {
        e.preventDefault();
        SetDisabledButton(true);

        if (id)
            dispatch(putModifyBreed(breed.id, data));
        else {
            let response = await sendData(data);
            if (response.hasOwnProperty('msg'))
                setSend(true);
            else
                setSend(false);
        }

        dispatch(getAllBreeds(''));
        dispatch(getTempers());
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setSend(undefined);
    };

    return (
        <>{loading ?
            <Container align='center' sx={{ paddingTop: '3rem' }}>
                <CircularProgress
                    color="inherit"
                    size='3rem' />
                <Typography>
                    Loading...
                </Typography>
            </Container> :
            <>
                <Typography component='h5' variant='h5' align='center' padding='1rem'>
                    {id ? 'Modify a New Breed' : 'Create a New Breed'}
                </Typography>

                <Stack
                    direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'row', xl: 'row' }}>
                    <CardMedia
                        component='img'
                        src={input.img && !error.img ? input.img : imagePaws}
                        alt='imageDog'
                        sx={{ border: '1px solid #f3f6f4', maxWidth: '30rem', margin: 'auto' }} />
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

                        <Stack direction='row' spacing={1} paddingTop='0.5rem'>
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
                            helperText='Only one URL are allowed.'
                            onChange={handleOnChange} />

                        <TextField
                            error={error.temper}
                            variant='outlined'
                            size='small'
                            label='Temperaments'
                            name='temper'
                            margin='dense'
                            multiline
                            helperText='Add temperaments separated by commas.'
                            value={input.temper}
                            onChange={handleOnChange} />

                        {id ?
                            <Stack
                                direction='row'
                                spacing={2}
                                marginTop='2rem'
                                justifyContent='center'>
                                <Button
                                    variant='outlined'
                                    disabled={!data || disabledButton || maxNewBreeds}
                                    onClick={handleSubmit}
                                    endIcon={<FileUploadIcon />}>
                                    Update breed
                                </Button>
                                <Button
                                    variant='outlined'
                                    onClick={() => history.goBack()}
                                    endIcon={<CancelIcon />}>
                                    Cancel
                                </Button>
                            </Stack>
                            :
                            <Button
                                variant='outlined'
                                disabled={!data || disabledButton || maxNewBreeds}
                                onClick={handleSubmit}
                                endIcon={<FileUploadIcon />}
                                sx={{ marginTop: '2rem' }}>
                                Load new breed
                            </Button>}

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
            </>}

        </>
    )
};

export default CreatedBreed;