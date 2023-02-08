import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { temperFilter, sourceFilter, cantFilter } from '../../controllers/Pagination/funcionsFilter.js';
import { sortType } from '../../controllers/Pagination/functiosSort.js';
import { CANT_SUMMARIES } from '../../global/CantSummaries.js';

import { Typography, Container, Pagination, Stack, CircularProgress } from '@mui/material';
import BreedCard from './BreedCard.jsx';

export default function Breeds() {
    const { breeds, sourceSelected, temperSelected, sortSelected, loadingBreed } = useSelector(state => {
        return {
            breeds: state.breeds,
            sourceSelected: state.filterType,
            temperSelected: state.temperSelected,
            sortSelected: state.sortSelected,
            loadingBreed: state.loadingBreed
        }
    });
    let [breedsFinal, setBreedsFinal] = useState(
        [
            0, // Página actual.
            0, // Cantidad total de elementos.
            [] // Elementos a mostrar por página.
        ]);

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
            {!loadingBreed ?
                breeds === false ?
                <Typography color='error' align='center' sx={{paddingTop: '3rem'}}>
                    Error getting data.
                </Typography>
                :
                breeds?.length !== 0 ?
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
                <Typography align='center' sx={{paddingTop: '3rem'}}>
                    Without results.
                </Typography>
                :
                <Container align='center' sx={{paddingTop: '3rem'}}>
                    <CircularProgress
                        color="inherit"
                        size='3rem' />
                    <Typography>
                        Loading...
                    </Typography>
                </Container>}
        </Container>
    )
};