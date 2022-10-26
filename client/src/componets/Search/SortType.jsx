import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {setBreeds} from '../../redux/actions.js'

export default function SortType() {
    const ALPHA_ASC = "ALPHA_ASC";
    const ALPHA_DES = "ALPHA_DES";
    const WEIGHT_ASC = "WEIGHT_ASC";
    const WEIGHT_DES = "WEIGHT_DES";

    let dispatch = useDispatch();
    let breeds = useSelector(state => state.breeds);

    function handleOnChangeSort(event) {
        console.log(event.target.value);
        dispatch(setBreeds(breeds));
    };

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