import { useSelector } from 'react-redux';
import SummaryBredd from '../SummaryBreed/SummaryBreed.jsx'

import { ALL } from '../../global/constSource.js'

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
    console.log(temperFilter)
    // Contenplar la condicion de que sea ceros elementos a mistrar con o son filtro
    return (
        <div className="App">
            <h1>Conjunt Breed</h1>
            {temperFilter?.map(el => {
                if (filterSource === ALL)
                    return <SummaryBredd
                        key={el.id}
                        name={el.name}
                        weight={el.weight}
                        img={el.img}
                        temper={el.temper}
                    />

                else if (el.source === filterSource)
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