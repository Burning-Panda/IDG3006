import React from "react";
import {Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {BackButtonIcon} from "../components/svgs/svgIcons";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";

interface iStartLayout {
    children?: React.ReactNode
    backlink?: string
}



function StartLayout({backlink, children}: iStartLayout) {
    return (
        <>
            {backlink ? <Box sx={{top:0,left:0,right:0,pt:1,pl:2, position:"absolute"}}>
                <Grid container
                      alignItems={"center"}
                      gap={0.5}
                      component={Link}
                      to={backlink}
                      sx={{
                          transition: "all 0.3s ease-in-out",
                          color:"black",
                          "&:visited": {
                              color:"black"
                          },
                          "&::link": {
                              color:"black"
                          },
                          "&:active": {
                              gap:1
                          }
                      }}
                >
                    <Grid item pt={0.4}>
                        <BackButtonIcon size={14} />
                    </Grid>
                    <Grid>
                        <Typography
                            sx={{
                                fontSize:"18px",
                                color:"black",
                                "&:visited": {
                                    color:"black"
                                },
                                "&::link": {
                                    color:"black"
                                }
                            }}>Back</Typography>
                    </Grid>
                </Grid>
            </Box> : null}
            {children}
        </>
    )
}

export default StartLayout;