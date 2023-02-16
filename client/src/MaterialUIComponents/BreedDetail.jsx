import React from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import { getBreed, cleanBreed } from '../redux/actions.js'

import imageDefault from '../global/images/paws.png';

import {
    Typography,
    Card,
    CardMedia,
    CardContent,
    Stack,
    List,
    ListItem,
    ListItemText,
    Container,
    CircularProgress
} from '@mui/material';

export default function BreedDetail() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { breed, loading } = useSelector(state => {
        return {
            breed: state.breed,
            loading: state.loadingBreed
        }
    });

    React.useEffect(() => {
        dispatch(getBreed(id))
        return function () {
            dispatch(cleanBreed());
        }
    }, [dispatch, id]);

    return (
        <>
            {loading ?
                <Container align='center' sx={{ paddingTop: '3rem' }}>
                    <CircularProgress
                        color="inherit"
                        size='3rem' />
                    <Typography>
                        Loading...
                    </Typography>
                </Container> :
                <Card
                    sx={{ margin: '2rem', padding: '0.5rem' }}>
                    <Stack
                        direction={{ sm: 'column', md: 'row', lg: 'row' }}>
                        <CardMedia
                            component="img"
                            src={breed.img ? breed.img : imageDefault}
                            alt='DetailImage'
                            sx={{ maxWidth: '50%', margin: 'auto' }} />

                        <CardContent
                            align='center'
                            sx={{ margin: '3rem', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Typography component='h5' variant='h5' align="center"
                                sx={{ whiteSpace: 'nowrap' }}>
                                {breed.name}
                            </Typography>

                            <Typography variant='h6' sx={{ paddingTop: '0.6rem' }}>
                                Life Span:
                            </Typography>
                            {breed.lifeSpan ?
                                <Typography component='p' variant='body1'>
                                    {breed.lifeSpan[0]}years - {breed.lifeSpan[1]}years
                                </Typography> :
                                null}

                            <Typography variant='h6' sx={{ paddingTop: '0.6rem' }}>
                                Height:
                            </Typography>
                            {breed.height ?
                                <Typography component='p' variant='body1'>
                                    {breed.height[0]}cm - {breed.height[1]}cm
                                </Typography> :
                                null}

                            <Typography variant='h6' sx={{ paddingTop: '0.6rem' }}>
                                Weight:
                            </Typography>
                            {breed.weight ?
                                <Typography component='p' variant='body1'>
                                    {breed.weight[0]}Kg - {breed.weight[1]}Kg
                                </Typography> :
                                null}

                            <Typography variant='h6' sx={{ paddingTop: '0.6rem' }}>
                                Temperaments:
                            </Typography>
                            <List dense={true} sx={{ padding: '0' }}>
                                {breed.temper?.map(el => {
                                    return (
                                        <ListItem key={el} sx={{ padding: '0', paddingLeft: '1rem' }}>
                                            <ListItemText align='center' primary={el} />
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </CardContent>
                    </Stack>
                </Card >}
        </>
    )
};