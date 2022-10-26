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
        dispatch(setFilterType(event.target.value))
    };

    return (
        <div className="nav">
            <form>
                <label>Filtro por origen</label>
                <select name="filtroOrigen" id="" onChange={handleOnClickRadio} >
                    <option value={ALL} name={ALL} > {ALL} </option>
                    <option value={DB} name={DB} > {DB} </option>
                    <option value={API} name={API} > {API} </option>
                </select>
            </form>

            <form onSubmit={handleSubmit}>
                <label>Ordenamiento</label> <br />
                <input id="searchInput" type='text' name="search" onChange={handleOnChange}></input>
                <button type="submit">Buscar</button>
            </form>
        </div>
    );
}