import React from 'react';
import {Link} from 'react-router-dom';

const SubscribeItem = ({
	subscribe
}) => {
	
	return (
     <li className = "subscription__item">
		<Link to = {`/channel/${subscribe.channelId}`} className = "subscription__link">
			<img src = {subscribe.image} alt = {subscribe.title} className = "subscription__image" />
			<h3 className = "subscription__title">{subscribe.title}</h3>
		</Link>
	</li>       
		)
}

export default SubscribeItem;