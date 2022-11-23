import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Auth authRoute='login' />} />
          <Route path='/register' element={<Auth authRoute='register' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
