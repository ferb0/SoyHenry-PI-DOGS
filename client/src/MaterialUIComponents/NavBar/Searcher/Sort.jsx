import { useDispatch, useSelector } from "react-redux";
import { setSortType } from '../../../redux/actions.js';

import { ALPHA_ASC, ALPHA_DES, WEIGHT_ASC, WEIGHT_DES } from "../../../global/ConstSort.js";

import { Autocomplete, TextField } from '@mui/material';
import { styleTextInput } from "../../../global/Themes.js";

export default function Sort() {

    const dispatch = useDispatch();
    const sortSelected = useSelector(state => state.defaultReducer.sortSelected);
    const options = [ALPHA_ASC, ALPHA_DES, WEIGHT_ASC, WEIGHT_DES];

    return (
        <Autocomplete
            size="small"
            options={options}
            sx={{ ...styleTextInput, width: 175 }}
            renderInput={(params) => <TextField {...params} label="Sort" />}
            onChange={(event, value) => dispatch(setSortType(value))}
            value={sortSelected} />
    )
};