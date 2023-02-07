import React from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import { getBreed, cleanBreed } from '../redux/actions.js'

import { Typography, Card, CardMedia, CardContent, Stack, List, ListItem, ListItemText } from '@mui/material';

export default function BreedDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { breed, loading } = useSelector(state => {
        return {
            breed: state.breed,
            loading: state.loadingBreed
        }
    });
    console.log(breed)
    React.useEffect(() => {
        dispatch(getBreed(id))
        return function () {
            dispatch(cleanBreed());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ?
                <p>Cargando...</p> :
                <Card
                    sx={{ margin: '2rem', padding: '0.5rem' }}>
                    <Stack
                        direction={{ sm: 'column', md: 'row', lg: 'row' }}>
                        <CardMedia
                            component="img"
                            src={breed.img}
                            alt='DetailImage' />

                        <CardContent
                            sx={{ margin: '3rem' }}>
                            <Typography component='h6' variant='h6' align="center">
                                {breed.name}
                            </Typography>

                            <Typography variant='h6'>
                                Weight:
                            </Typography>
                            <Typography component='subtitle2'>
                                {breed.weight[0]}Kg - {breed.weight[1]}Kg
                            </Typography>


                            <Typography variant='h6'>
                                Temperaments:
                            </Typography>
                            <List dense={true} sx={{ padding: '0' }}>
                                {breed.temper?.map(el => {
                                    return (
                                        <ListItem key={el} sx={{ padding: '0', paddingLeft: '1rem' }}>
                                            <ListItemText primary={el} />
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </CardContent>
                    </Stack>
                </Card >
            }
        </>
    )
};