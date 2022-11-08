import React from "react";
import { Link } from "react-router-dom";

import s from './Nav.module.css';

export default function Nav() {
  return (
    <div className={`${s.Nav} Global`}>
      <Link className={`${s.title}`} to='/principal'>InfoDog</Link>
    </div>
  );
}