import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         //if has an error, react query will throw error to let error boundary to handle
         //useErrorBoundary: true,
         // when user re-focus the app window, refetch data
         refetchOnWindowFocus: false,
         retry(failureCount, error) {
            if (error.status === 404) return false;
            if (failureCount < 2) return true;
            return false;
         }
      }
   }
});

ReactDOM.render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <App />
      </QueryClientProvider>
   </React.StrictMode>,
   document.getElementById('root')
);
