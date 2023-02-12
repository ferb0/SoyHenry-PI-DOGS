export default function formatData(input) {
    // Se le da formato para enviar.

    if (!input.name || !input.minHeight || !input.maxHeight || !input.minWeight || !input.maxWeight || !input.minLifeSpan || !input.maxLifeSpan || !input.temper || input.temper.length === 0) {
        return undefined;
    }

    if (!Array.isArray(input.temper?.replace(/\s/g, '').split(',')))
        return undefined;

    if (input.minHeight > input.maxHeight || input.minWeight > input.maxWeight || input.minLifeSpan > input.maxLifeSpan)
        return false;

    return {
        name: input.name,
        height: [input.minHeight, input.maxHeight],
        weight: [input.minWeight, input.maxWeight],
        lifeSpan: [input.minLifeSpan, input.maxLifeSpan],
        img: input.img,
        // Filter para quitar temper vacios
        temper: input.temper?.replace(/\s/g, '').split(',').filter(el => el !== "")
    };
}