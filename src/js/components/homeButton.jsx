import React from 'react';

const HomeButton = ({redirect}) => (
	<div
		style={{cursor: 'pointer'}}
		onClick={() => redirect('/')}
		role="button"
		tabIndex="0"
		onKeyDown={() => {}}
	>
		Home
	</div>
);

export default HomeButton;
