export default function checker(parameter, value) {

    if (value && parameter === "name" && !value.match(/^[a-z ]+$/i)) {
        return true;
    }
    else if (parameter === "temper" && !value.match(/^[a-z ,]+$/i)) {
        return true;
    }
    else if ((parameter.includes('min') || parameter.includes('max')) && !value.match(/^[0-9]+$/)){
        return true;
    }
    else {
        return false;
    }
};