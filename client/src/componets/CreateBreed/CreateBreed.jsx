import React from "react";
import Nav from "../Nav/Nav.jsx";

import checker from "../../controllers/controllers/checker.js";
import formatData from "../../controllers/controllers/formatData.js";

import s from './CreateBreed.module.css';
import imageCreate from '../../global/images/paws.png';

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
    <div>

      <Nav />

      <div className={`${s.Create} Global`}>
        {input.img ?
          <img className={`${s.img}`} src={input.img} alt="imagen" />
          :
          <img className={`${s.img}`} src={imageCreate} alt="imagen" />}

        <form className={`${s.form}`} onSubmit={handleSubmit}>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Nombre: </label>
            <input type='text' name="name" onChange={handleOnChange} placeholder={'Nombre'}></input>
            {input.name === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
          </div>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Altura: </label>
            <input className={`${s.input}`} type='text' name="minHeight" onChange={handleOnChange} placeholder={'Mín'}></input>
            <input className={`${s.input}`} type='text' name="maxHeight" onChange={handleOnChange} placeholder={'Máx'}></input>
            {input.minHeight === false || input.maxHeight === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
          </div>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Peso: </label>
            <input className={`${s.input}`} type='text' name="minWeight" onChange={handleOnChange} placeholder={'Mín'}></input>
            <input className={`${s.input}`} type='text' name="maxWeight" onChange={handleOnChange} placeholder={'Máx'}></input>
            {input.minWeight === false || input.maxWeight === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
          </div>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Años de vida: </label>
            <input className={`${s.input}`} type='text' name="minLifeSpan" onChange={handleOnChange} placeholder={'Mín'}></input>
            <input className={`${s.input}`} type='text' name="maxLifeSpan" onChange={handleOnChange} placeholder={'Máx'}></input>
            {input.minLifeSpan === false || input.maxLifeSpan === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
          </div>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Imágen <p className={`${s.msgDetail} ${s.msgDetailOptional}`}>(Opcional.)</p>: </label>
            <input type='text' name="img" onChange={handleOnChange} placeholder={'URL Imágen'}></input>
            {input.img === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
          </div>

          <div className={`${s.elementForm}`}>
            <label className={`${s.label}`}>Temperamentos: </label>
            <input type='text' name="temper" onChange={handleOnChange} placeholder={'Temperamentos'}></input>
            {input.temper === false ? <p className={`msgError Global`}>Formato inadecuado.</p> : null}
            <p className={`${s.msgDetail}`}>(Agregar temperamentos<br />separados por comas.)</p>
          </div>

          <button type="submit" className={`${s.submitButton}`} disabled={!data}>Crear Raza</button>
          {data === false ? <p className={`msgError Global`}>Un valor mínimo es mayor que su máximo.</p> : null}
          {send === undefined ?
            null
            :
            send ?
              <p className={`${s.msgLoad}`}>Datos enviados.</p>
              :
              <p className={`msgError Global`}>Datos no cargados.</p>}
        </form>
      </div>
    </div>
  )
};