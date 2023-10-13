
import React, { useState } from 'react';
import { Board } from './Board';
import { ResetButton} from './ResetButton';
import { ScoreBoard } from './ScoreBoard';
import '../../App.css';
import X from '../../assets/duff.png';
import O from '../../assets/donut.png';
import soundFile from "../../assets/homer-woohoo.mp3";
// import Game from "./components/game/Game";
// import homericon from './assets/IMG_2846.jpg'
// import lisaicon from './assets/IMG_2847.jpg'
// import margeicon from "./assets/IMG_2850.jpg"



const Game = () => {
    

        // checks for winning patterns
        const WIN_POSITIONS = 
            [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],          
                [0, 4, 8],
                [2, 4, 6],           
                [2, 5, 8],
                [1, 4, 7],
                [0, 3, 6],
            ]
            
            const [xPlayer, setXPlayer] = useState(true);
            const [gameboard, setGameboard] = useState(Array(9).fill(null))
            const [score, setScore] = useState({xScore: 0, oScore: 0})
            const [gameOver, setGameOver] = useState(false);

            const handleSquareClick = (squareIdx) => {
                const updateGameboard = gameboard.map((value, idx) =>{
                    if (idx === squareIdx) {
                        // change X and O go be images
                        return xPlayer ? <img src={X} data='X'/> : <img src={O} data='O'/>;
                    }else {
                        return value;
                    }
                })

                setGameboard(updateGameboard);

                // check for winner
                const winner = checkWinner(updateGameboard);

                if (winner){
                    if (winner === "O"){
                        let {oScore} = score;
                        oScore += 1;
                        setScore({...score, oScore})
                    }else{
                        let {xScore} = score;
                        xScore += 1;
                        setScore({...score, xScore})
                    }
                }
                // change who is playing
                setXPlayer(!xPlayer);

            }

            const checkWinner = (gameboard) => {
                for (let i = 0; i<WIN_POSITIONS.length; i++){
                    const [x, y, z] = WIN_POSITIONS[i];

                    // check for winning patterns
                    if (gameboard[x]?.props?.data && gameboard[x]?.props?.data === gameboard[y]?.props?.data && gameboard[y]?.props?.data === gameboard[z]?.props?.data) {
                        setGameOver(true);
                        return gameboard[x].props.data;
                    }
                }
            }

            const resetGameboard = () => {
                const audio = new Audio(soundFile);
                audio.play();
                setGameOver(false);
                setGameboard(Array(9).fill(null));
            }

            return(
                <section className='Game'>
                    <ScoreBoard score={score} xPlayer={xPlayer}/>
                    <Board gameboard ={gameboard} onClick={gameOver ? resetGameboard : handleSquareClick} />
                    <ResetButton resetGameboard={resetGameboard} />
                </section>
            );
}

export default Game;