export default function checker(parameter, value) {
    // Retorna true si no es correcto
    
    if (value && parameter === "name" && !value.match(/^[a-z ]+$/i))
        return true;
    else if (value && parameter === "temper" && !value.match(/^[a-z ,]+$/i)) 
        return true;
    else if (value &&  (parameter.includes('min') || parameter.includes('max')) && !value.match(/^[0-9]+$/))
        return true;
    else
        return false;
};