import './App.css';
import User from './component/User'
import Login from './component/Login'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {  useRoutes} from "react-router-dom";
import routes from './Router';
import Header from './component/Header';

const queryClient = new QueryClient()
function App() {
  const content = useRoutes(routes);     
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
    {content}
    </QueryClientProvider>
  );
}

export default App;
