import { Link } from "react-router-dom";

import paws from './images/paws.png';

export default function LandingPage() {

    return (
        <div>
        <Link to='/principal'>InfoDog</Link>
        <img src={paws} alt="paws" />
        </div>
    )
};