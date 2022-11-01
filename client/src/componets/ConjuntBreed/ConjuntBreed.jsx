import SummaryBredd from '../SummaryBreed/SummaryBreed.jsx'

//import './ConjuntBreed.css';

export default function ConjuntBreed(props) {
    const breeds = props.breeds;

    return (
        <div className="ConjuntBreed">
            <h4>Conjunt Breed</h4>
            <br />
            {breeds?.length === 0 ?
                <p>Sin resultados.</p> :
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