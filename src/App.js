import { Outlet, useNavigation } from "react-router-dom";
import './App.css';
import Navbar from "./app/pages/Navbar/Navbar";

function App() {
  const { state } = useNavigation();
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
}

export default App;
