import "./App.css";
import Game from "./components/game/Game";
import React,{useState} from 'react';
import dohimg from "./assets/doh.png"



function App() {
  const [board, setBoard]= useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer]= useState('x');

 
  

  return (
    <section className='conatiner mx-auto p-8'>
      <h1 className='title text-4xl font-bold mb-4 text-center simpsonfont text-amber-400'> Tic Tac</h1>
      <img id="dohimg" src={dohimg} alt="doh" />
      <div className="board grid grid-cols-3 gap-4"></div>
      <Game/>
     
      
    </section>
  );
}

export default App
