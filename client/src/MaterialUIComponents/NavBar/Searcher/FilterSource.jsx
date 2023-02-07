import { useDispatch, useSelector } from "react-redux";
import { setFilterType } from '../../../redux/actions.js';
import { DB, API, ALL } from '../../../global/ConstSource.js';

import { TextField, Autocomplete } from '@mui/material';

export default function FilterSource() {
    const dispatch = useDispatch();
    const options = [DB, API, ALL];
    const filterType = useSelector(state => state.filterType);

    return (
        <Autocomplete
                size="small"
                options={options}
                sx={{ width: 175 }}
                renderInput={(params) => <TextField {...params} label="Source" />}
                onChange={(event, value) => dispatch(setFilterType(value))} 
                value={filterType} />
    )
};