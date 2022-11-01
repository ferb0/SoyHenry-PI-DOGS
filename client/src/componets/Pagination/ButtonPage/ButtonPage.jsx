export default function ButtonPage(props) {
    return (
        <button value={props.value} onClick={props.handleClick}>{props.value}</button>
    )
};