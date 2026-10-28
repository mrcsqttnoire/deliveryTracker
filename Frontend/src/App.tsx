import './styles/index.css'
import { SkeletonTheme } from 'react-loading-skeleton';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { UserProvider } from './provider/UserProvider';
import { LoadingProvider } from './provider/LoadingProvider';
import { CompressionImage } from './provider/CompressionImage';

import 'react-loading-skeleton/dist/skeleton.css';

function App() {
  return (
    <SkeletonTheme baseColor="#DCE3F2" highlightColor="#F4F7FF">
      <LoadingProvider>
        <CompressionImage>
          <UserProvider>
            <RouterProvider router={routes} />
          </UserProvider>
        </CompressionImage>
      </LoadingProvider>
    </SkeletonTheme>
  );
}

export default App
