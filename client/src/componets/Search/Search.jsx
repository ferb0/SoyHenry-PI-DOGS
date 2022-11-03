import React from "react";
import { useDispatch } from "react-redux";
import { getAllBreeds } from '../../redux/actions.js'

import TemperamentFilter from "./TemperamentFilter.jsx";
import SourceFilter from "./SourceFilter.jsx";
import SortType from "./SortType.jsx";
import { Link } from "react-router-dom";

import s from './Search.module.css';

export default function Search() {
    const dispatch = useDispatch();

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

    return (
        <div className={`${s.Search} Global`}>
            <div className={`${s.items}`}>
            {<SourceFilter />}
            {<SortType />}
            {<TemperamentFilter />}
            </div>

            <div className={`${s.items}`}>
            <form className={`Global`} onSubmit={handleSubmit}>
                <input className={`GlobalSearch`} id="searchInput" type='text' name="search" size="20" onChange={handleOnChange}></input>
                <button className={`GlobalSearch Button`} type="submit">Buscar</button>
            </form>
            <Link className={`Global`} to='/create'>Crear Raza</Link>
            </div>
        </div>
    );
}