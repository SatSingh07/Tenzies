import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./Main.scss";
import Intro from "./Intro";
import Die from "./Die";
import Confetti from "react-confetti";

export default function Main() {

    /*** Initialise Random Dice ***/

    const [dice, setDice] = useState( () => randomiseDice() );

    
    const showRandomDice = dice.map( number =>
        <Die key={number.id}
        id={number.id}
        dieVal={number.value}
        held={number.held}
        clickEvent={ () => holdDice(number.id) }
        />
    )
    
    /*** End Initialise Random Dice ***/
    
    
    /*** Gnerate & Randomise Dice ***/
    
    function generateDice() {
        return {
            id: nanoid(),
            value: Math.floor( Math.random() * 6 + 1 ),
            held: false
        }
    }

    function randomiseDice() {
        let randomNumbers = []

        for( let i = 0; i < 10; i++ ) {
            randomNumbers.push( generateDice() )
        }
        return randomNumbers
    }

    /*** End Gnerate & Randomise Dice ***/
    
    
    /*** Roll Dice ***/
    const [rollCount, setRollCount] = useState(0);

    function rollDice() {
        if(!tenzies) {
            setDice( prevDice => prevDice.map( number => {
                return number.held ? number : generateDice()
            }))   
            setRollCount(prevRollCount => prevRollCount + 1)
        } else {
            setTenzies(false)
            setDice(randomiseDice())
            setRollCount(0)
        }
    }

    /*** End Roll Dice ***/
    
    
    /*** Hold Dice ***/

    function holdDice(id) {
        setDice( prevDice => prevDice.map( number => {
            return number.id === id ? {...number, held: !number.held} : number
        }))
    }

    /*** End Hold Dice ***/
    
    
    /*** Tenzies State ***/

    const [tenzies, setTenzies] = useState(false);

    useEffect( () => {
        const allHeld = dice.every( die => die.held )
        const allValuesMatch = dice.every(die => die.value === dice[0].value )

        if(allHeld && allValuesMatch) {
            setTenzies(true)
        }
    }, [dice])

    /*** End Tenzies State ***/
    
    
    /*** Render Component ***/

    return (
        <div className="tenzies">
            <div className="tenzies__inner">
                <Intro tenzies={tenzies} attempts={rollCount}/>

                <div className="dice">
                    {showRandomDice}
                </div>

                <button className="roll-dice" onClick={rollDice}>
                    {tenzies ? "Start new game" : "Roll"}
                </button>
            </div>

            {tenzies && <Confetti />}
        </div>
    )
}
