import Box from '@mui/material/Box';
import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import introLeaves from './../../static/images/introLeaves.png';
import {Link} from 'react-router-dom';
import StartLayout from "../../_layouts/StartLayout";

interface iStartScreen {

}

function StartScreen(props: iStartScreen) {
    return (
        <Box textAlign={"center"}
             sx={{
                height:"100vh",
                 position:"absolute",
                 top:0,
                 left:0,
                 right:0,
                maxHeight:"100vh",
                backgroundSize: "110%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center -40px",
                backgroundImage: `url(${introLeaves})`,
            }}>
            <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{height:"100%", pt:12}}

            >
                <Box sx={{maxWidth:"165px", height:82}}>
                    <Typography sx={{fontSize:24}}>Hey there!</Typography>
                    <Typography sx={{fontSize:16}}>Plants on Mustad need
                        your help</Typography>
                </Box>

                <Box sx={{flexGrow:1}}>Animation</Box>

                <Box sx={{maxWidth:"280px", fontSize:"18px", height:200}}>
                    <Typography sx={{fontSize:18}}>Get a plant, save the points and get <Typography component={"b"} sx={{ fontSize:"18px", fontWeight:500}}>reward</Typography> from department at the end of the semester.</Typography>

                    <Link to={"/start/plant"}>Join</Link>
                </Box>
            </Grid>
        </Box>
    );
}

export default StartScreen;