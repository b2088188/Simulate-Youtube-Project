import React, { lazy, Suspense } from 'react';
import { Route, useLocation, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoutes';
import Home from './screen/home/HomeView';
import Header from './layout/header/Header';
import Sidebar from './layout/sidebar/Sidebar';
import { Container, Row, Col } from './design/components';
import { Spinner } from './components/Spinner';
import { Message } from './components/Message';
import { ErrorBoundary } from 'react-error-boundary';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Signup = lazy(() => import('./screen/auth/Signup'));
const Login = lazy(() => import('./screen/auth/Login'));
const SearchView = lazy(() => import('./screen/search/SearchView'));
const VideoView = lazy(() => import('./screen/video/VideoView'));
const LikedView = lazy(() => import('./screen/like/LikedView'));
const ChannelView = lazy(() => import('./screen/channel/ChannelView'));
const AccountView = lazy(() => import('./screen/account/AccountView'));

function App() {
   return (
      <Suspense
         fallback={
            <Row>
               <Spinner modifiers='dark' />
            </Row>
         }
      >
         <Header />
         <Container>
            <Row
               direction={{
                  desktop: 'row',
                  tabport: 'column'
               }}
            >
               <Sidebar />
               <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <AppRoutes />
               </ErrorBoundary>
            </Row>
         </Container>
      </Suspense>
   );
}

const AppRoutes = () => {
   const location = useLocation();
   return (
      <TransitionGroup component={null}>
         <CSSTransition
            timeout={{
               appear: 250,
               enter: 250,
               exit: 250
            }}
            classNames='item'
            key={location.key}
         >
            <Switch location={location}>
               <Route exact path='/' component={Home} />
               <Route path='/signup' component={Signup} />
               <Route path='/login' component={Login} />
               <PrivateRoute path='/accounts' component={AccountView} />
               <Route path='/results' component={SearchView} />
               <PrivateRoute path='/likelist' component={LikedView} />
               <Route path='/watch/:videoId' component={VideoView} />
               <Route path='/channel/:channelId' component={ChannelView} />
            </Switch>
         </CSSTransition>
      </TransitionGroup>
   );
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
   return (
      <Col width='10'>
         <Message severity='error' text={error.message} />
      </Col>
   );
};

export default App;
