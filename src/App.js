import React, { Component } from "react";
import Particle from "./components/Particle/Particle";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";
import "./App.css";
const initialState = {
  input: "",
  imageUrl: "",
  box: [
    {
      leftCol: 0,
      topRow: 0,
      rightCol: 0,
      bottomRow: 0
    }
  ],
  route: "signin",
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  //ComponentDidMount for checking the seesions
  componentDidMount() {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data && data.id) {
            fetch(`http://localhost:3000/profile/${data.id}`, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            })
              .then(res => res.json())
              .then(user => {
                if (user && user.email) {
                  this.loadUser(user);
                  this.onRouteChange("home");
                }
              });
          }
        })
        .catch(err => console.log(err));
    }
  }
  //Updating User Data
  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  //For Calculating the Box Co-ordinates
  calculateFaceLocation = data => {
    if (data && data.outputs) {
      var boundaries = [];
      const array = data.outputs[0].data.regions;
      for (let i = 0; i < array.length; i++) {
        const clarifaiFace = array[i].region_info.bounding_box;
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);
        let obj = {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height
        };
        boundaries.push(obj);
      }
      return boundaries;
    }
    return;
  };

  //Displaying the box around faces
  displayFaceBox = box => {
    if (box) {
      this.setState({ box: box });
    }
  };

  //This is to update the input state whenever there is a change
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  //After Button Submit
  onButtonSubmit = () => {
    if (this.state.input === "") {
    } else {
      this.setState({ imageUrl: this.state.input });
      fetch("http://localhost:3000/imageUrl", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: window.sessionStorage.getItem("token")
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response) {
            fetch("http://localhost:3000/image", {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Authorization: window.sessionStorage.getItem("token")
              },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(
                  Object.assign(this.state.user, {
                    entries: count
                  })
                );
              })
              .catch(console.log);
          }
          const boundaries = this.calculateFaceLocation(response);
          this.displayFaceBox(boundaries);
        })
        .catch(error => console.log(error));
    }
  };

  //On Route change to know where the user is
  onRouteChange = route => {
    if (route === "signout") {
      return this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  //Toggle Modal
  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  };

  render() {
    const {
      imageUrl,
      box,
      route,
      isSignedIn,
      isProfileOpen,
      user
    } = this.state;
    return (
      <div className="App">
        <Particle />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal}
        />
        {isProfileOpen && (
          <Modal>
            <Profile
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
              user={user}
              loadUser={this.loadUser}
            />
          </Modal>
        )}
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <div>
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        ) : (
          <div>
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
