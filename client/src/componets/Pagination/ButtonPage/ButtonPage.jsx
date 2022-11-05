import s from './ButtonPage.module.css';

export default function ButtonPage(props) {
    return (
        <button className={`${s.button}`} value={props.value} onClick={props.handleClick} disabled={props.disable}>{props.name}</button>
    )
};