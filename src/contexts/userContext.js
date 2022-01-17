import { useState , createContext} from "react"

export const UserContext = createContext({})
export const  UserProvider = (props)=>{
    const {children} = props
    const [user,setUser] = useState({
        id : 0,
        username:'',
        password:'',
        fullName:""
    })
    return(
        <UserContext.Provider value={[user,setUser]} >
            {children}
        </UserContext.Provider>
    )
}