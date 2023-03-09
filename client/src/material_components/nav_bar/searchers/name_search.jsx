import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getAllBreeds } from '../../../redux/actions/breedActions.js';

import { TextField } from "@mui/material";
import { styleTextInput } from "../../../global/themes.js";

export default function NameSearch() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [input, SetInput] = React.useState("");

    function handleOnChange(event) {
        SetInput(event.target.value);
    };

    function handleSubmit(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            dispatch(getAllBreeds(input));
            SetInput("");
            history.push('/');
        }
    };

    return (<TextField
        sx={{ ...styleTextInput, width: 175 }}
        size="small"
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={handleOnChange}
        onKeyPress={handleSubmit}
        value={input} />
    )
};