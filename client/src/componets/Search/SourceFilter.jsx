import { useDispatch, useSelector } from "react-redux";
import { setFilterType } from '../../redux/actions.js'

import { DB, API, ALL } from '../../global/ConstSource.js'

import './GlobalSearch.css';

export default function SourceFilter() {
    //const [filterType, SetFilter] = React.useState("");

    const dispatch = useDispatch();

    let sourceSelected = useSelector(state => state.filterType);

    function handleOnClickRadio(event) {
        dispatch(setFilterType(event.target.value))
    };

    return (
        <form className={`Global`}>
            <label className={`GlobalSearch`}>Filtro por origen</label>
            <select className={`GlobalSearch Button`} name="filtroOrigen" id="" value={sourceSelected} onChange={handleOnClickRadio} >
                <option value={ALL} name={ALL} > {ALL} </option>
                <option value={DB} name={DB} > {DB} </option>
                <option value={API} name={API} > {API} </option>
            </select>
        </form>
    )
};