import React from 'react';
import { Link } from 'react-router-dom';

const SubscribeItem = ({ subscribe }) => {
   return (
      <li className='subscription__item'>
         <Link to={`/channel/${subscribe.channel._id}`} className='subscription__link'>
            <img
               src={subscribe.channel.image}
               alt={subscribe.channel.title}
               className='subscription__image'
            />
            <h3 className='subscription__title'>{subscribe.channel.title}</h3>
         </Link>
      </li>
   );
};

export default SubscribeItem;
