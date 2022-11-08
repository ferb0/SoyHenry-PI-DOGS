import { Link } from "react-router-dom";

import s from './LandingPage.module.css';
import paws from './images/paws.png';

export default function LandingPage() {

    return (
        <div className={`${s.Landing} Global`}>

        <img className={`${s.img} Global`} src={paws} alt="paws" />
        <Link className={`${s.link} Global`} to='/principal'>InfoDog</Link>
        
        </div>
    )
};