import React from 'react';
import { Link } from 'react-router-dom';
import {
formatShortTitle,
formatDate} from '../../utils/Format';

const ChannelItem = ({
    video
}) => {

 
    return (
        <Link className = "channel-view__link" to = {`/watch/${video.snippet.resourceId.videoId}`}>
		<div className = "channel-view__imgbox">
			<img src = {video.snippet.thumbnails.high.url} alt = {video.snippet.title}  className = "channel-view__img"  />
		</div>
		<div className = "channel-view__infobox">    				
				<h2 className = "channel-view__title">{formatShortTitle(video.snippet.title)}</h2>
				<h3 className = "channel-view__publishdate">{formatDate(video.snippet.publishedAt)}</h3>    				
		</div>
	</Link>
    )
}

export default ChannelItem;