import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/custom/NavBar";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignUp/SignUp";
import Home from "./Pages/Home/Home";
import Map from "./Pages/Map/Map";
import Recycle from "./Pages/Recycle/Recycle";
import DonateFood from "./Pages/Donate/Donate";
import { AuthProvider } from "./context/AuthProvider";
import { PrivateRoute } from "./context/PrivateRoute";
import MyDonations from "./Pages/MyDonations/MyDonations";

const RoutesComponent = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<PrivateRoute element={<Map />} />} />
        <Route path="/donate" element={<PrivateRoute element={<DonateFood />} />} />
        <Route path="/recycle" element={<PrivateRoute element={<Recycle />} />} />
        <Route path="/donations" element={<PrivateRoute element={<MyDonations />} />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
