import { RouterProvider } from 'react-router-dom';
import './styles/index.css'
import { routes } from './routes';
import { UserProvider } from './provider/UserProvider';

function App() {
  return (
    <UserProvider>
      <RouterProvider router={routes} />
    </UserProvider>
  );
}

export default App
