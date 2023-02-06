import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { temperFilter, sourceFilter, cantFilter } from '../../controllers/Pagination/funcionsFilter.js';
import { sortType } from '../../controllers/Pagination/functiosSort.js';
import { CANT_SUMMARIES } from '../../global/CantSummaries.js';

import { Typography, Container, Pagination, Stack } from '@mui/material';
import BreedCard from './BreedCard.jsx';

export default function Breeds() {
    const { breeds, sourceSelected, temperSelected, sortSelected } = useSelector(state => {
        return {
            breeds: state.breeds,
            sourceSelected: state.filterType,
            temperSelected: state.temperSelected,
            sortSelected: state.sortSelected
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

            <Stack align='center'>
                <Pagination page={breedsFinal[0]} count={Math.ceil(breedsFinal[1] / CANT_SUMMARIES)} onChange={handleClick} sx={{ margin: 'auto' }} />
            </Stack>

            <BreedCard breeds={breedsFinal[2]}/>

            <Stack align='center'>
                <Pagination page={breedsFinal[0]} count={breedsFinal[1]} onChange={handleClick} sx={{ margin: 'auto' }} />
            </Stack>

        </Container>
    )
};