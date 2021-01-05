import * as R from 'ramda';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const Pagination = () => {
    //const { page, pages, changePage, nextPageResults } = useContext(SearchContext);
    //let { term } = useParams();

    // function generatePageNum(pages) {
    //     let pagelist = [];
    //     for (let i = 1; i <= pages; i++) {
    //         pagelist = [...pagelist, i];
    //     }
    //     return pagelist;
    // }

    // function renderBtn(pages) {
    //     return pages.map(function generateBtn(pageNum) {
    //         return (
    //             <button key = {pageNum} className = {`pagination__pagebtn ${pageNum === page &&'pagination__pagebtn--active' }`} onClick = {changePage(pageNum)}>{pageNum}</button>
    //         );
    //     })
    // }
    // const renderPageBtn = R.pipe(generatePageNum, renderBtn);

    // function onNextPage(term) {
    //     return function() {
    //         nextPageResults(term)
    //     }
    // }
    return null;
    // return (
    //     <div className="pagination">
    //   <button  className = {`pagination__actionbtn ${page === 1&&' pagination__actionbtn--disable'}`}  onClick = {changePage(page - 1)}>        
    //   <Icon name='arrow left'  size = 'large' />
    //   </button>
    //     {renderPageBtn(pages)}
    //     <button  className = "pagination__actionbtn"  onClick = {page<pages?changePage(page + 1):onNextPage(term)}>
    //     <Icon name='arrow right' size = 'large' />  
    //     </button>       
    //   </div>
    // )
}

export default Pagination;