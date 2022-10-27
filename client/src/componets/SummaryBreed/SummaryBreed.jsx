import {Link} from 'react-router-dom';

export default function SummaryBreed(props) {
    return (
      <div className="SummaryBreed">
        <h3>Sumary</h3>
        <Link to={`/breed/${props.id}`}>{props.name}</Link>
        <p>{props.weight}</p>
        <p>{props.img}</p>
        <ul>{props.temper?.map((el, i) => {
          return (<li key={i}>{el}</li>);
        })}</ul>
      </div>
    );
  };