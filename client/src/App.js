import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Container, Row, Col } from './design/components';
import PrivateRoute from './routes/PrivateRoutes';
import Home from './layout/home/Home';
import Header from './layout/header/Header';
import Sidebar from './layout/sidebar/Sidebar';
import { Spinner, Message } from './design/elements';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';
const Signup = lazy(() => import('./components/auth/Signup'));
const Login = lazy(() => import('./components/auth/Login'));
const SearchView = lazy(() => import('./components/searchView/SearchView'));
const VideoView = lazy(() => import('./components/videoView/VideoView'));
const LikedView = lazy(() => import('./components/likedView/LikedView'));
const ChannelView = lazy(() => import('./components/channelView/ChannelView'));
const AccountView = lazy(() => import('./components/accountView/AccountView'));

function App() {
   const { reset } = useQueryErrorResetBoundary();

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
   return (
      <>
         <Route exact path='/signup' component={Signup} />
         <Route exact path='/login' component={Login} />
         <Route exact path='/' component={Home} />
         <PrivateRoute exact path='/accounts' component={AccountView} />
         <Route exact path='/results' component={SearchView} />
         <PrivateRoute exact path='/likelist' component={LikedView} />
         <Route exact path='/watch/:videoId' component={VideoView} />
         <Route exact path='/channel/:channelId' component={ChannelView} />
      </>
   );
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
   return (
      <Col width='10'>
         <Message severity='error' text={error.message} />
         <button onClick={resetErrorBoundary}>Try Again</button>
      </Col>
   );
};

export default App;
