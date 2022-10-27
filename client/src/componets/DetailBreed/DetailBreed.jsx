import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreed } from '../../redux/actions.js'

export default function DetailBreed(props) {
    const dispatch = useDispatch();
    const breed = useSelector(state => state.breed);

    React.useEffect(() => {
        dispatch(getBreed(props.match.params.id))
    }, []);

    return (
        <div>
            <div>{breed.name}</div>
            <div>{breed.weight}</div>
            <div>{breed.height}</div>
            <div>{breed.life_span}</div>
            <div>{breed.temper}</div>
            <img src={breed.img} alt="img" />
        </div>
    );
};