import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Stats from "./pages/Stats";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="stats" element={<Stats />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
