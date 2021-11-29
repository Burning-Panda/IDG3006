import React from 'react';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import NotFoundImage from "../../static/images/notFound.jpg";
import {Skeleton} from "@mui/material";

export interface iBasicInfo {
    loading?: boolean;
    name: string;
    scientificName?: string;
    location?: string | boolean;
    picture: {
        image: string;
        alt: string;
    }

    imgBorder?: boolean;
}

function BasicInfo(
    {
        loading = false,
        name = "Nomad",
        scientificName = "Nomadullus Maximus",

        location = "Mustad",
        picture = {
            image: "",
            alt: "",
        },
        imgBorder=true
    }: iBasicInfo) {

    return (
        <Grid container alignItems="center" spacing={1}>
            <Grid item xs={6}>
                <CardMedia
                    component="img"
                    sx={{
                        height:'100%',
                        maxHeight:100,
                        objectFit:'cover',
                        borderRadius: '20px',
                        border: imgBorder?'1px solid #f4f4f4':'none'
                    }}
                    src={picture.image || NotFoundImage}
                    alt={picture.alt}
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
        </Grid>
    );
}

export default BasicInfo;