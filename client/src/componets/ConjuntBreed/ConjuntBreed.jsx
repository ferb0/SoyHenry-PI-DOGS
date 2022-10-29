import { useSelector } from 'react-redux';

import { temperFilter, sourceFilter, cantFilter } from './funcions.js'

import SummaryBredd from '../SummaryBreed/SummaryBreed.jsx'

//import './ConjuntBreed.css';

export default function ConjuntBreed() {
    const { breeds, sourceSelected, temperSelected } = useSelector(state => {
        return {
            breeds: state.breeds,
            sourceSelected: state.filterType,
            temperSelected: state.temperSelected
        }
    });


    let temperFiltered = temperFilter(breeds, temperSelected);

    // Se filtra por origen
    // let sourceFiltered = sourceFilter(temperFiltered, sourceSelected);

    // let breedsFiltered = cantFilter(sourceFiltered);
    let breedsFiltered = sourceFilter(temperFiltered, sourceSelected);
    console.log(breedsFiltered)
    return (
        <div className="ConjuntBreed">
            <h1>Conjunt Breed</h1>
            <br />
            {breedsFiltered?.length === 0 ?
                <p>Sin resultados.</p> :
                breedsFiltered?.map(el => {
                    return <SummaryBredd
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        weight={el.weight}
                        img={el.img}
                        temper={el.temper}
                    />
            })}
        </div>
    );
};