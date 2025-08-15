import Sidebar from "./sidebar";

export default function Layout ({children}) {
    return(
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
           {children}
        </main>
      </div>
    );
}