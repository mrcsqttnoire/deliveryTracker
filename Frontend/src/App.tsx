import { RouterProvider } from 'react-router-dom';
import './index.css'
import { routes } from './routes';

function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App
