export default function SummaryBreed(props) {
    return (
      <div className="SummaryBreed">
        <h3>Sumary</h3>
        <p>{props.name}</p>
        <p>{props.weight}</p>
        <p>{props.img}</p>
        <ul>{props.temper?.map((el, i) => {
          return (<li key={i}>{el}</li>);
        })}</ul>
      </div>
    );
  };