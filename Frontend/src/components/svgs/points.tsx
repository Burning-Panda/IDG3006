import React from 'react';
import Grid from "@mui/material/Grid";
import Coins from "../../static/svgs/Icons/Coins.svg";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton"

interface iPoints {
    size?: number,
    reward?: number | string
}

function Points(
    {
        size = 30,
        reward = 0

    }: iPoints) {
    return (
        <Grid
            container
        >
            <Grid item>
                <img src={Coins} height={size} />
            </Grid><Grid item>
            {reward >= 1
                ? <Typography sx={{fontWeight:500, pt:"2px"}}>+ {reward}</Typography>
                : <Skeleton variant="rectangular" width={"30px"} />
            }
        </Grid>
        </Grid>
    );
}

export default Points;