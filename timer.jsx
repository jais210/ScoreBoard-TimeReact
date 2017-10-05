var contador = 0;
var fin_contador = 10; // Tiempo en en el que deseas que redireccione la funcion.
var iniciado = false;
function cuenta(){
    
 
if(contador >= fin_contador){
    window.location.href = "http://google.com.do"; 
}else{
     document.getElementById("contador").innerHTML  = "Redireccionando en " + fin_contador + " Seg";
         fin_contador = fin_contador - 1;
}
  
}
 function ini(){
 cuenta();
setInterval("cuenta()",1000);
  
}

class TemporalComponent extends React.Component {
  
  render () {
  return (
  <div>
  Hello { (new Date ()).toLocaleTimeString() }
  </div>
  );
  }
  
  }
  
  class Timer extends React.Component {
  constructor (props) {
  super (props);
  this.state = {
  date: new Date()
  }
  }
  render () {
  const {title} = this.props;
  const start = (e) => {
  this.startTimer();
  }
  const stop = (e) => {
  this.stopTimer();
  }
  return (
  <div>
  <h2> {title} </h2>
  
  <button onClick={start}> start </button>
  <button onClick={stop}> stop </button>
  
  <p> {this.state.date.toLocaleTimeString()}</p>
  
  <span> <TemporalComponent/> </span>
  </div>
  );
  }
  // componentDidMount
  startTimer () {
  this.timer = setInterval( () => {
  this.setState ({
  date : new Date()
  }) ;
  }, 1000);
  }
  //componentWillUnmount
  stopTimer () {
  clearInterval(this.timer);
  }
  }
    
  ReactDOM.render(< Timer title = "Timer"/>,
  document.getElementById("root"));