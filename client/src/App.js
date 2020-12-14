import './App.scss';
import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthStore from './stores/auth/AuthStore';
import HomeStore from './stores/home/HomeStore';
import LikeStore from './stores/likes/LikeStore';
import SearchStore from './stores/search/SearchStore';
import VideoStore from './stores/video/VideoStore';
import CommentStore from './stores/comment/CommentStore';
import ChannelStore from './stores/channel/ChannelStore';
import SubscribeStore from './stores/subscriptions/SubscribeStore';
import AlertStore from './stores/alerts/AlertStore';
import PrivateRoute from './routes/PrivateRoutes';
import Home from './layout/home/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Header from './layout/header/Header';
import Sidebar from './layout/sidebar/Sidebar';
import SearchView from './components/searchView/SearchView';
import VideoView from './components/videoView/VideoView';
import LikedView from './components/likedView/LikedView';
import ChannelView from './components/channelView/ChannelView';




function App() {

    return (
     <AuthStore> 
    <HomeStore>
    <LikeStore>      
    <SearchStore>      
    <SubscribeStore>
    <VideoStore>  
    <ChannelStore>
    <CommentStore> 
    <AlertStore>      
    <Router>
    <div className="container">   
      <Header />
      <div className = "content">
       <Sidebar />
       <Route exact path = "/signup" component = {Signup} />
       <Route exact path = "/login" component = {Login} />
        <main className = "main-view">          
        <Route exact path = "/" component = {Home} />  
        <PrivateRoute exact path = "/likelist" component = {LikedView} />               
        <Route exact path = "/results/:term" component = {SearchView} />
        <Route exact path = "/watch/:videoId" component = {VideoView} />
        <Route exact path = "/channel/:channelId" component = {ChannelView} />               
        </main>
      </div>
    </div>       
    </Router>
    </AlertStore>     
    </CommentStore>    
    </ChannelStore>
    </VideoStore>
    </SubscribeStore>
    </SearchStore>
    </LikeStore>
    </HomeStore>    
    </AuthStore>
    );
}

export default App;