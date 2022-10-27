import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTempers, setTemper } from '../../redux/actions.js'

import OptionsTempers from "./OptionsTempers.jsx";

export default function TemperamentFilter() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getTempers());
    }, []);

    const tempers = useSelector(state => state.tempers);

    function handleOnChangeTempers(event) {
        dispatch(setTemper(event.target.value));
    };

    return (
        <form>
            <label>Filtro por temperamentos</label>
            <input type="search" name="busquedamodelos" list="listTemper" onChange={handleOnChangeTempers}></input>
            <datalist id="listTemper">
                {tempers?.map((el, id) => <OptionsTempers key={id} value={el} />)}
            </datalist>
        </form>
    );
};