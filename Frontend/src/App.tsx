import { RouterProvider } from 'react-router-dom';
import './styles/index.css'
import { routes } from './routes';
import { UserProvider } from './provider/UserProvider';
import { LoadingProvider } from './provider/LoadingProvider';

function App() {
  return (
    <LoadingProvider>
      <UserProvider>
        <RouterProvider router={routes} />
      </UserProvider>
    </LoadingProvider>
  );
}

export default App
