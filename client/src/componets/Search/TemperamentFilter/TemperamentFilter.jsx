import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemper } from '../../../redux/actions/temperActions.js';

import '../GlobalSearch.css';
import s from './TemperamentFilter.module.css';

export default function TemperamentFilter() {
    const dispatch = useDispatch();

    let { tempers, temperSelected, loading } = useSelector(state => {
        return {
            tempers: state.temperReducer.tempers,
            temperSelected: state.temperReducer.temperSelected,
            loading: state.temperReducer.loadingTemper
        }
    });

    function handleOnChangeTempers(event) {
        dispatch(setTemper(event.target.value));
    };

    return (
        <div className={`${s.TemperamentFilter} Global`}>
            <div >
                <label className={`GlobalSearch`}>Filtro por temperamentos:</label>
                <input className={`GlobalSearch`} type="search" list="listTemper" size="13" value={temperSelected} onChange={handleOnChangeTempers} placeholder={'Temperamento'}></input>
                <datalist id="listTemper">
                    {tempers === false ? null : tempers?.map((el, id) => <option key={id} value={el} />)}
                </datalist>
            </div>
            {loading ? <div className={`${s.loading}`}>Recibiendo datos...</div> : null}
            {tempers === false ? <p className={`${s.msgDetail} msgError`}>Error al obtener la lista.</p> : null}
        </div>
    );
};