import React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Blop from '../svgs/Blop';
import {light} from "@mui/material/styles/createPalette";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 5%;
  bottom: 0;
  top: 0;
  left: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 20px;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    p: 2,
    px: 2,
    pb: 3,
};

const titleStyled = {
    marginBottom:0,
    marginTop:1.5,
    fontWeight: 400,
}
const subTitleStyled = {
    margin:0,
}

interface iCongratulationsPopup {
    buttonText?: string;

}



function CongratulationsPopup(props: iCongratulationsPopup) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Open modal
            </button>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <Grid container spacing={1}>
                        <Grid item xs={3}><Blop /></Grid>
                        <Grid item xs={9}>
                            <Typography variant={"h2"} id="unstyled-modal-title" sx={titleStyled}>Congratulations</Typography>
                            <Typography component={"p"} sx={subTitleStyled}>Name of User</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </StyledModal>
        </div>
    );
}

export default CongratulationsPopup;