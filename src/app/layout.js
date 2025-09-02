import { Lexend } from 'next/font/google';
import "./globals.css";

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lexend', 
});

export const metadata = {
  title: "Todo App",
  description: "Simple Todo App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${lexend.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
