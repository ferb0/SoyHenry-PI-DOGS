import { useDispatch, useSelector } from "react-redux";
import { setFilterType } from '../../../redux/actions/default_actions.js';
import { objectToArraySources } from "./filter_source_controller.js";

import { TextField, Autocomplete } from '@mui/material';
import { styleTextInput } from "../../../global/themes.js";

export default function FilterSource() {
    const dispatch = useDispatch();
    const constSources = useSelector(state => state.configReducer.constSources);
    const filterType = useSelector(state => state.defaultReducer.filterType);

    const options = constSources && objectToArraySources(constSources);

    return (
        <Autocomplete
            size="small"
            options={constSources ? options : ['Loading...']}
            sx={{ ...styleTextInput, width: 175 }}
            renderInput={(params) => <TextField {...params} label="Source" />}
            onChange={(event, value) => dispatch(setFilterType(value))}
            value={filterType} />
    )
};
