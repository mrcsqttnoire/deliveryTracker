import { RouterProvider } from 'react-router-dom';
import './styles/index.css'
import { routes } from './routes';
import { UserProvider } from './provider/UserProvider';
import { LoadingProvider } from './provider/LoadingProvider';
import { CompressionImage } from './provider/CompressionImage';

function App() {
  return (
    <LoadingProvider>
      <CompressionImage>
        <UserProvider>
          <RouterProvider router={routes} />
        </UserProvider>
      </CompressionImage>
    </LoadingProvider>
  );
}

export default App
