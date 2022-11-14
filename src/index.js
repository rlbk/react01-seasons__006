import React from "react";
import ReactDOM from "react-dom/client";
import SeasonDisplay from "./SeasonDisplay";
import Spiner from "./Spiner";
import "./style/App.css";

class App extends React.Component {
  state = { latitude: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ latitude: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  conditionRender() {
    if (this.state.errorMessage && !this.state.latitude) {
      return <h1>Error : {this.state.errorMessage}</h1>;
    }
    if (!this.state.errorMessage && this.state.latitude) {
      return <SeasonDisplay lat={this.state.latitude} />;
    }

    return <Spiner message="Please allow your location..!" />;
  }

  render() {
    return <div className="border red">{this.conditionRender()}</div>;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
