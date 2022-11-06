export default function checker(parameter, value) {
    // Retorna true si no es correcto
    
    if (value && parameter === "name" && !value.match(/^[a-z ]+$/i))
        return false;
    else if (value && parameter === "temper" && !value.match(/^[a-z ,]+$/i)) 
        return false;
    else if (value &&  (parameter.includes('min') || parameter.includes('max')) && !value.match(/^[0-9]+$/))
        return false;
    else
        return value;
};