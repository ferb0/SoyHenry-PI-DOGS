import { useSelector } from 'react-redux';

import { CANT_SUMMARIES } from '../../global/CantSummaries.js'
import {temperFilter, sourceFilter} from './funcions.js'

import './ConjuntBreed.css';

export default function ConjuntBreed() {
    const { breeds, sourceSelected, temperSelected } = useSelector(state => {
        return {
            breeds: state.breeds,
            sourceSelected: state.filterType,
            temperSelected: state.temperSelected
        }
    });

    // Se filtra lista por temperamentos
    let temperFiltered = temperFilter(breeds, temperSelected);

    // Se filtra por origen
    let sourceFiltered = sourceFilter(temperFiltered, sourceSelected);

    // Contenplar la condicion de que sea ceros elementos a mistrar con o son filtro
    return (
        <div className="ConjuntBreed">
            <h1>Conjunt Breed</h1>
            <br />
            {sourceFiltered.length === 0 ?
                <p>Sin resultados.</p> :
                sourceFiltered}
        </div>
    );
};