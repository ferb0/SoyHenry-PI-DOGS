import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemper } from '../../redux/actions.js'

import OptionsTempers from "./OptionsTempers.jsx";

import './GlobalSearch.css';
import s from './TemperamentFilter.module.css';

export default function TemperamentFilter() {
    const dispatch = useDispatch();

    let tempers = useSelector(state => state.tempers);
    let temperSelected = useSelector(state => state.temperSelected);

    function handleOnChangeTempers(event) {
        dispatch(setTemper(event.target.value));
    };

    return (
        <div className={`${s.TemperamentFilter} Global`}>
            <form >
                <label className={`GlobalSearch`}>Filtro por temperamentos</label>
                <input className={`GlobalSearch`} type="search" name="busquedamodelos" list="listTemper" size="13" value={temperSelected} onChange={handleOnChangeTempers}></input>
                <datalist id="listTemper">
                    {tempers === false ? null : tempers?.map((el, id) => <OptionsTempers key={id} value={el} />)}
                </datalist>
            </form>
            {tempers === false ? <p className={`${s.msgDetail} msgError`}>Error al obtener los temperamentos.</p> : null}
        </div>
    );
};