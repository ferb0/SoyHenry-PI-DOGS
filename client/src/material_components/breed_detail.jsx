import React from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import { getBreed, cleanBreed, cleanStatuDeleteBreed } from '../redux/actions/breedActions.js';
import { getNumberBreedDB } from "../redux/actions/configActions.js";

import DeteleModifyButtons from "./suport/detele_modify_buttons.jsx";
import LoadingAnimation from './suport/loading_animation.jsx';
import Notifications from "./suport/notifications.jsx";

import { API } from "../global/const_source.js";
import imageDefault from '../global/images/paws.png';

import {
    Typography,
    Card,
    CardMedia,
    CardContent,
    Stack,
    List,
    ListItem,
    ListItemText
} from '@mui/material';

export default function BreedDetail() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { breed, loading, deleteBreed } = useSelector(state => {
        return {
            breed: state.breedsReducer.breed,
            loading: state.breedsReducer.loadingBreed,
            deleteBreed: state.breedsReducer.deleteBreed
        }
    });

    React.useEffect(() => {
        dispatch(getBreed(id))
        return function () {
            dispatch(cleanStatuDeleteBreed());
            dispatch(cleanBreed());
            dispatch(getNumberBreedDB());
        }
    }, [dispatch, id]);

    return (
        <>
            {loading ?
                <LoadingAnimation
                    ArrayMessage={['Loading Details...']}
                    style={{ paddingTop: '3rem', paddingBottom: '2rem' }} />
                :
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
                                    {breed.lifeSpan[0] && breed.lifeSpan[1] ?
                                        `${breed.lifeSpan[0].toString()} years - ${breed.lifeSpan[1].toString()} years`
                                        :
                                        'No data.'}
                                </Typography> :
                                null}

                            <Typography variant='h6' sx={{ paddingTop: '0.6rem' }}>
                                Height:
                            </Typography>
                            {breed.height ?
                                <Typography component='p' variant='body1'>
                                    {breed.height[0] && breed.height[1] ?
                                        `${breed.height[0].toString()}cm - ${breed.height[1].toString()}cm`
                                        :
                                        'No data.'}
                                </Typography> :
                                null}

                            <Typography variant='h6' sx={{ paddingTop: '0.6rem' }}>
                                Weight:
                            </Typography>
                            {breed.weight ?
                                <Typography component='p' variant='body1'>
                                    {breed.weight[0] && breed.weight[1] ?
                                        `${breed.weight[0].toString()}kg - ${breed.weight[1].toString()}kg`
                                        :
                                        'No data.'}
                                </Typography> :
                                null}

                            <Typography variant='h6' sx={{ paddingTop: '0.6rem' }}>
                                Temperaments:
                            </Typography>
                            <List dense={true} sx={{ padding: '0' }}>
                                {breed.temper && breed.temper.lenght !== 0 ?
                                    breed.temper?.map(el => {
                                        return (
                                            <ListItem key={el} sx={{ padding: '0', paddingLeft: '1rem' }}>
                                                <ListItemText align='center' primary={el} />
                                            </ListItem>
                                        )
                                    })
                                    :
                                    'No data.'}
                            </List>


                            <DeteleModifyButtons id={id} api={breed.source === API} />

                            <Notifications
                                condition={deleteBreed}
                                positiveMessage={'Breed successfully deleted.'}
                                negativeMessage={'Something went wrong with the deleting.'} />

                        </CardContent>
                    </Stack>
                </Card >}
        </>
    )
};
