import { useSelector } from 'react-redux';
import { temperFilter, sourceFilter, cantFilter, sortType } from './funcions.js'
import { useEffect, useState } from 'react';

import { generatorPages } from './GeneratorPages.js';
import ConjuntBreed from "./ConjuntBreed/ConjuntBreed.jsx";

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
        let temperFiltered = temperFilter(breeds, temperSelected);
        let sourceFiltered = sourceFilter(temperFiltered, sourceSelected);
        let sortFiltered = sortType(sourceFiltered, sortSelected);
        setBreedsFinal([1, sortFiltered.length, cantFilter(sortFiltered)]);
    }, [breeds, sourceSelected, temperSelected, sortSelected]);

    function handleClick(e) {
        let temperFiltered = temperFilter(breeds, temperSelected);
        let sourceFiltered = sourceFilter(temperFiltered, sourceSelected);
        let sortFiltered = sortType(sourceFiltered, sortSelected);
        setBreedsFinal([parseInt(e.target.value), sortFiltered.length, cantFilter(sortFiltered, e.target.value)]);
    };

    let pages = generatorPages(breedsFinal, handleClick);

    return (
        <div className={`Global`}>
            <div className={`${s.button}`}>
                {pages}
            </div>

            <ConjuntBreed breeds={breedsFinal[2]} />
        </div>
    )
};