import "./App.css";
import Game from "./components/game/Game";
import io from "socket.io-client";
const socket = io('http://localhost:4000');

function App() {
  return (
    <section className="App">
      <Game />
    </section>
  );
}

export default App;
