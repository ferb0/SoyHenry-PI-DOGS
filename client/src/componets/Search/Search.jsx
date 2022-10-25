import React from "react";
import { useDispatch } from "react-redux";
import { getBreed, setFilterType } from '../../redux/actions.js'

import { DB, API, ALL } from '../../global/constSource.js'

export default function Search() {
    const dispatch = useDispatch();
    const [input, SetInput] = React.useState("");
    //const [filterType, SetFilter] = React.useState("");

    function handleOnChange(event) {
        SetInput(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getBreed(input));
        SetInput("");
        document.getElementById('searchInput').value = '';
    };

    function handleOnClickRadio(event) {
        dispatch(setFilterType(event.target.name))
    };

    return (
        <div className="nav">
            <form>
                <label>Filtro</label> <br />
                <input id="radio_ALL" type="radio" name={ALL} value={ALL} onClick={handleOnClickRadio} />
                <label>{ALL}</label> <br />
                <input id="radio_DB" type="radio" name={DB} value={DB} onClick={handleOnClickRadio} />
                <label>{DB}</label> <br />
                <input id="radio_API" type="radio" name={API} value={API} onClick={handleOnClickRadio} />
                <label>{API}</label>
            </form>


            <form onSubmit={handleSubmit}>
                <label>Ordenamiento</label> <br />
                <input id="searchInput" type='text' name="search" onChange={handleOnChange}></input>
                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}