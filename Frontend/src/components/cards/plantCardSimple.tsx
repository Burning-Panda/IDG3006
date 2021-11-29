import React from 'react';
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import NotFoundImage from '../../static/images/notFound.jpg';
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Box from "@mui/material/Box";
import DifficultyLevel from "../typography/difficultyLevel";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import OutlinedButton from "../buttons/outlinedButton";
import FilledButton from "../buttons/filledButton";

interface iPlantCardSimple {
    name?: string;
    scientificName?: string;
    location?: string | boolean;
    picture?: any;
    pictureAlt?: string;
}


function PlantCardSimple({
                       name = "Nomad",
                       scientificName = "Nomadullus Maximus",
                       location = false,
                       picture = NotFoundImage,
                       pictureAlt = 'Nothing yet.',
                   }: iPlantCardSimple) {

    return (
        <Paper sx={{ p: 2, margin: 'auto', flexGrow: 1 }}>
            <Grid container spacing={1} alignItems={"center"}>
                <Grid item xs={6}>
                    <CardMedia
                        component="img"
                        sx={{
                            height:'100%',
                            maxHeight:160,
                            objectFit:'cover',
                            borderRadius: '20px'
                        }}
                        src={picture}
                        alt={pictureAlt}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Box mt={1} pl={1}>
                        <Typography
                            variant={"h2"}
                            sx={{fontWeight:"bold"}}>
                            {name}</Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                            sx={{
                                fontStyle:"italic",
                                whiteSpace:"nowrap",
                                overflow:"hidden",
                                maxWidth:"100%",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {scientificName}
                        </Typography>

                        {location
                            ? <Box sx={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <RoomOutlinedIcon sx={{ fontSize: 18 }} />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        whiteSpace:"nowrap",
                                        overflow:"hidden",
                                        maxWidth:"100%",
                                        textOverflow: "ellipsis",
                                        textDecoration: "underline"
                                    }}
                                >{location}</Typography>
                            </Box>
                            : null
                        }
                    </Box>

                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <OutlinedButton text={"Read More"} fullWidth />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}


export default PlantCardSimple;