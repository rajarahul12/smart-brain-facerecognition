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


const particleOptions1={
  particles:{
    number:{
      value:100,
      density:{
        enable:true,
        value_area:900
      }
    }
  }
};

const particleOptions2={
  particles:{
    number:{
      value:40,
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
      box:[{
        leftCol:0,
        topRow:0,
        rightCol:0,
        bottomRow:0
        },  ],
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
    var boundaries=[];
    const array=data.outputs[0].data.regions;
    for(let i=0;i<array.length ; i++) {
      const clarifaiFace=array[i].region_info.bounding_box;
      const image=document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      let obj = {
        leftCol: clarifaiFace.left_col * width,
        topRow : clarifaiFace.top_row * height,
        rightCol : width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height) 
      }
      boundaries.push(obj);
    }
    return boundaries;
}
   
    

  //Displaying the box around faces
  displayFaceBox=(box)=>{
    this.setState({box:box});
  }

  //This is to update the input state whenever there is a change
  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }


  //After Button Submit
  onButtonSubmit=()=>{
    if(this.state.input === ""){
      
    }
    else{
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
      const boundaries=this.calculateFaceLocation(response);
      this.displayFaceBox(boundaries);
      })
    .catch(error => console.log(error));
  }
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
        {
          window.innerWidth < 500 ?
            <Particles className='particles'
            params={particleOptions2}
            />
          :
            <Particles className='particles'
            params={particleOptions1}
            />

        }
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        
        { route === 'home' 
        ? <div> 
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
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
