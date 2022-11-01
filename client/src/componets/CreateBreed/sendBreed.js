export default function sendBreed(input) {
    // Se le da formato para enviar.
    let data = {
        name: input.name,
        height: [input.minHeight, input.maxHeight],
        weight: [input.minWeight, input.maxWeight],
        lifeSpan: [input.minLifeSpan, input.maxLifeSpan],
        temper: input.temper.replace(/\s/g, '').split(',')
    };

    fetch(`http://localhost:3001/dogs`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
}