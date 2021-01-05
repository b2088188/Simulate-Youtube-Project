import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import {useLikeActions} from '../../stores/likes/likeActionContext';

import {
    Button,
    Header,
    Segment,
    TransitionablePortal,
} from 'semantic-ui-react';


const LikedItem = ({
    like
}) => {
    const { fetchLikes } = useLikeActions();
    const [open, setOpen] = useState(false);

    function onDeleteClick(id) {
        return function() {
            fetchLikes(id);
        }
    }


    return (
        <li className="liked-view__item">
      <TransitionablePortal    
      closeOnTriggerClick
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        openOnTriggerClick
        trigger={
            <button className = "liked-view__windowbtn" >                   
                <Icon  name='close' size = 'large'  />
            </button>          
        }
      >
           <Segment 
             style={{ left: '50%', position: 'absolute', top: '45%', zIndex: 1000 }}
             className = "liked-view__window"
           >
           <Header  className = "liked-view__windowtitle">Are you sure you want to remove from liked videos?</Header>          
          <button  className = "liked-view__deletebtn" onClick = {onDeleteClick(like.videoId)}>
            <Icon  name='trash' size = 'large'  />
            <span>Remove</span>
          </button>
        </Segment>
      </TransitionablePortal>
              <Link to = {`/watch/${like.videoId}`} className = "liked-view__link" >
                <div className = "liked-view__imgbox">
                  <img className = "liked-view__img" src = {like.image} alt = {like.title}/>
                </div>
                <div className = "liked-view__descriptionbox">
                  <h2 className = "liked-view__title">{like.title}</h2>                        
                  <h3  className = "liked-view__channeltitle">{like.channelTitle}</h3>
                </div>                
              </Link>
            
        </li>
    )
}

export default LikedItem;