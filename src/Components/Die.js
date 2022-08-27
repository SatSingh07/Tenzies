import "./Die.scss";

export default function Die(props) {

    return(
        <>
            <span
                className={`die ${props.held ? "held" : ""}`}
                id={props.id}
                onClick={props.clickEvent} >
                    {props.dieVal}
            </span>
        </>
    )
}