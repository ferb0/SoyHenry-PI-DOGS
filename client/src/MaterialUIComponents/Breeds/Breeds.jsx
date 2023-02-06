import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { temperFilter, sourceFilter, cantFilter } from '../../controllers/Pagination/funcionsFilter.js';
import { sortType } from '../../controllers/Pagination/functiosSort.js';
import { CANT_SUMMARIES } from '../../global/CantSummaries.js';

import { Typography, Container, Grid, Card, CardMedia, CardContent, Pagination, Stack } from '@mui/material';

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

            <Grid container spacing={4}>
                {breedsFinal[2]?.map(el =>
                    <Grid item key={el.name} xs={12} sm={6} md={3} lg={3}>
                        <Card
                            sx={{ padding: '1rem' }}>
                            <CardMedia
                                component="img"
                                image={el.img}
                                alt="imageDog"
                                sx={{ border: '1px solid #f3f6f4' }} />
                            <CardContent>
                                <Typography align='center' variant='h6'>
                                    {el.name}
                                </Typography>
                                <Typography>
                                    {el.temper}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>)}
            </Grid>

            <Stack align='center'>
                <Pagination page={breedsFinal[0]} count={breedsFinal[1]} onChange={handleClick} sx={{ margin: 'auto' }} />
            </Stack>

        </Container>
    )
};