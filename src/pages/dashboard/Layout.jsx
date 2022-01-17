import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button,Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "contexts/userContext";
import { useContext } from 'react';
import Chip from '@mui/material/Chip';

const Layout = (props)=>{
    const {children} = props
    let navigate = useNavigate()
    const logout = ()=>{      
      localStorage.setItem('isLogin',false)
      navigate("/")
    }
    const [user,setUser] = useContext(UserContext)
    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar   >
            <Grid  container justifyContent={"space-between"}  >
              <Button onClick={()=>logout()} color="secondary" variant='contained' >LOGOUT</Button>
              <Chip label={user.fullName}  />
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container justifyContent={"center"}  >
          {children}
        </Grid>
      </Box>
    )
}
export default Layout