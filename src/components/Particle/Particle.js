import React, { Component } from "react";
import Particles from "react-particles-js";

const particleOptions1 = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 900
      }
    }
  }
};

const particleOptions2 = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 900
      }
    }
  }
};

class Particle extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return (
      <div>
        {window.innerWidth < 500 ? (
          <Particles className="particles" params={particleOptions2} />
        ) : (
          <Particles className="particles" params={particleOptions1} />
        )}
      </div>
    );
  }
}

export default Particle;
