import React from "react";
import checker from "./checker.js";

import formatData from "./formatData.js";

import s from './CreateBreed.module.css';
import imageCreate from './images/createBreed.webp';

export default function Createbreed() {
  const [input, setInput] = React.useState({
    name: "",
    maxHeight: "",
    minHeight: "",
    maxWeight: "",
    minWeight: "",
    minLifeSpan: "",
    maxLifeSpan: "",
    temper: []
  });

  const [error, setError] = React.useState({
    name: false,
    maxHeight: false,
    minHeight: false,
    maxWeight: false,
    minWeight: false,
    minLifeSpan: false,
    maxLifeSpan: false,
    temper: false
  });

  // Error cuando se envia los datos al server.
  const [send, setSend] = React.useState(undefined);
  // Para verificar que no se encien datos vacios.
  const [errorDataToSend, setErrorDataToSend] = React.useState(undefined);

  function handleOnChange(event) {
    setError({
      ...error,
      [event.target.name]: checker(event.target.name, event.target.value)
    });

    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    let data = formatData(input);

    if (data) {
      setErrorDataToSend(false);
      fetch(`http://localhost:3001/dogs`,
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
    }
    else
      setErrorDataToSend(true);
  };

  return (
    <div className={`${s.Create} Global`}>
      <img className={`${s.img}`} src={imageCreate} alt="imagen" />

      <form className={`${s.form}`} onSubmit={handleSubmit}>

        <div className={`${s.elementForm}`}>
          <label className={`${s.label}`}>Nombre: </label>
          <input type='text' name="name" size="20" onChange={handleOnChange}></input>
          {error.name ? <p className={`${s.msgError} Global`}>Formato inadecuado.</p> : null}
        </div>

        <div className={`${s.elementForm}`}>
          <label className={`${s.label}`}>Altura mínima: </label>
          <input type='text' name="minHeight" size="20" onChange={handleOnChange}></input>
          {error.minHeight ? <p className={`${s.msgError} Global`}>Formato inadecuado.</p> : null}
        </div>

        <div className={`${s.elementForm}`}>
          <label className={`${s.label}`}>Altura máxima: </label>
          <input type='text' name="maxHeight" size="20" onChange={handleOnChange}></input>
          {error.maxHeight ? <p className={`${s.msgError} Global`}>Formato inadecuado.</p> : null}
        </div>

        <div className={`${s.elementForm}`}>
          <label className={`${s.label}`}>Peso Mínimo: </label>
          <input type='text' name="minWeight" size="20" onChange={handleOnChange}></input>
          {error.minWeight ? <p className={`${s.msgError} Global`}>Formato inadecuado.</p> : null}
        </div>

        <div className={`${s.elementForm}`}>
          <label className={`${s.label}`}>Peso máximo: </label>
          <input type='text' name="maxWeight" size="20" onChange={handleOnChange}></input>
          {error.maxWeight ? <p className={`${s.msgError} Global`}>Formato inadecuado.</p> : null}
        </div>

        <div className={`${s.elementForm}`}>
          <label className={`${s.label}`}>Años de vida mínimos: </label>
          <input type='text' name="minLifeSpan" size="20" onChange={handleOnChange}></input>
          {error.minLifeSpan ? <p className={`${s.msgError} Global`}>Formato inadecuado.</p> : null}
        </div>

        <div className={`${s.elementForm}`}>
          <label className={`${s.label}`}>Años de vida máximos: </label>
          <input type='text' name="maxLifeSpan" size="20" onChange={handleOnChange}></input>
          {error.maxLifeSpan ? <p className={`${s.msgError} Global`}>Formato inadecuado.</p> : null}
        </div>

        <div className={`${s.elementForm}`}>
          <label className={`${s.label}`}>Temperamentos: </label>
          <input type='text' name="temper" size="20" onChange={handleOnChange}></input>
          {error.temper ? <p className={`${s.msgError} Global`}>Formato inadecuado.</p> : null}
          <p className={`${s.msgDetail}`}>(Agregar temperamentos<br/>separados por comas.)</p>
        </div>

        <button type="submit">Crear Raza</button>
        {send === undefined ?
          null
          :
          send ?
            <p>Datos enviados</p>
            :
            <p className={`${s.msgError} Global`}>Datos no cargados.</p>}

        {errorDataToSend ? <p className={`${s.msgError} Global`}>Faltan datos.</p> : null}
      </form>
    </div>
  )
};