import { useDispatch, useSelector } from "react-redux";
import { setFilterType } from '../../../redux/actions/defaultActions.js';
import { DB, API, ALL } from '../../../global/const_source.js';

import { TextField, Autocomplete } from '@mui/material';
import { styleTextInput } from "../../../global/themes.js";

export default function FilterSource() {
    const dispatch = useDispatch();
    const options = [DB, API, ALL];
    const filterType = useSelector(state => state.defaultReducer.filterType);

    return (
        <Autocomplete
            size="small"
            options={options}
            sx={{ ...styleTextInput, width: 175 }}
            renderInput={(params) => <TextField {...params} label="Source" />}
            onChange={(event, value) => dispatch(setFilterType(value))}
            value={filterType} />
    )
};