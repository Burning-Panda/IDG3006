import React, { useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CardMedia from "@mui/material/CardMedia";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import NotFoundImage from "../../static/images/notFound.jpg";
import Button from "@mui/material/Button";
import {fetchAllPlants, iGetAllPlants} from "../../utils/Fetch/Plants";
import DifficultyLevel from "../../components/typography/difficultyLevel";
import {IPlant, Plant} from "../../utils/Fetch/dto/Plant";
import ButtonNextPage from "../../components/startComponents/buttonNextPage";
import StartLayout from "../../_layouts/StartLayout";


interface iSelectPlant {

}

const i18n = {
    title: "Get a plant on Mustad:",
    button: "I'm ready",
    plantTaken: "Taken",
    plantNotTaken: "Select",
    plantChosen: "Chosen",
};

function StartSelectPlant(props: iSelectPlant) {


    const [selected, setSelected] = React.useState("");

    const [plants, setPlants] = React.useState([Plant.getDefault()]);
    const [loading, setLoading] = React.useState(true);


    async function fetchDataFromServer() {
        let awaitPlants: iGetAllPlants = await fetchAllPlants().then(fdata => {
            return fdata
        });
        if (awaitPlants.ok) {
            // @ts-ignore
            setPlants(awaitPlants.data);
        }
    }

    useEffect(() => {
        fetchDataFromServer()
    }, []);




    return (
        <StartLayout>
            <Typography textAlign={"center"} sx={{fontSize:24}}>{i18n.title}</Typography>
            <Box pt={5}>
                <Grid container
                      direction="column"
                      alignItems="stretch"
                      gap={5}
                >
                    {plants.map((plant) => {
                        // @ts-ignore
                        let pid = plant.id;
                        return <PlantCard key={plant.PlantID}
                                          plant={plant}
                                          selected={selected}
                                          setSelected={//@ts-ignore
                                              (e, plantID) => setSelected(plantID)}
                        />
                    })}
                </Grid>
            </Box>
            <ButtonNextPage disabled={selected === ""}
                            link={`/start/plant/${selected}/avatar`}
                            buttonText={i18n.button} />
        </StartLayout>
    );
}


export interface iBasicInfo {
    plant: IPlant;
    selected?: string;
    setSelected: (e: React.MouseEvent, plantID: string) => void;
}


const PlantCard = ({plant, selected, setSelected}: iBasicInfo) => {

    return (
        <Paper sx={{
            transition: "all 0.3s ease-in-out",
            p:1,
            boxShadow: "0px 0px 24px 2px rgba(196, 196, 196, 0.5)",
            // @ts-ignore
            opacity:
                selected === plant.PlantID
                    ? 1
                    : selected === ""
                        ? 1
                        : 0.5,
        }}>
            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={6}>
                    <CardMedia
                        component="img"
                        sx={{
                            height:'100%',
                            maxHeight:100,
                            objectFit:'cover',
                            borderRadius: '15px',
                        }}
                        src={plant.picture || NotFoundImage}
                        alt={plant.pictureAlt || "No alt text"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Box>
                        <DifficultyLevel level={1} />
                    </Box>
                    <Box mt={.5}>
                        <Typography
                            variant={"h2"}
                            sx={{fontWeight:"bold"}}>
                            {plant.name}</Typography>

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
                            {plant.scientificName}
                        </Typography>

                        {plant.location
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
                                >{plant.location}</Typography>
                            </Box>
                            : null
                        }
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={1} sx={{mt:2}}>
                <Grid item xs={5}>
                    <Button
                        variant="outlined"
                        sx={{
                            transition: "all 0.3s ease-in-out",
                            borderRadius: '20px',
                            py: '8px',
                            typography: 'body1',
                            textTransform: 'capitalize',
                            borderWidth: '2px',
                            '&:hover': {
                                borderWidth: '2px',
                                bgcolor: 'primary.background',
                            }
                        }}
                        fullWidth={true}
                    >
                        Read more
                    </Button>
                </Grid>
                <Grid item xs={7}>
                    <Button
                        variant="contained"
                        disabled={plant.isTaken}
                        sx={{
                            transition: "all 0.3s ease-in-out",
                            borderRadius: '20px',
                            py: '8px',
                            typography: 'body1',
                            textTransform: 'capitalize',
                            bgcolor: plant.isTaken ? 'Gray' : selected === plant.PlantID ? 'primary.dark':'primary.main',
                            color: selected === plant.PlantID ? 'white' : "black",
                        }}
                        onClick={(e) => {

                            if (selected === "" || selected !== plant.PlantID) {
                                setSelected(e, plant.PlantID)
                            } else if(selected === plant.PlantID) {
                                // @ts-ignore
                                setSelected(e, "")
                            }
                        }}
                        fullWidth={true}
                    >
                        {plant.isTaken ? i18n.plantTaken : selected === plant.PlantID ? i18n.plantChosen : i18n.plantNotTaken}
                    </Button>
                </Grid>

            </Grid>
        </Paper>
    )
}

export default StartSelectPlant;