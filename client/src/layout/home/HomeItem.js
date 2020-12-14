import React from 'react';
import { Link } from 'react-router-dom';
import { formatShortTitle } from '../../utils/Format';

const HomeItem = ({
    video
}) => {
    return (
        <div className = "home-view__content">
    		<Link className = "home-view__link"  to = {`/watch/${video.videoId}`}>
    			<div className = "home-view__imgbox">
    				<img src = {video.videoImage} alt = {video.title}  className = "home-view__img"  />
    			</div>
    			<div className = "home-view__infobox">
    				<img src = {video.channelImage}  className = "home-view__infoimg" />
    				<div className = "home-view__info">
    					<h2 className = "home-view__title">{formatShortTitle(video.title)}</h2>
    					<h3 className = "home-view__channeltitle">{video.channelTitle}</h3>
    				</div>
    			</div>
    		</Link>
    	</div>
    )
}

export default HomeItem;