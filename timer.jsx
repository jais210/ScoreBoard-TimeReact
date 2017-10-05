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