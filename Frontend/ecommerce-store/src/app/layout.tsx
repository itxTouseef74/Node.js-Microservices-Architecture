// app/layout.tsx

import './globals.css'; 
import Navbar from "./navbar/components/navbar"; 
import CartProvider from './context/cartProvider'; // Make sure the path is correct

export const metadata = {
  title: 'Ecommerce',
  description: 'Welcome to my website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
