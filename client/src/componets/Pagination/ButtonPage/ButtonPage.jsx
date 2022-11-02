export default function ButtonPage(props) {
    return (
        <button value={props.value} onClick={props.handleClick} disabled={props.disable}>{props.value}</button>
    )
};