import './home.scss';
import React, {useEffect, useContext} from 'react';
import HomeContext from '../../stores/home/homeContext';
import HomeItem from './HomeItem';
import Spinner from '../../utils/spinner/Spinner';

const Home = () => {
  const {results, loadHomeVideos, loading} = useContext(HomeContext);
	useEffect(() => {
        loadHomeVideos();
	}, [])



    
    function renderResults(list) {
    	return list.map(function generateItem(video) {
    		return <HomeItem key = {video._id} video = {video} />
    	})
    }

   if(loading)
    return (
      <Spinner classStyle = "center" />
        )

	return (
    <div className = "home-view">
    	{renderResults(results)}
    </div>
		)
}

export default Home;