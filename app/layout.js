import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import NavBar from "@/components/navbar/navBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Issue Tracker",
  description: "it is a platform to maintain the issues",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
