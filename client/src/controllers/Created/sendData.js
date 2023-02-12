const { REACT_APP_API_BASE_URL } = process.env;

export default async function sendData(data) {
    let response = await fetch(
        REACT_APP_API_BASE_URL + `/dogs`,
    {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    return(response.json());
};