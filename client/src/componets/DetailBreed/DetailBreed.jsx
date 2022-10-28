import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreed, cleanBreed } from '../../redux/actions.js'

export default function DetailBreed(props) {
    const dispatch = useDispatch();
    const { breed, loading } = useSelector(state => {
        return {
            breed: state.breed,
            loading: state.loadingBreed
        }
    });

    React.useEffect(() => {
        dispatch(getBreed(props.match.params.id))
        return function () {
            dispatch(cleanBreed());
        }
    }, []);

    return (
        <div>
            {loading ? 
            <p>Cargando...</p> :
            <div>
            <div>{breed.name}</div>
            <div>{breed.weight}</div>
            <div>{breed.height}</div>
            <div>{breed.life_span}</div>
            <div>{breed.temper}</div>
            <img src={breed.img} alt="img" />
            </div>}
        </div>
    );
};