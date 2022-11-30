import { useContext } from "react";
import Home from "./pages/home/Home";
import Thread from "./pages/thread/Thread";
import { Route, Routes } from "react-router-dom";
import NewThread from "./pages/newThread/NewThread";
import RelatedThreads from "./pages/relatedThreads/RelatedThreads";
import Logout from "./pages/logout/Logout";
import UserDetails from "./pages/userDetails/UserDetails"
import Register from "./pages/register/Register";
import Login from "./pages/Login/Login";
import Topbar from "./component/topbar/Topbar";
import { Context } from "./context/Context";

function App() {
 
  const { user } = useContext(Context);
  return (
    <>
      
     {user && <Topbar />} 
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/thread/:id" element={<Thread />} />
        <Route path="/newThread" element={<NewThread />} />
        <Route path="/auth" element={<Register />} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/topic/:id" element={<RelatedThreads />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </>

  );
}

export default App;
