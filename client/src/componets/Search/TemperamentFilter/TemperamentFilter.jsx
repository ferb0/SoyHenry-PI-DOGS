import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemper } from '../../../redux/actions.js'

import OptionsTempers from "../OptionsTempers/OptionsTempers.jsx";

import '../GlobalSearch.css';
import s from './TemperamentFilter.module.css';

export default function TemperamentFilter() {
    const dispatch = useDispatch();

    let { tempers, temperSelected, loading } = useSelector(state => {
        return {
            tempers: state.tempers,
            temperSelected: state.temperSelected,
            loading: state.loadingTemper
        }
    });

    function handleOnChangeTempers(event) {
        dispatch(setTemper(event.target.value));
    };

    return (
        <div className={`${s.TemperamentFilter} Global`}>
            <form >
                <label className={`GlobalSearch`}>Filtro por temperamentos:</label>
                <input className={`GlobalSearch`} type="search" name="busquedamodelos" list="listTemper" size="13" value={temperSelected} onChange={handleOnChangeTempers}></input>
                <datalist id="listTemper">
                    {tempers === false ? null : tempers?.map((el, id) => <OptionsTempers key={id} value={el} />)}
                </datalist>
            </form>
            {loading ? <div className={`${s.loading}`}>Recibiendo datos...</div> : null}
            {tempers === false ? <p className={`${s.msgDetail} msgError`}>Error al obtener la lista.</p> : null}
        </div>
    );
};