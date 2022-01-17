import { Grid, TextField,Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import bg from "assets/loginBg.jpg"
import theme from "theme";
import { useContext, useState } from "react";
import { loginApi } from "apis/user";
import { UserContext } from "contexts/userContext";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
  container:{
    background:`url(${bg})`,
    backgroundPosition : 'center center',
    backgroundSize : "cover",
    width: "100vw",
    height:'100vh'
  },  
  formContainer:{
      minHeight : 450,
      padding:theme.spacing(5),
      boxShadow: '1px 2px 6px 1px silver',
      backgroundColor: theme.palette.action.main
  },
  btnHolder:{
      width : theme.spacing(50)
  },
  inputTxt:{
    "& input":{
    color : theme.palette.primary.main
  }
  }
})
const Login = ()=>{
    const classes = useStyles()
    let navigate = useNavigate()
    const [userInfo,setLoginInfo] = useState({
      username : '',
      password : ''
    })
    const [user,setUser] = useContext(UserContext)
    const login = async()=>{
      try{
        const res = await loginApi(userInfo);
        setUser(res.data.payload)
        localStorage.setItem("isLogin",true)
        navigate("/")
      }catch(e){
      }
    }
    return(
        <Grid container className={classes.container} justifyContent={"center"} alignItems={"center"} >
          <Grid 
            container  
            item 
            xs={12} 
            md={4} 
            direction={"column"} 
            className={classes.formContainer} 
            justifyContent={"space-around"}              
            >
            <TextField  
              onChange={(e)=>setLoginInfo(prev=>({...prev,username:e.target.value}))}
              className={classes.inputTxt} 
              fullWidth type={"text"} 
              focused 
              variant="outlined" 
              color="primary" 
              label="user name" 
              required
              />
            <TextField 
              onChange={(e)=>setLoginInfo(prev=>({...prev,password:e.target.value}))}
              className={classes.inputTxt} 
              fullWidth type={"password"} 
              focused variant="outlined" 
              color="primary" 
              label="password" 
              required
              />
            <Button 
              fullWidth 
              variant="contained" 
              color="secondary" 
              onClick={login}
              >
                Login
              </Button>
          </Grid>      
        </Grid>    
    )
}
export default Login;