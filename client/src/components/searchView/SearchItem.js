import React, { useContext } from 'react';
import { Link } from 'react-router-dom';


const SearchItem = ({ result }) => {
  

    return (
        <li className="search-view__item">
                    <Link to = {`/watch/${result.videoId}`} className = "search-view__link" >
                        <div className = "search-view__imgbox">
                            <img className = "search-view__img" src={result.images} alt={result.title}/>
                        </div>
                        <div className = "search-view__descriptionbox">
                            <h2 className = "search-view__title">{result.title}</h2>
                        <p className = "search-view__publishdate">{result.publishedAt}</p>
                        <h3  className = "search-view__channeltitle">{result.channel.title}</h3>
                        <p  className = "search-view__description">{result.description}</p>
                        </div>
                    </Link>
         </li>
    )
}

export default SearchItem;