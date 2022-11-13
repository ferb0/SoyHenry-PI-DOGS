import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { temperFilter, sourceFilter, cantFilter } from './controllers/funcionsFilter.js';
import { sortType } from './controllers/functiosSort.js';
import { generatorPages } from './controllers/generatorPages.js';

import ConjuntBreed from "./ConjuntBreed/ConjuntBreed.jsx";
import Nav from '../Nav/Nav.jsx';
import Search from '../Search/Search.jsx';

import s from './Pagination.module.css';

export default function Pagination() {
    const { breeds, sourceSelected, temperSelected, sortSelected } = useSelector(state => {
        return {
            breeds: state.breeds,
            sourceSelected: state.filterType,
            temperSelected: state.temperSelected,
            sortSelected: state.sortSelected
        }
    });
    let [breedsFinal, setBreedsFinal] = useState(
        [0, // Página actual
            0, // Cantidad total de elementos
            [] // Elementos a mostrar por página
        ]);

    useEffect(() => {
        if (breeds !== false) {
            let temperFiltered = temperFilter(breeds, temperSelected);
            let sourceFiltered = sourceFilter(temperFiltered, sourceSelected);
            let sortFiltered = sortType(sourceFiltered, sortSelected);
            setBreedsFinal([1, sortFiltered.length, cantFilter(sortFiltered)]);
        }
    }, [breeds, sourceSelected, temperSelected, sortSelected]);

    function handleClick(e) {
        if (breeds !== false) {
            let temperFiltered = temperFilter(breeds, temperSelected);
            let sourceFiltered = sourceFilter(temperFiltered, sourceSelected);
            let sortFiltered = sortType(sourceFiltered, sortSelected);
            setBreedsFinal([parseInt(e.target.value), sortFiltered.length, cantFilter(sortFiltered, e.target.value)]);
        }
    };

    let pages = generatorPages(breedsFinal, handleClick);

    return (
        <div>

            <Nav />

            <Search />

            <div className={`Global`}>
                <div className={`${s.button}`}>
                    {pages}
                </div>

                <ConjuntBreed breeds={breedsFinal[2]} />

                {breeds === false ? <p className={`${s.alignError} msgError`}>Error al obtener los resultados.</p> : null}

                <div className={`${s.button}`}>
                    {pages}
                </div>
            </div>

        </div>
    )
};