import React from "react";
import Nav from "../Nav/Nav.jsx";

import checker from "./controllers/checker.js";
import formatData from "./controllers/formatData.js";

import s from './CreateBreed.module.css';
import imageCreate from './images/createBreed.webp';

const { REACT_APP_API_BASE_URL } = process.env;

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

    fetch(REACT_APP_API_BASE_URL + `dogs`,
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
    <div>

      <Nav />

      <div className={`${s.Create} Global`}>
        <img className={`${s.img}`} src={imageCreate} alt="imagen" />

        <form className={`${s.form}`} onSubmit={handleSubmit}>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Nombre: </label>
            <input type='text' name="name" size="20" onChange={handleOnChange}></input>
            {input.name === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
          </div>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Altura mínima: </label>
            <input type='text' name="minHeight" size="20" onChange={handleOnChange}></input>
            {input.minHeight === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
          </div>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Altura máxima: </label>
            <input type='text' name="maxHeight" size="20" onChange={handleOnChange}></input>
            {input.maxHeight === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
          </div>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Peso Mínimo: </label>
            <input type='text' name="minWeight" size="20" onChange={handleOnChange}></input>
            {input.minWeight === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
          </div>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Peso máximo: </label>
            <input type='text' name="maxWeight" size="20" onChange={handleOnChange}></input>
            {input.maxWeight === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
          </div>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Años de vida mínimos: </label>
            <input type='text' name="minLifeSpan" size="20" onChange={handleOnChange}></input>
            {input.minLifeSpan === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
          </div>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Años de vida máximos: </label>
            <input type='text' name="maxLifeSpan" size="20" onChange={handleOnChange}></input>
            {input.maxLifeSpan === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
          </div>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Temperamentos: </label>
            <input type='text' name="temper" size="20" onChange={handleOnChange}></input>
            {input.temper === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
            <p className={`${s.msgDetail}`}>(Agregar temperamentos<br />separados por comas.)</p>
          </div>

          <button type="submit" disabled={!data}>Crear Raza</button>
          {send === undefined ?
            null
            :
            send ?
              <p>Datos enviados</p>
              :
              <p className={`msgError Global`}>Datos no cargados.</p>}
        </form>
      </div>
    </div>
  )
};