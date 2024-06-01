import { Inter } from "next/font/google";
import TopBar from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notes Manager",
  description: "Create and manage notes with ease",
};


export default function RootLayout({ children }) {
  return (
      <div className='{inter.className} w-full h-full'>
        <TopBar />
        <div className=' w-full h-screen overflow-hidden justify-center align-middle' style={{"alignContent":"center", backgroundColor: 'rgb(246, 233, 178)'}}>
          {children}
        </div>
    </div>
  );
}
