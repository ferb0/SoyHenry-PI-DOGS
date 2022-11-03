import SummaryBredd from '../../SummaryBreed/SummaryBreed.jsx'

import s from './ConjuntBreed.module.css';

export default function ConjuntBreed(props) {
    const breeds = props.breeds;

    return (
        <div className={`${s.Conjunt} Global`}>

            {breeds?.length === 0 ?
                <p className={`${s.empty}`}>Sin resultados.</p> :
                breeds?.map(el => {
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