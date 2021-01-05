import React from 'react';
import { Link } from 'react-router-dom';
import {
formatShortTitle,
formatDate} from '../../utils/Format';

const ChannelItem = ({
    video
}) => {

 
    return (
        <Link className = "channel-view__link" to = {`/watch/${video.videoId}`}>
		<div className = "channel-view__imgbox">
			<img src = {video.images} alt = {video.title}  className = "channel-view__img"  />
		</div>
		<div className = "channel-view__infobox">    				
				<h2 className = "channel-view__title">{formatShortTitle(video.title)}</h2>
				<h3 className = "channel-view__publishdate">{formatDate(video.publishedAt)}</h3>    				
		</div>
	</Link>
    )
}

export default ChannelItem;