import React, { useState } from 'react';
import './Game.css';


const Game = () => {
    const [turn, setTurn] = useState('x');
    const [position, setPosition] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState();

    const checkForWinner = (squares) => {
        // checks for winning patterns
        let combinations = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            diagnol: [
                [0, 4, 8],
                [2, 4, 6],
            ],
            down: [
                [2, 5, 8],
                [1, 4, 7],
                [0, 3, 6],
            ],
        };

        for (let combination in combinations) {
            combinations[combination].forEach((pattern) =>{
            
            if(
                squares[pattern[0]] === '' ||
                squares[pattern[1]] === '' ||
                squares[pattern[2]] === ''
            ){
                // do not do anything
            } else if (
                squares[pattern[0]] === squares[pattern[1]] &&
                squares[pattern[1]] === squares[pattern[2]]
            ){
                setWinner(squares[pattern[0]]);
            }
        });
    }
    };
    const handleClick = (num) => {
        if (position[num] !== '') {
            alert('Try Again, already clicked.');
            return;
        }
        let squares = [...position];

        if (turn ==='x') {
            squares[num] = 'x';
            setTurn('o');
        }else {
            squares[num] = 'o';
            setTurn('x');
        }
        checkForWinner(squares);
        setPosition(squares);
    };
    const handlePlayAgain = () => {
        setWinner(null);
        setPosition(Array(9).fill(''));
    };
    const Cell = ({num}) => {
        return <td onClick={() => handleClick(num)}></td>
    };

    return (
        <section className='container flex flex-col justify-center items-center'>
            <table className='border-black table-auto'>
                Turn: {turn}
                <tbody>
                    <tr>
                        <Cell num={0} />
                        <Cell num={1} />
                        <Cell num={2} />
                    </tr>
                    <tr>
                        <Cell num={3} />
                        <Cell num={4} />
                        <Cell num={5} />                    
                    </tr>
                    <tr>
                        <Cell num={6} />
                        <Cell num={7} />
                        <Cell num={8} />                    
                    </tr>
                </tbody>
            </table>
            {winner && (
                <>
                    <p>{winner} is the winner!</p>
                    <button onClick={() => handlePlayAgain()}>Play Again</button>
                </>
            )}

        </section>
    );

};

export default Game;