import './searchview.scss';
import * as R from 'ramda';
import React, { useEffect, useContext, Fragment } from 'react';
import SearchContext from '../../stores/search/searchContext';
import SearchItem from './SearchItem';
import Pagination from './Pagination';
import Spinner from '../../utils/spinner/Spinner';

const SearchView = ({
    match
}) => {
    const { search, results, page, loading } = useContext(SearchContext);
    useEffect(() => {
        search(match.params.term);
    }, [match.params.term])

    function calcPage(list, page, resPerPage = 10) {
        const start = (page - 1) * resPerPage;
        const end = page * resPerPage;
        return list.slice(start, end);
    }

    function renderList(list) {
        return list.map(function generateItem(result) {
            return (
                <Fragment key = {result.id.videoId}>
               <SearchItem result = {result} />
            </Fragment>
            )
        })
    }
    const renderSearchList = R.pipe(calcPage, renderList);

    if (loading)
        return (
            <Spinner />
        )

    return (
        <div className = "search-view">
         <nav  className = "search-view__nav">
            <ul className="search-view__list">
                 {renderSearchList (results, page)}             
            </ul>
         </nav>  
         {results.length>1&&<Pagination />}       
      </div>
    )
}

export default SearchView;