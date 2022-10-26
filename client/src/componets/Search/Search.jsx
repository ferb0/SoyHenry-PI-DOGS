import React from "react";
import { useDispatch } from "react-redux";
import { getBreed } from '../../redux/actions.js'

import TemperamentFilter from "./TemperamentFilter.jsx";
import SourceFilter from "./SourceFilter.jsx";


export default function Search() {
    const dispatch = useDispatch();

    const [input, SetInput] = React.useState("");

    function handleOnChange(event) {
        SetInput(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getBreed(input));
        SetInput("");
        document.getElementById('searchInput').value = '';
    };

    return (
        <div className="Search">
            {<SourceFilter />}
            {<TemperamentFilter />}

            <form onSubmit={handleSubmit}>
                <label>Ordenamiento</label> <br />
                <input id="searchInput" type='text' name="search" onChange={handleOnChange}></input>
                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}