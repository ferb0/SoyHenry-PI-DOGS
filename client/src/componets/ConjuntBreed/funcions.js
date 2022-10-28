import { ALL } from '../../global/ConstSource.js'
import SummaryBredd from '../SummaryBreed/SummaryBreed.jsx'

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