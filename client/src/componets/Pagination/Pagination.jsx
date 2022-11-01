import { useSelector } from 'react-redux';
import { temperFilter, sourceFilter, cantFilter } from './funcions.js'

import ConjuntBreed from "./ConjuntBreed/ConjuntBreed.jsx";
import { useEffect, useState } from 'react';

export default function Pagination() {
    const { breeds, sourceSelected, temperSelected } = useSelector(state => {
        return {
            breeds: state.breeds,
            sourceSelected: state.filterType,
            temperSelected: state.temperSelected
        }
    });
    let [breedsFinal, setBreedsFinal] = useState([]);

    // let temperFiltered = temperFilter(breeds, temperSelected);
    // let breedsFiltered = sourceFilter(temperFiltered, sourceSelected);

    useEffect(() => {
        console.log(temperFilter(breeds, temperSelected))
        setBreedsFinal(cantFilter(sourceFilter(temperFilter(breeds, temperSelected), sourceSelected)), 1);
    }, [breeds, sourceSelected, temperSelected]);

    function handleClick(e) {
        setBreedsFinal(cantFilter(sourceFilter(temperFilter(breeds, temperSelected), sourceSelected), e.target.value));
    }


    return (
        <div>
            <h3>Pagination</h3>
            <button onClick={handleClick} value="1">1</button>
            <button onClick={handleClick} value="2">2</button>
            <button onClick={handleClick} value="3">3</button>
            <ConjuntBreed breeds={breedsFinal} />
        </div>
    )
};