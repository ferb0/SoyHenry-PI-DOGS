import { useParams } from "react-router-dom"

export default function BreedDetail() {
    const {id} = useParams();
    return (
        <h3>Detailbreed. {id}</h3>
    )
};