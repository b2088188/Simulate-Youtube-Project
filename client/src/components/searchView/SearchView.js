import './searchview.scss';
import * as R from 'ramda';
import React, { useEffect, Fragment } from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {useSearchState} from '../../stores/search/searchStateContext';
import {useSearchActions} from '../../stores/search/searchActionContext';
import SearchItem from './SearchItem';
import Pagination from './Pagination';
import Spinner from '../../utils/spinner/Spinner';
import axios from 'axios';
const SearchView = () => {
    const { videos, statusVideos } = useSearchState();
    const {fetchVideos} = useSearchActions();
    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);
    const q = searchParams.get('q');
    useEffect(() => {
        fetchVideos(axios.get(`/api/v1/videos?q=${q}`));
    }, [q])
// console.log(results)
//     function calcPage(list, page, resPerPage = 10) {
//         const start = (page - 1) * resPerPage;
//         const end = page * resPerPage;
//         return list.slice(start, end);
//     }

    function renderList(list) {
        return list?.map(function generateItem(result) {
            return (
                <Fragment key = {result._id}>
               <SearchItem result = {result} />
                </Fragment>
            )
        })
    }
//     const renderSearchList = R.pipe(calcPage, renderList);

    if (statusVideos === 'idle' || statusVideos === 'pending')
        return (
            <Spinner />
        )
    if(statusVideos === 'resolved')
    return (
        <div className = "search-view">
         <nav  className = "search-view__nav">
            <ul className="search-view__list">
                 {renderList (videos)}             
            </ul>
         </nav>  
         {/*results.length>1&&<Pagination />*/}       
      </div>
    )
}

export default SearchView;