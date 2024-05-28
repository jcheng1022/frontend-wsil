// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import './globals.css'

import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import NavBar from "@/components/core/NavBar";
import {Notifications} from "@mantine/notifications";
import {AuthContextProvider} from "@/context/AuthContext";
import Providers from "@/app/providers";

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import 'react-toastify/dist/ReactToastify.css';



export const metadata = {
  title: 'WSIL',
  description: 'When Should I leave',
};

export default function RootLayout({
                                     children,
                                   }) {


  return (
      <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />

      </head>
      <body>
      <Providers>
          <MantineProvider>

          <AuthContextProvider>
                  <Notifications />

                  <NavBar/>
                  {children}
          </AuthContextProvider>
          </MantineProvider>

      </Providers>
      </body>
      </html>
  );
}
