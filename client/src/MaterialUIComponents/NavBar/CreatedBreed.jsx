import React from "react";
import { Box, TextField, Typography } from '@mui/material';

import checker from "../../controllers/Created/checker.js";
import formatData from "../../controllers/Created/formatData.js";

const { REACT_APP_API_BASE_URL } = process.env;

export default function CreatedBreed() {
    const [input, setInput] = React.useState({
        name: "",
        maxHeight: "",
        minHeight: "",
        maxWeight: "",
        minWeight: "",
        minLifeSpan: "",
        maxLifeSpan: "",
        img: "",
        temper: []
    });
      // input con formato de envio.
  const [data, setData] = React.useState(undefined);
  // Error cuando se envia los datos al server.
  const [send, setSend] = React.useState(undefined);

    function handleOnChange(event) {
        setInput({
            ...input,
            [event.target.name]: checker(event.target.name, event.target.value)
        });
    };

    React.useEffect(() => {
        setData(formatData(input));
    }, [input]);

    function handleSubmit(e) {
        e.preventDefault();

        fetch(REACT_APP_API_BASE_URL + `/dogs`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(response => response.json())
            .then((response) => {
                if (response.hasOwnProperty('msg'))
                    setSend(true);
                if (response.hasOwnProperty('err'))
                    setSend(false);
            })

    };

    return (
        <>
            <Typography component='h5' variant='h5' align='center' padding='1rem'>
                Create a New Breed
            </Typography>
            <Box component='form' padding='1rem'>
                <TextField variant='outlined' label="Name" />
            </Box>
        </>
    )
};
