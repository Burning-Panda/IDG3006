import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import {LinearProgress} from "@mui/material";
import Box from "@mui/material/Box";

interface iSensorCard {
    icon?: JSX.Element;
    title: string;
    info: string;
    progressBar?: number;
    coloring?: "info" | "primary" | "inherit" | "secondary" | "error" | "success" | "warning" | undefined;
}

function SensorCard(
    {
        icon,
        title = "",
        info = "",
        progressBar,
        coloring = "primary"
    }: iSensorCard) {
    return (
        <Paper elevation={0} sx={{bgcolor:"grey.A100"}}>
            <Box pt={1} pb={3}>
                <Grid container padding={1} gap={1} alignItems={"top"}>
                    {icon
                        ? <Grid item>{icon}</Grid>
                        : null
                    }
                    <Grid item>
                        <Typography component="b" sx={{fontWeight: 700}}>{title}</Typography>
                        <Typography mt={-.5}>{info}</Typography>
                    </Grid>
                </Grid>
                <Box px={1}>
                    {progressBar
                        ? <LinearProgress
                            variant="determinate"
                            value={progressBar}
                            color={
                                coloring}
                            sx={{
                                height: "10px",
                                borderRadius: "10px",

                                "& .MuiLinearProgress-bar": {
                                    borderRadius: "10px",
                                }
                            }}
                        />
                        : null}
                </Box>
            </Box>
        </Paper>
    );
}

export default SensorCard;