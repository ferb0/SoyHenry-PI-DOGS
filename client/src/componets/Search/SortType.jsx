import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreeds } from '../../redux/actions.js'

export default function SortType() {
    const ALPHA_ASC = "ALPHA_ASC"
    const ALPHA_DES = "ALPHA_DES";
    const WEIGHT_ASC = "WEIGHT_ASC";
    const WEIGHT_DES = "WEIGHT_DES";

    let dispatch = useDispatch();
    let breeds = useSelector(state => state.breeds);

    function handleOnChangeSort(event) {
        breeds.sort((first, second) => {

            if (event.target.value === ALPHA_DES) {
                if (first.name < second.name)
                    return 1
                if (first.name > second.name)
                    return -1
                return 0;
            }

            if (event.target.value === ALPHA_ASC) {
                if (first.name < second.name)
                    return -1
                if (first.name > second.name)
                    return 1
                return 0;
            }

            if (event.target.value === WEIGHT_DES) {
                // Se calcula el promedio de peso.
                let weightFirst = (first.weight[0] + first.weight[1]) / 2;
                let weightSecond = (second.weight[0] + second.weight[1]) / 2;

                if (weightFirst > weightSecond)
                    return -1
                if (weightFirst < weightSecond)
                    return 1
                return 0;
            }

            if (event.target.value === WEIGHT_ASC) {
                // Se calcula el promedio de peso.
                let weightFirst = (first.weight[0] + first.weight[1]) / 2;
                let weightSecond = (second.weight[0] + second.weight[1]) / 2;

                if (weightFirst < weightSecond)
                    return -1
                if (weightFirst > weightSecond)
                    return 1
                return 0;
            }

        });

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