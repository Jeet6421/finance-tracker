
import React from "react";
import AppRoutes from "../src/routes/AppRoutes";
import { AuthProvider } from "../src/context/AuthContext"; 

function App() {
  return (
    <AuthProvider> {/* Wrapping the whole app with AuthProvider */}
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;















//   const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
//   const [isRegistering, setIsRegistering] = useState(false);

//   if (loggedIn) return <Dashboard />;

//   return (
//     <div className="p-4">
//       {isRegistering ? (
//         <>
//           <Register onRegister={() => setIsRegistering(false)} />
//           <p className="mt-4">
//             Already have an account?{" "}
//             <button
//               onClick={() => setIsRegistering(false)}
//               className="text-blue-600 underline"
//             >
//               Login
//             </button>
//           </p>
//         </>
//       ) : (
//         <>
//           <Login onLogin={() => setLoggedIn(true)} />
//           <p className="mt-4">
//             Don't have an account?{" "}
//             <button
//               onClick={() => setIsRegistering(true)}
//               className="text-blue-600 underline"
//             >
//               Register
//             </button>
//           </p>
//         </>
//       )}
//     </div>
//   );
// }


