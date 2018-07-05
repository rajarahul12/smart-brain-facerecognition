import React,{Component} from 'react';

class Signin extends Component{
	constructor(props){
		super(props);
		this.state = {
			signInEmail:"",
			signInPassword:""
		}
	}

	onEmailChange=(event)=>{
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange=(event)=>{
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = () =>{
		fetch('https://gorgeous-mesa-verde-76417.herokuapp.com/signin',{
			method:'post',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				email:this.state.signInEmail,
				password:this.state.signInPassword
			})
		})
		.then(res => res.json())
		.then(user => {
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
			else if(user === "incorrect form submission"){
				document.getElementById('err').textContent="Invalid Credentials";
				setTimeout(()=> {
					document.getElementById('err').textContent="";
				} ,3000);
			}
		})
		.catch(err => console.log(err));

		;
	}

	render(){
		const{onRouteChange}=this.props;
		return(
				<div>
				<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
					<div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
					      <div className="mt3" id="err" style={{background:'red'}}></div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
					        <input onChange={this.onEmailChange}
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="email" name="email-address"  id="email-address" />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
					        <input onChange={this.onPasswordChange}
					        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="password" name="password"  id="password" />
					      </div>
					    </fieldset>
					    <div className="">
					      <input 
					      onClick={this.onSubmitSignIn}
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      type="submit" 
					      value="Sign in" />
					    </div>
					    <div className="lh-copy mt3">
					      <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
					    </div>
					    <div className="mv4">
					    	<p><span style={{color:'red'}}>*</span>Your details are encrypted and safe with us</p>
					    </div>
					  </div>
					</main>
				</article>
				</div>
		)
	}
} 

export default Signin;