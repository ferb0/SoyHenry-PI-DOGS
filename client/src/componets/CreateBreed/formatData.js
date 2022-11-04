export default function formatData(input) {
    // Se le da formato para enviar.

    if (!input.name || !input.minHeight || !input.maxHeight || !input.minWeight || !input.maxWeight || !input.minLifeSpan || !input.maxLifeSpan || !input.temper){
        return false;
    }

    //Para quitar temper vacios
    let temper = input.temper?.replace(/\s/g, '').split(',').filter(el => el !== "");

    return {
        name: input.name,
        height: [input.minHeight, input.maxHeight],
        weight: [input.minWeight, input.maxWeight],
        lifeSpan: [input.minLifeSpan, input.maxLifeSpan],
        temper
    };
}