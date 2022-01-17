import { getBooksApi } from "apis/books"
import { useEffect, useState } from "react"
import Layout from "pages/dashboard/Layout"
import { DataGrid } from '@mui/x-data-grid'
import {Button, Chip, Grid, Typography, TextField} from "@mui/material"
import moment from "moment"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { makeStyles } from "@mui/styles";
import Modal from "components/Modal"
import theme from "theme"

const useStyles = makeStyles({
    tags : {
        margin : theme.spacing(0.2)
    },
    tagHolder:{
        height : 100
    },
    card : {
        margin : theme.spacing(4)
    },
    cardDesc : {
        margin : theme.spacing(4),
        height : 240,
        overflow : "auto"
    },
    title :{
        direction:'rtl',
    },
    searchBox : {
        padding : theme.spacing(2)
    }
})

const Dashboard = ()=>{
    const classes = useStyles()
    const [ loading,setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [data,setData] = useState({})
    const showModal = (data)=>{
        setData(data)
        setOpen(true)
    }
    const handleClose = ()=>{
        setData({})
        setOpen(false)
    }
    useEffect(()=>{
        getBooks()
    },[])
    const columns = [
        { field: 'title', headerName: 'Title', width: 180 },
        { field: 'createdAt', headerName: 'Creation Date', width: 280 },
        { field: 'tags', headerName: 'tags', width: 320,sortable: false },
        { field: 'actions', headerName: '', width: 220 ,sortable: false,
        renderCell: (params) =>(
                <Button onClick={()=>showModal(params.row)} color="secondary" >Learn More</Button>
        )                
    },

    ]
    const [rows,setRows] = useState([])
    const [searchRows,setSearchRows] = useState([])
    const [status,setStatus] = useState(false) //// false means table true cards
    const getBooks = async()=>{
        try{
            setLoading(true)
            const res = await getBooksApi()
            setRows(
                res.data.payload.map((book)=>({
                    id : book.id,
                    title : book.title,
                    createdAt : book.createdAt ? 
                    moment(new Date(book.createdAt)).format("dd-mm-YYYY  HH:mm") : "not recieved from api",
                    description : book.description, 
                    picture : book.picture,
                    tags : book.tags
                }))
            )
            setSearchRows(                
            res.data.payload.map((book)=>({
                id : book.id,
                title : book.title,
                createdAt : book.createdAt ? 
                moment(new Date(book.createdAt)).format("dd-mm-YYYY  HH:mm") : "not recieved from api",
                description : book.description, 
                picture : book.picture,
                tags : book.tags
            }))
          )
        }catch(e){}
        finally{
            setLoading(false)
        }
    }

    const filter = (title,value)=>{     
     if(title === "title")   
       setRows(searchRows.filter(p=>p.title.includes(value)))
     else
      setRows(searchRows.filter(p=>p.tags && p.tags.includes(value)))
    }
    
    return(
        <Layout>
            <Modal 
             title={data.title}
             open={open}
             handleClose={handleClose}
            >
                        <Card  >
                            <CardMedia
                                component="img"
                                height="194"
                                image={data.picture}
                            />
                            <CardContent className={classes.cardDesc} >
                                {
                                data.description
                                }    
                            </CardContent>
                            <CardContent className={classes.tagHolder} >
                                {
                                    data.tags && data.tags.map((tag,index)=>(
                                        <Chip className={classes.tags} key={index} label={tag} />   
                                    ))
                                }    
                            </CardContent>
                         </Card>
            </Modal>
            <Grid container direction="column"  alignItems={"center"} >

             <Button onClick={()=>setStatus(prev=>!prev)} color="secondary" variant="contained" style={{margin:12}} >
                {
                status ?
                (
                  <Typography>Card view</Typography>
                ):(
                    <Typography>Table view</Typography>
                )}
             </Button>   
             <Grid className={classes.searchBox} container justifyContent={"flex-start"} alignItems={"center"} >
                <Typography variant="body1" >Title:</Typography>
                <TextField  onChange={(e)=>filter("title",e.target.value)}  variant="standard" color="action"   />
                <Chip className={classes.tags} onClick={()=>filter("tags","Sample Book")}  label={"Sample Book"} />   
                <Chip className={classes.tags} onClick={()=>filter("tags","react")} label={"react"} />   
                <Chip className={classes.tags} onClick={()=>filter("tags","front-end")} label={"front-end"} />   
                <Chip className={classes.tags} onClick={()=>filter("tags","nothing")} label={"nothing"} />   
             </Grid>                 
             {status ?
                (
            <div style={{ height: 800, width: '80%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableSelectionOnClick
                    disableColumnFilter 
                    disableSelectionOnClick 
                    disableColumnMenu
                    disableColumnSelector
                    disableDensitySelector
                    disableExtendRowFullWidth
                    disableVirtualization                    
                />
            </div>
                ):(
            <Grid container justifyContent={"space-around"}  >
                {rows && rows.map((row,index)=>(
                    <Grid item lg={3} sm={6} xs={12} key={index} >
                        <Card className={classes.card} >
                            <CardHeader
                                className={classes.title}
                                title={<Typography variant="h6" color="action" >{row.title}</Typography>}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={row.picture}
                            />
                            <CardContent className={classes.tagHolder} >
                                {
                                    row.tags && row.tags.map((tag,index)=>(
                                        <Chip className={classes.tags} key={index} label={tag} />   
                                    ))
                                }    
                            </CardContent>
                            <CardActions disableSpacing>
                                <Button onClick={()=>showModal(row)} color="secondary" size="small">Learn More</Button>
                            </CardActions>   
                         </Card>
                    </Grid>
                ) )}
            </Grid>   
                )
                }
            </Grid>
        </Layout>
    )
}
export default Dashboard