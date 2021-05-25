var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// run when editing: npx babel --watch src --out-dir . --presets react-app/prod 

var defaultState = { break: 300, work: 1500, timer: 1500, status: "Work", running: false };

var Presentational = function (_React$Component) {
  _inherits(Presentational, _React$Component);

  function Presentational(props) {
    _classCallCheck(this, Presentational);

    var _this = _possibleConstructorReturn(this, (Presentational.__proto__ || Object.getPrototypeOf(Presentational)).call(this, props));

    _this.state = defaultState;
    _this.reset = _this.reset.bind(_this);
    _this.breakUp = _this.breakUp.bind(_this);
    _this.breakDown = _this.breakDown.bind(_this);
    _this.sessionUp = _this.sessionUp.bind(_this);
    _this.sessionDown = _this.sessionDown.bind(_this);
    _this.clockify = _this.clockify.bind(_this);
    _this.run = _this.run.bind(_this);
    _this.consolidateFunc = _this.consolidateFunc.bind(_this);
    _this.countDown = _this.countDown.bind(_this);
    _this.playAudio = _this.playAudio.bind(_this);
    _this.playPause = _this.playPause.bind(_this);
    return _this;
  }

  _createClass(Presentational, [{
    key: "reset",
    value: function reset() {
      this.setState(defaultState);
      clearInterval(this.intervalId);
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }, {
    key: "breakUp",
    value: function breakUp() {
      if (this.state.break < 3600) {
        if (this.state.status === "Break") {
          this.setState({ break: this.state.break + 60, timer: this.state.break + 60 });
        } else {
          this.setState({ break: this.state.break + 60 });
        }
      }
    }
  }, {
    key: "breakDown",
    value: function breakDown() {
      if (this.state.break > 60) {
        if (this.state.status === "Break") {
          this.setState({ break: this.state.break - 60, timer: this.state.break - 60 });
        } else {
          this.setState({ break: this.state.break - 60 });
        }
      }
    }
  }, {
    key: "sessionUp",
    value: function sessionUp() {
      if (this.state.work < 3600) {
        if (this.state.status === "Work") {
          this.setState({ work: this.state.work + 60, timer: this.state.work + 60 });
        } else {
          this.setState({ work: this.state.work + 60 });
        }
      } //could remove setting timer here so it does not increment the countdown, same for decrement
    }
  }, {
    key: "sessionDown",
    value: function sessionDown() {
      if (this.state.work > 60) {
        if (this.state.status === "Work") {
          this.setState({ work: this.state.work - 60, timer: this.state.work - 60 });
        } else {
          this.setState({ work: this.state.work - 60 });
        }
      }
    }
  }, {
    key: "clockify",
    value: function clockify() {
      var minutes = Math.floor(this.state.timer / 60);
      var seconds = this.state.timer % 60;
      if (minutes < 10 && seconds >= 10) {
        return "0" + minutes + ":" + seconds;
      } else if (minutes < 10 && seconds < 10) {
        return "0" + minutes + ":" + "0" + seconds;
      } else if (minutes >= 10 && seconds < 10) {
        return minutes + ":" + "0" + seconds;
      } else {
        return minutes + ":" + seconds;
      }
    }
  }, {
    key: "run",
    value: function run() {
      this.intervalId = setInterval(this.consolidateFunc, 1000);
    }
    //consolidate functions to pass to setInterval in run()

  }, {
    key: "consolidateFunc",
    value: function consolidateFunc() {
      this.countDown();
      this.playAudio();
    }
  }, {
    key: "countDown",
    value: function countDown() {
      this.setState({ timer: this.state.timer - 1 });
    }
  }, {
    key: "playAudio",
    value: function playAudio() {
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
  }, {
    key: "playPause",
    value: function playPause() {
      if (!this.state.running) {
        this.setState({ running: true });
        this.run();
      } else {
        this.setState({ running: false });
        clearInterval(this.intervalId);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "header" },
          React.createElement(
            "h1",
            null,
            "Pomodoro Clock"
          )
        ),
        React.createElement(
          "div",
          { className: "button-row" },
          React.createElement(
            "div",
            { className: "break-row" },
            React.createElement(
              "div",
              { id: "break-label" },
              "Set Break Time:"
            ),
            React.createElement(
              "div",
              { id: "break-length" },
              this.state.break / 60
            ),
            React.createElement(
              "button",
              { id: "break-decrement", onClick: this.breakDown, className: "btn btn-primary" },
              React.createElement("i", { className: "fa fa-arrow-down" })
            ),
            React.createElement(
              "button",
              { id: "break-increment", onClick: this.breakUp, className: "btn btn-primary" },
              React.createElement("i", { className: "fa fa-arrow-up" })
            )
          ),
          React.createElement(
            "div",
            { className: "work-row" },
            React.createElement(
              "div",
              { id: "session-label" },
              "Set Work Time:"
            ),
            React.createElement(
              "div",
              { id: "session-length" },
              this.state.work / 60
            ),
            React.createElement(
              "button",
              { id: "session-decrement", onClick: this.sessionDown, className: "btn btn-primary" },
              React.createElement("i", { className: "fa fa-arrow-down" })
            ),
            React.createElement(
              "button",
              { id: "session-increment", onClick: this.sessionUp, className: "btn btn-primary" },
              React.createElement("i", { className: "fa fa-arrow-up" })
            )
          ),
          React.createElement(
            "div",
            { className: "control-row" },
            React.createElement(
              "button",
              { id: "start_stop", onClick: this.playPause, className: "btn btn-primary" },
              React.createElement("i", { className: "fa fa-play" }),
              " / ",
              React.createElement("i", { className: "fa fa-pause" })
            ),
            React.createElement(
              "button",
              { id: "reset", onClick: this.reset, className: "btn btn-primary" },
              "Reset"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "display" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              { id: "timer-label" },
              this.state.status,
              " Time Remaining"
            ),
            React.createElement(
              "h2",
              { id: "time-left" },
              this.clockify()
            )
          )
        ),
        React.createElement(
          "div",
          { id: "audio" },
          React.createElement("audio", { id: "beep", ref: function ref(_ref) {
              return _this2.audio = _ref;
            }, src: "https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Electro%20and%20Synthetic/192[kb]clock_radio_alarm.wav.mp3", className: "clip" })
        )
      );
    }
  }]);

  return Presentational;
}(React.Component);

;
ReactDOM.render(React.createElement(Presentational, null), document.getElementById("app"));