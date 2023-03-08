import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { temperFilter, sourceFilter, cantFilter } from '../../controllers/Pagination/funcionsFilter.js';
import { sortType } from '../../controllers/Pagination/functiosSort.js';
import { CANT_SUMMARIES } from '../../global/CantSummaries.js';
import { firstLoadingOff } from '../../redux/actions/defaultActions.js';

import LoadingAnimation from '../Suport/LoadingAnimation.jsx';

import { Typography, Container, Pagination, Stack } from '@mui/material';
import BreedCard from './BreedCard.jsx';

export default function Breeds() {
    const dispatch = useDispatch();

    const {
        breeds,
        tempers,
        sourceSelected,
        temperSelected,
        sortSelected,
        loadingAllBreed,
        firstLoading } = useSelector(state => {
            return {
                tempers: state.temperReducer.tempers,
                temperSelected: state.temperReducer.temperSelected,
                breeds: state.breedsReducer.breeds,
                loadingAllBreed: state.breedsReducer.loadingAllBreed,
                sourceSelected: state.defaultReducer.filterType,
                sortSelected: state.defaultReducer.sortSelected,
                firstLoading: state.defaultReducer.firstLoading
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
            setBreedsFinal([1, sortFiltered.length, cantFilter(sortFiltered)]);
        }
    }, [breeds, sourceSelected, temperSelected, sortSelected]);

    function handleClick(event, value) {
        // Para llevar foco al top de la ventana. 
        window.scrollTo(0, 0);

        if (breeds !== false) {
            let temperFiltered = temperFilter(breeds, temperSelected);
            let sourceFiltered = sourceFilter(temperFiltered, sourceSelected);
            let sortFiltered = sortType(sourceFiltered, sortSelected);
            setBreedsFinal([parseInt(value), sortFiltered.length, cantFilter(sortFiltered, value)]);
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
                                    count={Math.ceil(breedsFinal[1] / CANT_SUMMARIES)}
                                    onChange={handleClick}
                                    sx={{ margin: 'auto', paddingBottom: '1rem', paddingTop: '1rem' }} />
                            </Stack>

                            <BreedCard breeds={breedsFinal[2]} />

                            <Stack align='center'>
                                <Pagination
                                    page={breedsFinal[0]}
                                    count={Math.ceil(breedsFinal[1] / CANT_SUMMARIES)}
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