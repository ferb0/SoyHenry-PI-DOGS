import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { temperFilter, sourceFilter, cantFilter } from '../../controllers/pagination/funcions_filter.js';
import { sortType } from '../../controllers/pagination/functios_sort.js';
import { firstLoadingOff } from '../../redux/actions/default_actions.js';

import LoadingAnimation from '../suport/loading_animation.jsx';

import { Typography, Container, Pagination, Stack } from '@mui/material';
import BreedCard from './breed_card.jsx';

export default function Breeds() {
    const dispatch = useDispatch();

    const {
        breeds,
        tempers,
        sourceSelected,
        temperSelected,
        sortSelected,
        loadingAllBreed,
        firstLoading,
        breedsForPage } = useSelector(state => {
            return {
                tempers: state.temperReducer.tempers,
                temperSelected: state.temperReducer.temperSelected,
                breeds: state.breedsReducer.breeds,
                loadingAllBreed: state.breedsReducer.loadingAllBreed,
                sourceSelected: state.defaultReducer.filterType,
                sortSelected: state.defaultReducer.sortSelected,
                firstLoading: state.defaultReducer.firstLoading,
                breedsForPage: state.configReducer.breedsForPage
            }
        });

    let [breedsFinal, setBreedsFinal] = useState(
        [
            0, // Página actual.
            0, // Cantidad total de elementos.
            [] // Elementos a mostrar por página.
        ]);

    useEffect(() => {
        if (tempers.length !== 0)
            dispatch(firstLoadingOff());
    }, [dispatch, tempers]);

    useEffect(() => {
        if (breeds !== false) {
            let temperFiltered = temperFilter(breeds, temperSelected);
            let sourceFiltered = sourceFilter(temperFiltered, sourceSelected);
            let sortFiltered = sortType(sourceFiltered, sortSelected);
            setBreedsFinal([1, sortFiltered.length, cantFilter(sortFiltered, 1, breedsForPage)]);
        }
    }, [breeds, sourceSelected, temperSelected, sortSelected, breedsForPage]);

    function handleClick(event, value) {
        // Para llevar foco al top de la ventana. 
        window.scrollTo(0, 0);

        if (breeds !== false) {
            let temperFiltered = temperFilter(breeds, temperSelected);
            let sourceFiltered = sourceFilter(temperFiltered, sourceSelected);
            let sortFiltered = sortType(sourceFiltered, sortSelected);
            setBreedsFinal([parseInt(value), sortFiltered.length, cantFilter(sortFiltered, value, breedsForPage)]);
        }
    };

    return (
        <Container sx={{ padding: '1rem' }}>
            <Typography variant='h6' align='center'>
                List of Breeds
            </Typography>
            {!loadingAllBreed ?
                breeds === false ?
                    <Typography color='error' align='center' sx={{ paddingTop: '3rem' }}>
                        Error getting data.
                    </Typography>
                    :
                    breedsFinal[2]?.length !== 0 ?
                        <>
                            <Stack align='center'>
                                <Pagination
                                    page={breedsFinal[0]}
                                    count={Math.ceil(breedsFinal[1] / breedsForPage)}
                                    onChange={handleClick}
                                    sx={{ margin: 'auto', paddingBottom: '1rem', paddingTop: '1rem' }} />
                            </Stack>

                            <BreedCard breeds={breedsFinal[2]} />

                            <Stack align='center'>
                                <Pagination
                                    page={breedsFinal[0]}
                                    count={Math.ceil(breedsFinal[1] / breedsForPage)}
                                    onChange={handleClick}
                                    sx={{ margin: 'auto', paddingBottom: '1rem', paddingTop: '1rem' }} />
                            </Stack>
                        </> :
                        <Typography align='center' sx={{ paddingTop: '3rem' }}>
                            Without results.
                        </Typography>
                :
                <LoadingAnimation firstLoading={firstLoading} ArrayMessage={['Loading...']} style={{ paddingTop: '3rem' }} />}
        </Container>
    )
};