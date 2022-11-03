import { Link } from 'react-router-dom';

import '../../global/GlobalStyle.css';
import s from './SummaryBreed.module.css';

export default function SummaryBreed(props) {
  return (
    <div className={`${s.summary} Global`}>
      <h4><Link to={`/breed/${props.id}`}>{props.name}</Link></h4>
      <p>Peso: {props.weight[0]}Kg - {props.weight[1]}Kg.</p>
      <img className={`${s.img}`}src={props.img} alt={'img'} />
      {props.temper ?
        <div>
          <p>Temperamentos:</p>
          <ul>
            {props.temper.map((el, i) => {
              return (<li key={i}>{el}</li>);
            })}
          </ul>
        </div>
        :
        <p>Sin Temperamentos.</p>}
    </div>
  );
};