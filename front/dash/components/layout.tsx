import 'bootstrap/dist/css/bootstrap.css';
import '../app/globals.css'
import { ReactNode } from 'react';
import BootstrapClient from '@/components/BootstrapClient.js';

export function RootLayout(children: ReactNode) {
  return (
    <html lang="en">
        <body>{children}</body>
        <BootstrapClient/>
    </html>
  )
}