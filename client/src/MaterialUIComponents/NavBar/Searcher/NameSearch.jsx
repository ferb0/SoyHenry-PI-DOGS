import React from "react";
import { useDispatch } from "react-redux";
import { getAllBreeds } from '../../../redux/actions.js'

import { TextField } from "@mui/material";

export default function NameSearch() {
    const dispatch = useDispatch();

    const [input, SetInput] = React.useState("");

    function handleOnChange(event) {
        SetInput(event.target.value);
    };

    function handleSubmit(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            dispatch(getAllBreeds(input));
            SetInput("");
        }
    };

    return (<TextField
        sx={{ width: 175 }}
        size="small"
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={handleOnChange}
        onKeyPress={handleSubmit}
        value={input} />
    )
};