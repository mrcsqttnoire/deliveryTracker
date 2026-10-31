import './styles/index.css'
import { SkeletonTheme } from 'react-loading-skeleton';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { UserProvider } from './provider/UserProvider';
import { LoadingProvider } from './provider/LoadingProvider';
import { CompressionImage } from './provider/CompressionImage';

import 'react-loading-skeleton/dist/skeleton.css';
import { LivreurProvider } from './provider/LivreurProvider';
import { UtilitiesProvider } from './provider/UtilitiesProvider';
import { LivraisonProvider } from './provider/LivraisonProvider';

function App() {
    return (
      <SkeletonTheme baseColor="#DCE3F2" highlightColor="#F4F7FF">
        <UtilitiesProvider>
          <LoadingProvider>
            <CompressionImage>
              <LivreurProvider>
                <LivraisonProvider>
                  <UserProvider>
                    <RouterProvider router={routes} />
                  </UserProvider>
                </LivraisonProvider>
              </LivreurProvider>
            </CompressionImage>
          </LoadingProvider>
        </UtilitiesProvider>
      </SkeletonTheme>
    );
  }

export default App
