import 'bootstrap/dist/css/bootstrap.css';
import '../app/globals.css'
import BootstrapClient from '@/components/BootstrapClient.js';

export const metadata = {
  title: 'Business management dash',
  description: 'A dash for managing businesses',
}

export function RootLayout({children,}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <BootstrapClient />
    </html>
  )
}
