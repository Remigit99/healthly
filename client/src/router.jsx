import { createBrowserRouter, Navigate } from "react-router-dom";
import RoleGuard from "./components/auth/RoleGuard";

// LAYOUTS (The "Shells")
import PublicLayout from "./layouts/PublicLayout";   // Navbar for everyone
// import AppLayout from "./layouts/AppLayout";         // Sidebar for logged-in users

// PAGES
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import Dashboard from "./pages/shared/Dashboard"; // We'll make this dynamic

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />, 
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "verify-email", element: <div className="p-10">Verifying...</div> },
    ],
  },

  // --- PROTECTED AREA (The Inner Sanctum) ---
//   {
//     path: "/app",
//     element: <RoleGuard allowedRoles={["parent", "doctor", "admin"]} />,
//     children: [
//       {
//         element: <AppLayout />, // One flexible layout for all roles
//         children: [
//           // Parent Specific
//           {
//             path: "parent",
//             element: <RoleGuard allowedRoles={["parent"]} />,
//             children: [{ index: true, element: <Dashboard role="parent" /> }],
//           },
//           // Doctor Specific
//           {
//             path: "doctor",
//             element: <RoleGuard allowedRoles={["doctor"]} />,
//             children: [{ index: true, element: <Dashboard role="doctor" /> }],
//           },
//           // Admin Specific
//           {
//             path: "admin",
//             element: <RoleGuard allowedRoles={["admin"]} />,
//             children: [{ index: true, element: <div className="p-6">Admin Panel</div> }],
//           },
//         ],
//       },
//     ],
//   },

  { path: "*", element: <div className="p-20 text-center">404 - Not Found</div> },
]);

export default router;