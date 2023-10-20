import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navbar'>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			{sessionUser ? (
				<>
					<input type="search" placeholder='Search'/>
					<ProfileButton user={sessionUser} />
				</>
			) : (
				<div>
					<NavLink to="/login">Log In</NavLink>
					<NavLink to="/signup">Sign Up</NavLink>
				</div>
			)}
		</div>
	);
}

export default Navigation;
