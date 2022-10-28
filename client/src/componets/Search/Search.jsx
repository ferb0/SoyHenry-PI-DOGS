import React from "react";
import { useDispatch } from "react-redux";
import { getAllBreeds } from '../../redux/actions.js'

import TemperamentFilter from "./TemperamentFilter.jsx";
import SourceFilter from "./SourceFilter.jsx";
import SortType from "./SortType.jsx";
import { Link } from "react-router-dom";


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
        <div className="Search">
            {<SourceFilter />}
            {<TemperamentFilter />}
            {<SortType />}
            <form onSubmit={handleSubmit}>
                <input id="searchInput" type='text' name="search" onChange={handleOnChange}></input>
                <button type="submit">Buscar</button>
            </form>
            <Link to='/create'>Crear Raza</Link>
        </div>
    );
}