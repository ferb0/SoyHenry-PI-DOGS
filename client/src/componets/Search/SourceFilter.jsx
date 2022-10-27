import { useDispatch } from "react-redux";
import { setFilterType } from '../../redux/actions.js'

import { DB, API, ALL } from '../../global/constSource.js'

export default function SourceFilter() {
    //const [filterType, SetFilter] = React.useState("");

    const dispatch = useDispatch();

    function handleOnClickRadio(event) {
        dispatch(setFilterType(event.target.value))
    };

    return (
        <form>
            <label>Filtro por origen</label>
            <select name="filtroOrigen" id="" onChange={handleOnClickRadio} >
                <option value={ALL} name={ALL} > {ALL} </option>
                <option value={DB} name={DB} > {DB} </option>
                <option value={API} name={API} > {API} </option>
            </select>
        </form>
    )
};