import { useDispatch } from "react-redux";
import { setFilterType } from '../../../redux/actions/defaultActions.js';

import { DB, API, ALL } from '../../../global/ConstSource.js';

import '../GlobalSearch.css';

export default function SourceFilter() {
    const dispatch = useDispatch();

    function handleOnClickRadio(event) {
        dispatch(setFilterType(event.target.value))
    };

    return (
        <form className={`Global`}>
            <label className={`GlobalSearch`}>Filtro por origen:</label>
            <select className={`GlobalSearch`} onChange={handleOnClickRadio} >
                <option value={ALL} name={ALL} >Todos</option>
                <option value={DB} name={DB} >Interno</option>
                <option value={API} name={API} >Externo</option>
            </select>
        </form>
    )
};