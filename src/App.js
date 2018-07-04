import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import 'tachyons';


const particleOptions={
  particles:{
    number:{
      value:80,
      density:{
        enable:true,
        value_area:900
      }
    }
  }
};

const initialState ={
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
        id: "",
        name:'',
        email:"",
        password:'',
        entries:0,
        joined:'',
      }
}; 

class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }

  //Updating User Data
  loadUser=(data)=>{
    this.setState({user:{
        id: data.id,
        name:data.name,
        email:data.email,
        password:data.password,
        entries:data.entries,
        joined:data.joined,
    }})
  }

  //For Calculating the Box Co-ordinates
  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height), 
    }
  }

  //Displaying the box around faces
  displayFaceBox=(box)=>{
    console.log(box);
    this.setState({box:box});
  }

  //This is to update the input state whenever there is a change
  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }

  //After Button Submit
  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input});
    fetch('https://gorgeous-mesa-verde-76417.herokuapp.com/imageUrl',{
          method:'post',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              input:this.state.input,
           })
        })
    .then(response => response.json())
    .then(response => {
      if(response){
        fetch('https://gorgeous-mesa-verde-76417.herokuapp.com/image',{
          method:'put',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              id:this.state.user.id,
           })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user,{entries:count}));
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
      })
    .catch(error => console.log(error));
  }

  //On Route change to know where the user is
  onRouteChange = (route) => {
    if(route==='signout'){
      this.setState(initialState);
    }
    else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }

  render() {
    const { imageUrl , box , route , isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        
        { route === 'home' 
        ? <div> 
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box}  imageUrl={imageUrl}/>
          </div>
        : (
          route === 'signin' 
          ? <div>
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </div>
          : <div>
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
