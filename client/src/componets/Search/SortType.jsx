import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortType } from '../../redux/actions.js'
import { ALPHA_ASC, ALPHA_DES, WEIGHT_ASC, WEIGHT_DES } from "../../global/ConstSort.js";

import './GlobalSearch.css';

export default function SortType() {

    const dispatch = useDispatch();
    let sortSelected = useSelector(state => state.sortSelected);

    function handleOnChangeSort(event) {
        dispatch(setSortType(event.target.value));
    }

    return (
        <div className={`Global`}>
            <label className={`GlobalSearch`}>Ordenamientos</label>
            <select className={`GlobalSearch Button`} name="filtroOrigen" id="" value={sortSelected} onChange={handleOnChangeSort} >
                <option value={ALPHA_ASC} name={ALPHA_ASC} > {ALPHA_ASC} </option>
                <option value={ALPHA_DES} name={ALPHA_DES} > {ALPHA_DES} </option>
                <option value={WEIGHT_ASC} name={WEIGHT_ASC} > {WEIGHT_ASC} </option>
                <option value={WEIGHT_DES} name={WEIGHT_DES} > {WEIGHT_DES} </option>
            </select>
        </div>
    )
};