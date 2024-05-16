// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import NavBar from "@/components/core/NavBar";
import {Notifications} from "@mantine/notifications";
import {AuthContextProvider} from "@/context/AuthContext";
import Providers from "@/app/providers";

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';


import { io } from "socket.io-client";

export const socket = io("http://localhost:8080");

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
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
          <AuthContextProvider>
              <MantineProvider>
                  <Notifications />

                  <NavBar/>
                  {children}
              </MantineProvider>
          </AuthContextProvider>
      </Providers>
      </body>
      </html>
  );
}
