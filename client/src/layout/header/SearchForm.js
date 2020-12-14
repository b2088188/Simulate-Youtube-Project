import React, {useContext} from 'react';
import SearchContext from '../../stores/search/searchContext';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
const SearchForm = () => {
	const {register, errors, handleSubmit, reset} = useForm();
	const {search} = useContext(SearchContext);
	const history = useHistory();

    function onSubmit({term}) {
    	history.push(`/results/${term}`);
    }

	return (
	<form className = "search" onSubmit = {handleSubmit(onSubmit)}>		
     <input type="text" name = "term" className = "search__input" placeholder = "Search videos ..." ref = {register({
     	required: 'Search Term can\'t not be empty.'
     })} />
     <button className="search__button">
     	<Icon name='search' size = 'large' className="search__icon" />
     </button>
	</form>
		)
}

export default SearchForm;