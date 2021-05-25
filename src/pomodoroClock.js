// run when editing: npx babel --watch src --out-dir . --presets react-app/prod 

const defaultState = { break: 300, work: 1500, timer: 1500, status: "Work", running: false };

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.reset = this.reset.bind(this);
    this.breakUp = this.breakUp.bind(this);
    this.breakDown = this.breakDown.bind(this);
    this.sessionUp = this.sessionUp.bind(this);
    this.sessionDown = this.sessionDown.bind(this);
    this.clockify = this.clockify.bind(this);
    this.run = this.run.bind(this);
    this.consolidateFunc = this.consolidateFunc.bind(this);
    this.countDown = this.countDown.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.playPause = this.playPause.bind(this);
  }
  reset() {
    this.setState(defaultState);
    clearInterval(this.intervalId);
    this.audio.pause();
    this.audio.currentTime = 0;
  }
  breakUp() {
    if (this.state.break < 3600) {
      if (this.state.status === "Break") {
        this.setState({ break: this.state.break + 60, timer: this.state.break + 60 });
      } else {
        this.setState({ break: this.state.break + 60 });
      }
    }
  }
  breakDown() {
    if (this.state.break > 60) {
      if (this.state.status === "Break") {
        this.setState({ break: this.state.break - 60, timer: this.state.break - 60 });
      } else {
        this.setState({ break: this.state.break - 60 });
      }
    }
  }
  sessionUp() {
    if (this.state.work < 3600) {
      if (this.state.status === "Work") {
        this.setState({ work: this.state.work + 60, timer: this.state.work + 60 });
      } else {
        this.setState({ work: this.state.work + 60 });
      }
    }
  }
  sessionDown() {
    if (this.state.work > 60) {
      if (this.state.status === "Work") {
        this.setState({ work: this.state.work - 60, timer: this.state.work - 60 });
      } else {
        this.setState({ work: this.state.work - 60 });
      }
    }
  }
  clockify() {
    const minutes = Math.floor(this.state.timer / 60);
    const seconds = this.state.timer % 60;
    if (minutes < 10 && seconds >= 10) {
      return "0" + minutes + ":" + seconds;
    } else if (minutes < 10 && seconds < 10) {
      return "0" + minutes + ":" + "0" + seconds;
    } else  if (minutes >= 10 && seconds < 10) {
      return minutes + ":" + "0" + seconds;
    } else {
      return minutes + ":" + seconds;
    }
  }
  run() {
    this.intervalId = setInterval(this.consolidateFunc, 1000); 
  }
  //consolidate functions to pass to setInterval in run()
  consolidateFunc() {   
    this.countDown();
    this.playAudio();
  }
  countDown() {
    this.setState({ timer: this.state.timer - 1 });
  }
  playAudio() {
    if (this.state.status === "Work" && this.state.timer < 0) {
      this.audio.play();
      this.audio.currentTime = 0;
      this.setState({ status: "Break", timer: this.state.break });
    } else if (this.state.status === "Break" && this.state.timer < 0) {
      this.audio.play();
      this.audio.currentTime = 0;
      this.setState({ status: "Work", timer: this.state.work });
    }
  }
  playPause() {
    if (!this.state.running) {
      this.setState({ running: true });
      this.run();
    } else {
      this.setState({ running: false });
      clearInterval(this.intervalId);
    }
  }
  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Pomodoro Clock</h1>
        </div>
        <div className="button-row">
          <div className="break-row">
            <div id="break-label">Set Break Time:</div>
            <div id="break-length">{this.state.break / 60}</div>
            <button id="break-decrement" onClick={this.breakDown} className="btn btn-primary"><i className="fa fa-arrow-down"></i></button>
            <button id="break-increment" onClick={this.breakUp} className="btn btn-primary"><i className="fa fa-arrow-up"></i></button>
          </div>
          <div className="work-row">
            <div id="session-label">Set Work Time:</div>
            <div id="session-length">{this.state.work / 60}</div>
            <button id="session-decrement" onClick={this.sessionDown} className="btn btn-primary"><i className="fa fa-arrow-down"></i></button>
            <button id="session-increment" onClick={this.sessionUp} className="btn btn-primary"><i className="fa fa-arrow-up"></i></button>
          </div>
          <div className="control-row">
            <button id="start_stop" onClick={this.playPause} className="btn btn-primary"><i className={this.state.running ? "fa fa-pause" : "fa fa-play"}></i></button>
            <button id="reset" onClick={this.reset} className="btn btn-primary">Reset</button>
          </div>
        </div>
        <div className="display">
          <div>
            <p id="timer-label">{this.state.status} Time Remaining</p>
            <h2 id="time-left">{this.clockify()}</h2>
          </div>
        </div>
        <div id="audio">
          <audio id="beep" ref={ref => this.audio = ref} src="https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Electro%20and%20Synthetic/192[kb]clock_radio_alarm.wav.mp3" className="clip"></audio>
        </div>
      </div>
    )
  }
};
ReactDOM.render(<Presentational />, document.getElementById("app"));