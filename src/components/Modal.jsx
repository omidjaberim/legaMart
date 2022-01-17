import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';

export default function CustomModal(props) {
 const {open,handleClose, title, children } =props;
  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box style={{  
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid silver',
            boxShadow: "24px",
            background:"#FFF",
            padding:"13px  33px",
            direction :"rtl",
            borderRadius : 5
            }} >
            <Typography dir="rtl" variant="h6" component="h2"  >
              {title}
            </Typography  >
            <Divider style={{marginBottom:'22px'}} />
            <Grid container direction="column" justifyContent="center" alignItems="flex-start"   >
                {children}
            </Grid>
          </Box>
        </Fade>
      </Modal>
  );
}