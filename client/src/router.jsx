import { createBrowserRouter, Navigate } from "react-router";
import RoleGuard from "./components/auth/RoleGuard";

// LAYOUTS (The "Shells")
import PublicLayout from "./layouts/PublicLayout";   // For non-authenticated users
// import AppLayout from "./layouts/AppLayout";         // Sidebar for logged-in users

// PAGES
import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import GoVerifyEmail from "./pages/auth/GoVerifyEmail";
import NotFound from "./pages/shared/NotFound";
// import Dashboard from "./pages/shared/Dashboard"; // We'll make this dynamic

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />, 
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {path: "go-verify-email", element: <GoVerifyEmail /> },
      { path: "verify-email", element: <VerifyEmail /> },
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

  { path: "*", element: <NotFound /> },
]);

export default router;