import React from 'react';

const Navigation = ({ onRouteChange ,isSignedIn }) => {
		if(isSignedIn){
			return(
			<div>
				<nav style={{ display: 'flex' , justifyContent: 'flex-end'}} className='mt0 pt0'>
				<p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'> Sign Out </p>
				</nav>
			</div>
			)
			
		}
		else{
			return(
			<div>
				<nav style={{ display: 'flex' , justifyContent: 'flex-end'}} className='mt0 pt0'>
					<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'> Sign In </p>
					<p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'> Register </p>
				</nav>		
			</div>
			)
			
		}
		
}

export default Navigation;