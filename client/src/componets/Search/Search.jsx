import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTempers } from '../../redux/actions/temperActions.js'
import { getAllBreeds, cleanAllData } from '../../redux/actions/defaultActions.js';
import { Link } from "react-router-dom";

import TemperamentFilter from "./TemperamentFilter/TemperamentFilter.jsx";
import SourceFilter from "./SourceFilter/SourceFilter.jsx";
import SortType from "./SortType/SortType.jsx";


import s from './Search.module.css';

export default function Search() {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.loadingBreed);

    const [input, SetInput] = React.useState("");

    function handleOnChange(event) {
        SetInput(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getAllBreeds(input));
        SetInput("");
        document.getElementById('searchInput').value = '';
    };

    function cleanAll() {
        dispatch(cleanAllData());
        dispatch(getTempers());
    };

    return (
        <div className={`${s.Search} Global`}>

            <div className={`${s.items}`}>
                {<SourceFilter />}
                {<TemperamentFilter />}
                {<SortType />}

            </div>

            <button className={`${s.clean}`} onClick={cleanAll}>Limpiar todo</button>

            <div className={`${s.items}`}>
                <form className={`Global`} onSubmit={handleSubmit}>
                    <input className={`GlobalSearch`} id="searchInput" type='text' size="20" onChange={handleOnChange} placeholder={'Nombre'}></input>
                    <button className={`GlobalSearch`} type="submit">Buscar</button>
                </form>
                <button className={`${s.create}`}><Link to='/create'>Crear Raza</Link></button>
                {loading ? <div className={`${s.cargando}`}>Recibiendo datos...</div> : null}
            </div>

        </div>
    );
}