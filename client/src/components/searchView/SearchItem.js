import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import VideoContext from '../../stores/video/videoContext';

const SearchItem = ({ result }) => {
    const { setVideo, testVideo } = useContext(VideoContext);


    return (
        <li className="search-view__item">
                    <Link to = {`/watch/${result.id.videoId}`} className = "search-view__link" >
                        <div className = "search-view__imgbox">
                            <img className = "search-view__img" src={result.snippet.thumbnails.medium.url} alt={result.snippet.title}/>
                        </div>
                        <div className = "search-view__descriptionbox">
                            <h2 className = "search-view__title">{result.snippet.title}</h2>
                        <p className = "search-view__publishdate">1 day ago</p>
                        <h3  className = "search-view__channeltitle">{result.snippet.channelTitle}</h3>
                        <p  className = "search-view__description">{result.snippet.description}</p>
                        </div>
                    </Link>
         </li>
    )
}

export default SearchItem;