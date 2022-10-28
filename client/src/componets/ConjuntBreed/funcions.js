import { ALL } from '../../global/ConstSource.js'
import SummaryBredd from '../SummaryBreed/SummaryBreed.jsx'
import { CANT_SUMMARIES } from '../../global/CantSummaries.js'

export function temperFilter(breeds, temperSelected) {
    if (temperSelected)
        return breeds?.filter(el => el.temper?.includes(temperSelected));
    return breeds;

};

export function sourceFilter(breeds, sourceSelected) {
    return breeds?.map(el => {
        if (sourceSelected === ALL)
            return <SummaryBredd
                key={el.id}
                id={el.id}
                name={el.name}
                weight={el.weight}
                img={el.img}
                temper={el.temper}
            />

        else if (el.source === sourceSelected)
            return <SummaryBredd
                key={el.id}
                id={el.id}
                name={el.name}
                weight={el.weight}
                img={el.img}
                temper={el.temper}
            />
    })
};

export function cantFilter(breeds, page = 1, cant = CANT_SUMMARIES) {
    if (breeds.length === 0) return [];
    let array = [];

    for (let i = (page - 1) * cant; i < (page - 1) * cant + cant; i++)
        array.push(breeds[i]);

    return array;
};