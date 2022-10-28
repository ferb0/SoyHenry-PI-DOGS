import { useSelector } from 'react-redux';
import SummaryBredd from '../SummaryBreed/SummaryBreed.jsx'

import { ALL } from '../../global/ConstSource.js'

import './ConjuntBreed.css';

export default function ConjuntBreed() {
    const { breeds, filterSource, temperSelected } = useSelector(state => {
        return {
            breeds: state.breeds,
            filterSource: state.filterType,
            temperSelected: state.temperSelected
        }
    });

    // Se filtra lista por temperamentos
    let temperFilter = [];
    if (temperSelected)
        temperFilter = breeds?.filter(el => el.temper?.includes(temperSelected));
    else {
        temperFilter = breeds;
    }

    // Se filtra por origen
    let temperSource = temperFilter?.map(el => {
        if (filterSource === ALL)
            return <SummaryBredd
                key={el.id}
                id={el.id}
                name={el.name}
                weight={el.weight}
                img={el.img}
                temper={el.temper}
            />

        else if (el.source === filterSource)
            return <SummaryBredd
                key={el.id}
                id={el.id}
                name={el.name}
                weight={el.weight}
                img={el.img}
                temper={el.temper}
            />
    })

    // Contenplar la condicion de que sea ceros elementos a mistrar con o son filtro
    return (
        <div className="ConjuntBreed">
            <h1>Conjunt Breed</h1>
            <br/>
            {temperSource.length === 0 ?
                <p>Sin resultados.</p> :
                temperSource}
        </div>
    );
};