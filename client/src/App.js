import React, { useEffect, useContext, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStyle from './design/GlobalStyle';
import { StylesProvider } from '@material-ui/styles';
import { Container, Row, Col } from './design/components';
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
import Header from './layout/header/Header';
import Sidebar from './layout/sidebar/Sidebar';
import Spinner from './design/elements/Spinner';
const Signup = lazy(() => import('./components/auth/Signup'));
const Login = lazy(() => import('./components/auth/Login'));
const SearchView = lazy(() => import('./components/searchView/SearchView'));
const VideoView = lazy(() => import('./components/videoView/VideoView'));
const LikedView = lazy(() => import('./components/likedView/LikedView'));
const ChannelView = lazy(() => import('./components/channelView/ChannelView'));
const AccountView = lazy(() => import('./components/accountView/AccountView'));

function App() {
   return (
      <StylesProvider injectFirst>
         <GlobalStyle />
         <AuthStore>
            <HomeStore>
               <LikeStore>
                  <SearchStore>
                     <SubscribeStore>
                        <VideoStore>
                           <ChannelStore>
                              <CommentStore>
                                 <AlertStore>
                                    <Suspense fallback={<Spinner />}>
                                       <Router>
                                          <Header />
                                          <Container>
                                             <Row  flexDirection = {{desktop: 'row', tabport: 'column'}}>
                                                <Sidebar />
                                                <Route exact path='/signup' component={Signup} />
                                                <Route exact path='/login' component={Login} />                                                
                                                   <Route exact path='/' component={Home} />
                                                   <PrivateRoute
                                                      exact
                                                      path='/accounts'
                                                      component={AccountView}
                                                   />
                                                   <PrivateRoute
                                                      exact
                                                      path='/likelist'
                                                      component={LikedView}
                                                   />
                                                   <Route
                                                      exact
                                                      path='/results'
                                                      component={SearchView}
                                                   />
                                                   <Route
                                                      exact
                                                      path='/watch/:videoId'
                                                      component={VideoView}
                                                   />
                                                   <Route
                                                      exact
                                                      path='/channel/:channelId'
                                                      component={ChannelView}
                                                   />
                                             </Row>
                                          </Container>
                                       </Router>
                                    </Suspense>
                                 </AlertStore>
                              </CommentStore>
                           </ChannelStore>
                        </VideoStore>
                     </SubscribeStore>
                  </SearchStore>
               </LikeStore>
            </HomeStore>
         </AuthStore>
      </StylesProvider>
   );
}

export default App;
