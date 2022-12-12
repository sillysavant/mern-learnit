import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AuthContextProvider from "./contexts/AuthContext";
import PostContextProvider from "./contexts/PostContext";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import Landing from "./components/layout/Landing";
import About from "./views/About";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <PostContextProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={<Auth authRoute='login' />} />
              <Route path='/register' element={<Auth authRoute='register' />} />
              <Route
                path='/dashboard'
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/about'
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </PostContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
