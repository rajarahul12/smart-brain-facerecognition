import React,{Component} from 'react';

class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			email:"",
			password:"",
			name:""
		}
	}

	onNameChange=(event)=>{
		this.setState({name:event.target.value});
	}

	onEmailChange=(event)=>{
		this.setState({email: event.target.value});
	}

	onPasswordChange=(event)=>{
		this.setState({password: event.target.value});
	}

	onSubmitRegister = () =>{
		fetch('https://gorgeous-mesa-verde-76417.herokuapp.com/register',{
			method:'post',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				email:this.state.email,
				password:this.state.password,
				name:this.state.name
			})
		})
		.then(res => res.json())
		.then(user => {
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		});
	}

	render(){
		return(
				<div>
				<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
					<main className="pa4 black-80">
					<div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
					        <input onChange={this.onNameChange}
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="text" 
					        name="name"  
					        id="name" />
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input onChange={this.onEmailChange}
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="email" 
					        name="email-address"  
					        id="email-address" />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input onChange={this.onPasswordChange}
					        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="password" 
					        name="password"  
					        id="password" />
					      </div>
					    </fieldset>
					    <div className="">
					      <input 
					      onClick={this.onSubmitRegister}
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      type="submit" 
					      value="Register" />
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

export default Register;