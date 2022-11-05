import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreed, cleanBreed } from '../../redux/actions.js'

import '../../global/GlobalStyle.css';
import s from './DetailBreed.module.css';

export default function DetailBreed(props) {
    const dispatch = useDispatch();

    const { breed, loading } = useSelector(state => {
        return {
            breed: state.breed,
            loading: state.loadingBreed
        }
    });
    
    React.useEffect(() => {
        dispatch(getBreed(props.match.params.id))
        return function () {
            dispatch(cleanBreed());
        }
    }, []);

    return (
        <div className={`${s.Detail} Global`}>
            {loading ?
                <p>Recibiendo Datos...</p>
                :
                <div className={`${s.Detail} Global`}>
                    <img className={`${s.img}`} src={breed.img} alt="imagen" />
                    <div className={`${s.info}`}>
                        <div className={`${s.elementDetail}`}>
                            <label className={`${s.label}`}>Nombre:</label>
                            <p className={`${s.items}`}>{breed.name}</p>
                        </div>

                        <div className={`${s.elementDetail}`}>
                            <label className={`${s.label}`}>Peso:</label>
                            {breed.weight ? <p className={`${s.items}`}>{breed.weight[0]}Kg - {breed.weight[1]}Kg.</p> : null}
                        </div>

                        <div className={`${s.elementDetail}`}>
                            <label className={`${s.label}`}>Altura:</label>
                            {breed.height ? <p className={`${s.items}`}>{breed.height[0]}cm - {breed.height[1]}cm.</p> : null}
                        </div>

                        <div className={`${s.elementDetail}`}>
                            <label className={`${s.label}`}>Espectativa de vida:</label>
                            { breed.lifeSpan ? <p className={`${s.items}`}>{breed.lifeSpan[0]} - {breed.lifeSpan[1]} años.</p> :null}
                        </div>

                        {breed.temper ?
                            <div>
                                <p>Temperamentos:</p>
                                <ul className={`${s.elementDetail}`}>
                                    {breed.temper.map((el, i) => {
                                        return (<li key={i}>{el}</li>);
                                    })}
                                </ul>
                            </div>
                            :
                            <p>Sin Temperamentos.</p>}
                    </div>
                </div>}

        </div>
    );
};