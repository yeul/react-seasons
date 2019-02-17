import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

// class-based component

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported by your browser.");
    } else {
      navigator.geolocation.getCurrentPosition(
        position => this.setState({ lat: position.coords.latitude }),
        // to update state object we called setState!!!!
        // we did not!!!!!!
        // this.state.lat = position.coords.latitude
        err => this.setState({ errorMessage: err.message })
      );
    }
  }

  componentDidUpdate() {
    console.log("My component was just updated - it re-rendered!");
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    } else if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    } else {
      return <Spinner message="Please accept location request" />;
    }
  }

  // React says we have to define render!!
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));

// functional component example

// const App = () => {
//   if (!navigator.geolocation) {
//     console.log("Geolocation not supported by your browser.");
//   } else {
//     navigator.geolocation.getCurrentPosition(
//       position => console.log(position),
//       err => console.log(err)
//     );
//   }

//   return <div>Hi there!</div>;
// };