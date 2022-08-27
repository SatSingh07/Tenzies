import "./Intro.scss"

export default function Intro(props) {
    return (
        <>
            {props.tenzies && <h1 className="tenzies-title">Your score: <span>{props.attempts}</span></h1>}
            {!props.tenzies && 
                <>
                <h1 className="tenzies-title">{props.tenzies ?  "Well done!" : "Tenzies"}</h1>
                <p className="tenzies-text">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <p className="tenzies-count">Attempts: <span>{props.attempts}</span></p>
                </>
            }
        </>
    )
}