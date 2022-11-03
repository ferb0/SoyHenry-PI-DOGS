import React from "react";
import { Link } from "react-router-dom";

import '../../global/GlobalStyle.css';
import s from './Nav.module.css';

export default function Nav() {
  return (
    <div className={`${s.Nav} Global`}>
      <Link className={`${s.title}`} to='/'>NAV Titulo</Link>
    </div>
  );
}