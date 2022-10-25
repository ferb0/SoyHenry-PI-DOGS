import { useSelector } from 'react-redux';
import SummaryBredd from '../SummaryBreed/SummaryBreed.jsx'

import {ALL} from '../../global/constSource.js'

export default function ConjuntBreed() {
    const { breeds, filter } = useSelector(state => {
        return {
            breeds: state.breeds,
            filter: state.filterType
        }
    });
    // Contenplar la condicion de que sea ceros elementos a mistrar con o son filtro
    return (
        <div className="App">
            <h1>Conjunt Breed</h1>
            {breeds.map(el => {
                if(filter === ALL)
                return <SummaryBredd 
                key={el.id}
                name={el.name}
                weight={el.weight}
                img={el.img}
                temper={el.temper}
                />

                else if(el.source === filter)
                return <SummaryBredd 
                key={el.id}
                name={el.name}
                weight={el.weight}
                img={el.img}
                temper={el.temper}
                />
            })}
        </div>
    );
};