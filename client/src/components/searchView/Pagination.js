import * as R from 'ramda';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const Pagination = ({
    page,
    changePage,
    pages
}) => {    
    let { term } = useParams();

    function renderPageBtn(pages) {
       return [...Array(pages).keys()].map(function generateBtn(pageNum) {        
            return (
                <button key = {pageNum} className = {`pagination__pagebtn ${pageNum + 1  === page &&'pagination__pagebtn--active' }`} onClick = {() => changePage(pageNum + 1)}>{pageNum + 1}</button>
            );
        })
    }


    return (
        <div className="pagination">
      <button  className = {`pagination__actionbtn ${page === 1&&' pagination__actionbtn--disable'}`}  onClick = {() => changePage(prev => prev - 1)}>        
      <Icon name='arrow left'  size = 'large' />
      </button>
        {renderPageBtn(pages)}
        <button  className = "pagination__actionbtn" onClick = {() =>changePage(prev => prev + 1)} >
        <Icon name='arrow right' size = 'large' />  
        </button>       
      </div>
    )
}

export default Pagination;