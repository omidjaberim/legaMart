import { UserContext } from 'contexts/userContext';
import {
    Route,Routes,useLocation
  } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { useContext, useEffect,useState } from 'react';
import Login from "pages/auth/login"
import Dashboard from "pages/dashboard"

const MyRoutes = ()=>{
    const [user, setUser] = useContext(UserContext);
    let location = useLocation();
    const [isLogin,setIsLogin] = useState(()=>localStorage.getItem('isLogin'))
    useEffect(()=>{
      setIsLogin(localStorage.getItem('isLogin'))
    },[location])
    return(
      <>      
          {    
              isLogin === 'true' ?(
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            ):(
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/logout" element={<Login />} />
                <Route path="*" element={<Login />} />
              </Routes>          
            )
        }    
            <ToastContainer />
            </>
    )
    
}
export default MyRoutes