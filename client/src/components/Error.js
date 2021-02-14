import { useHistory } from 'react-router-dom';
import { Col } from 'design/components';
import { Message } from 'components/Message';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
   const history = useHistory();

   history.listen((location, action) => {
      if (error) resetErrorBoundary();
   });

   return (
      <Col width='10'>
         <Message severity='error' text={error.message} />
      </Col>
   );
};

const ErrorNotFound = () => {
   return (
      <Col width='10'>
         <Message severity='error' text='404 Not Found' />
      </Col>
   );
};

export { ErrorFallback, ErrorNotFound };
