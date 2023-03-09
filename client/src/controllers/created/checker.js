export default function checker(parameter, value) {
    // Retorna true si hay un error
    if (value && parameter === "name" && !value.match(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$/i))
        return true;
    else if (value && parameter === "img" && !value.match(/^http/))
        return true;
    else if (value && parameter === "temper" && !value.match(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ,]+$/i))
        return true;
    else if (value && (parameter.includes('min') || parameter.includes('max')) && !value.match(/^[1-9]\d*$/))
        return true;
    else
        return false;
};
