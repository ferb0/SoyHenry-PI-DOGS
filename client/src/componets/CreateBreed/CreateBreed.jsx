import React from "react";

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

    function handleOnChange(event) {
        setInput({
          ...input,
          [event.target.name]: event.target.value
        });
      };

      function handleSubmit(e) {
        e.preventDefault();
        // Se le da formato para enviar.
        let data = {
            name: input.name,
            height: [input.minHeight,input.maxHeight ],
            weight: [input.minWeight, input.maxWeight],
            lifeSpan: [input.minLifeSpan, input.maxLifeSpan],
            temper: input.temper.replace(/\s/g, '').split(',')
        };

        fetch(`http://localhost:3001/dogs`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
      };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nombre: </label>
            <input type='text' name="name" onChange={handleOnChange}></input>
            <br/>
            <label>Altura mínima: </label>
            <input type='text' name="minHeight" onChange={handleOnChange}></input>
            <br/>
            <label>Altura máxima: </label>
            <input type='text' name="maxHeight" onChange={handleOnChange}></input>
            <br/>
            <label>Peso Mínimo: </label>
            <input type='text' name="minWeight" onChange={handleOnChange}></input>
            <br/>
            <label>Peso máximo: </label>
            <input type='text' name="maxWeight" onChange={handleOnChange}></input>
            <br/>
            <label>Años de vida mínimos: </label>
            <input type='text' name="minLifeSpan" onChange={handleOnChange}></input>
            <br/>
            <label>Años de vida máximos: </label>
            <input type='text' name="maxLifeSpan" onChange={handleOnChange}></input>
            <br/>
            <label>Temperamentos: </label>
            <input type='text' name="temper" onChange={handleOnChange}></input>
            {/* {Verificar duplicados} */}
            <p>Agregar separados por comas</p>
            <br/>
            <button type="submit">Crear Raza</button>

        </form>
    )
};