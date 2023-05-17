import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useUserContext } from "./hooks/useUserContext";
import Stats from "./pages/Stats";
import Leaderboard from "./pages/Leaderboard";

function App() {
  const { user } = useUserContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/stats" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/stats" />}
          />
          <Route
            path="/stats"
            element={user ? <Stats /> : <Navigate to="/login" />}
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
