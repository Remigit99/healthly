import { Outlet } from "react-router";
// import Navbar from "../components/Navbar";
import Sidebar2 from "../components/services/Sidebar2";

// const AppLayout = () => {
//   return (
//     <>
//       {/* <Navbar /> */}
//       <Sidebar2 />
//       <Outlet />
//     </>
//   );
// };

// export default AppLayout;



const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar stays fixed on the left */}
      <Sidebar2 />

      {/* Main content area scrolls independently */}
      <main className="flex-1 h-screen overflow-y-auto no-scrollbar">
        <div className="min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
