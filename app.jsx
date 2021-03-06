"use strict";
// MODEL0
const AllPlayers = [
  // arreglo de objetos
  {
    name: "Jim Hokins",
    score: 31,
    id: 1
  },
  {
    name: "Andre Hokins",
    score: 35,
    id: 2
  },
  {
    name: "Elena Hokins",
    score: 42,
    id: 3
  }
];

class Model { // declaro mi clase, para luego acceder a ella
  constructor(players) { // método constructor crear e inicializar un objeto creado por una clase
    this.players = players; // players tiene a mi arreglo de objetos que será instanciado cuando se construya la clase con dicho parámetro
    this.inputValue = null;
  }

  notify(render) {
    // cada vez que se añada un nuevo elemento se actualiza el DOM virtual
    this.render();
  }

  subscribe(render) {
    this.render = render;
  }

  addPlayers(text) {
    this.players.push({
      name: text.value,
      score: 0,
      id: this.players.lenght + 1
    });
    text.value = "";
    this.notify();
  }

  score() {
    // recorro el arreglo para sacar de cada objeto solo su score
    return this.players.map(player => {
      return player.score;
    });
  }

  addScoreAllPlayers() {
    let allScore = this.score(this.players);
    return allScore.reduce((back, now) => {
      return back + now;
    });
  }
  down(player) {
    // decremento; el parámetro ingresado será el array de objetos
    player.score--;
    this.notify();
  }

  up(player) {
    // incremento; el parámetro ingresado será el array de objetos
    player.score++;
    this.notify();
  }
}
// Clase Especial 
class Timer extends React.Component {
  constructor() {
    super();
      this.state = {
      counter: 0      
    }
  }

  init(){
    this.addTime = setInterval(()=>{
      this.setState((prevState)=>({
        counter:prevState.counter +1
      }));
    }, 1000)
  
  }

  reset(){
    this.setState({
      counter: 0
    });
  }

  stop(){
    clearInterval(this.addTime);         
  }
  
 
  render() {
    return (
      <div className="stopwatch">
      <h2>STOPWATCH</h2>
      <div className="stopwatch-time">
       {this.state.counter}
      </div>
      <div>
        <button onClick={()=>this.init()}>
          <strong>START</strong>
        </button>
        <button onClick={()=>this.reset()}>
          <strong >RESET</strong>
        </button>
        <button onClick={()=>this.stop()}>
          <strong> STOP </strong> 
        </button>
      </div>
    </div>
    );
  }
}  


// VISTA
/**
 * Para mostrar el html con React creo las const(que son como funciones);
 * Aquí cambia la sintaxis
 */
const ShowPlayer = ({ player }) => {
  // player es mi array de objetos

  return model.player.map((p, i) => {
    return (
      <div className="player" key={player.id}>
        <div className="player-name">
          <center>
            <strong>{player.name}</strong>
          </center>
        </div>
        <div className="player-score counter">
          <div className="counter-action decrement">-</div>
          <div className="counter-score">{player.score}</div>
          <div className=" counter-action increment">+</div>
        </div>
      </div>
    );
  });
};
// etiquetas

const Header = ({ model }) => {
  return (
    <div className="header">
      <div className="stats">
        <table>
          <tr>
            <td>Players: </td>
            <td className="letter">
              <strong>{model.players.length}</strong>
            </td>
          </tr>
          <tr>
            <td>Total Points: </td>
            <td className="letter">
              <strong>{model.addScoreAllPlayers()}</strong>
            </td>
          </tr>
        </table>
      </div>
      <h1>
        <strong>{model.title}</strong>
      </h1>
      <Timer />
    </div>
  );
};

const List = ({ model }) => {
  return (
    <div>
      {model.players.map(player => {
        return <Player player={player} />;
      })}
    </div>
  );
};

const Player = ({ player }) => {
  return (
    <div className="player" key={player.id}>
      <div className="player-name">{player.name}</div>
      <div className="player-score counter">
        <button
          className="counter-action decrement"
          onClick={() => model.down(player)}
        >
          -
        </button>
        <span className="counter-score">{player.score}</span>
        <button
          className="counter-action increment"
          onClick={() => model.up(player)}
        >
          +
        </button>
      </div>
    </div>
  );
};

const Form = ({ model }) => {
  return (
    <div className="add-player-form">
      <form
        onSubmit={e => {
          e.preventDefault();
          model.addPlayers(model.inputValue);
        }}
      >
        <input
          type="text"
          placeholder="ENTER A NAME"
          onChange={e => (model.inputValue = e.target)}
        />
        <input type="submit" value="ADD PLAYER" />
      </form>
    </div>
  );
};
let model = new Model(AllPlayers);
let timer = new Timer();
// creo la etiqueta que contiene las demás etiquetas
const TableroScore = ({ title, model }) => {
  return (
    <div className="scoreboard">
      <Header model={model} title={title} />
      <List model={model} />
      <Form model={model} />
    </div>
  );
};
let render = () => {
  ReactDOM.render(
    <TableroScore title="Scoreboard" model={model} />,
    document.getElementById("container")
  );
};

model.subscribe(render);
render();
