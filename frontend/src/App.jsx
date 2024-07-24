import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Header />
      <div className="flex">
        <Navbar />
        <div className="flex-1 h-100% mx-2 my-4 shadow rounded-md">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
