import React, { Component } from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import brain from "./logo.png";
class Logo extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return (
      <div className="ma4">
        <Tilt
          className="Tilt br2 shadow-2"
          options={{ max: 50 }}
          style={{ height: 125, width: 125 }}
        >
          <div className="Tilt-inner pa3">
            {" "}
            <img src={brain} style={{ paddingTop: "3px" }} alt="logo" />{" "}
          </div>
        </Tilt>
      </div>
    );
  }
}

export default Logo;
