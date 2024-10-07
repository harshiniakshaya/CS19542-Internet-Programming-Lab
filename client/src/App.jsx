import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/custom/NavBar'


const RoutesComponent = () => {
  return (
    <div>
      <NavBar />
      <Routes>
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  )
}

export default App;
