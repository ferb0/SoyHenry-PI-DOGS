import { useSelector } from 'react-redux';
import { temperFilter, sourceFilter, cantFilter } from './funcions.js'
import { useEffect, useState } from 'react';

import ConjuntBreed from "./ConjuntBreed/ConjuntBreed.jsx";
import ButtonPage from './ButtonPage/ButtonPage.jsx';

export default function Pagination() {
    const { breeds, sourceSelected, temperSelected } = useSelector(state => {
        return {
            breeds: state.breeds,
            sourceSelected: state.filterType,
            temperSelected: state.temperSelected
        }
    });
    let [breedsFinal, setBreedsFinal] = useState(
        [0, // Página actual
         0, // Cantidad total de elementos
         [] // Elementos a mostrar por página
        ]);

    // let temperFiltered = temperFilter(breeds, temperSelected);
    // let breedsFiltered = sourceFilter(temperFiltered, sourceSelected);

    useEffect(() => {
        let temperFiltered = temperFilter(breeds, temperSelected);
        let breedsFiltered = sourceFilter(temperFiltered, sourceSelected);
        setBreedsFinal([1, breedsFiltered.length, cantFilter(breedsFiltered)]);
    }, [breeds, sourceSelected, temperSelected]);

    function handleClick(e) {
        let temperFiltered = temperFilter(breeds, temperSelected);
        let breedsFiltered = sourceFilter(temperFiltered, sourceSelected);
        setBreedsFinal([parseInt(e.target.value), breedsFiltered.length, cantFilter(breedsFiltered, e.target.value)]);
    };

    let pages = [];
    console.log(breedsFinal)
    for (let i = 0; i < Math.ceil(breedsFinal[1] / 8); i++) {
        pages.push(<ButtonPage key={i+1} handleClick={handleClick} value={i + 1} disable={i === breedsFinal[0]-1}/>);
    };

    return (
        <div>
            <h3>Pagination</h3>
            {pages}
            <ConjuntBreed breeds={breedsFinal[2]} />
        </div>
    )
};