import React from "react";
import { useDispatch } from "react-redux";
import { setSortType } from '../../redux/actions.js'
import { ALPHA_ASC, ALPHA_DES, WEIGHT_ASC, WEIGHT_DES } from "../../global/ConstSort.js";

export default function SortType() {

    let dispatch = useDispatch();

    function handleOnChangeSort(event) {
        dispatch(setSortType(event.target.value));
    }

    return (
        <div>
            <label>Ordenamientos</label>
            <select name="filtroOrigen" id="" onChange={handleOnChangeSort} >
                <option value={ALPHA_ASC} name={ALPHA_ASC} > {ALPHA_ASC} </option>
                <option value={ALPHA_DES} name={ALPHA_DES} > {ALPHA_DES} </option>
                <option value={WEIGHT_ASC} name={WEIGHT_ASC} > {WEIGHT_ASC} </option>
                <option value={WEIGHT_DES} name={WEIGHT_DES} > {WEIGHT_DES} </option>
            </select>
        </div>
    )
};