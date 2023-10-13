import "./App.css";
import Game from "./components/game/Game";
import React,{useState} from 'react';
import soundFile from "./assets/homer-woohoo.mp3";


function App() {
  const [board, setBoard]= useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer]= useState('x');

  function playSound() {
    const audio = new Audio(soundFile);
    audio.play();
  }

  return (
    <section className='conatiner mx-auto p-8'>
      <h1 className='title text-4xl font-bold mb-4'> Tic Tac Doh!</h1>
      <div className="board grid grid-cols-3 gap-4"></div>
      <button 
      onClick={playSound}
      className='reset bg-yellow-300 text-3xl text-center p-4 cursor-pointer'>Reset</button>

      
      
    </section>
  );
}

export default App;
