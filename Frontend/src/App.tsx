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
import { AddDetailProvider } from './provider/AddDetailProvider';
import { ClientProvider } from './provider/ClientProvider';
import { PosiitonProvider } from './provider/PositionProvider';

function App() {  
  return (
    <SkeletonTheme baseColor="#DCE3F2" highlightColor="#F4F7FF">
        <UtilitiesProvider>
          <LoadingProvider>
            <CompressionImage>
              <UserProvider>
                <PosiitonProvider>
                  <LivreurProvider>
                    <ClientProvider>     
                      <LivraisonProvider>
                        <AddDetailProvider>
                          <RouterProvider router={routes} />
                        </AddDetailProvider>
                      </LivraisonProvider>
                    </ClientProvider>
                  </LivreurProvider>
                </PosiitonProvider>
              </UserProvider>
            </CompressionImage>
          </LoadingProvider>
        </UtilitiesProvider>
      </SkeletonTheme>
    );
  }

export default App
