import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBreeds, getTempers, cleanAllData } from '../../redux/actions.js'

import TemperamentFilter from "./TemperamentFilter.jsx";
import SourceFilter from "./SourceFilter.jsx";
import SortType from "./SortType.jsx";
import { Link } from "react-router-dom";

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
                {<SortType />}
                {<TemperamentFilter />}
                
            </div>

            <button className={`${s.clean}`} onClick={cleanAll}>Limpiar todo</button>

            <div className={`${s.items}`}>
                <form className={`Global`} onSubmit={handleSubmit}>
                    <input className={`GlobalSearch`} id="searchInput" type='text' name="search" size="20" onChange={handleOnChange}></input>
                    <button className={`GlobalSearch Button`} type="submit">Buscar</button>
                </form>
                <Link className={`Global`} to='/create'>Crear Raza</Link>
                {loading ? <div className={`${s.cargando}`}>Recibiendo datos...</div> : null}
            </div>

        </div>
    );
}