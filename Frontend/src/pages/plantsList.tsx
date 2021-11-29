import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import PlantCardSimple from "../components/cards/plantCardSimple";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {IPlant, Plant} from "../utils/Fetch/dto/Plant";
import {fetchAllPlants} from "../utils/Fetch/Plants";


interface iPlantsList {

}

function PlantsList(props: iPlantsList) {
    const [plants, setPlants] = useState<IPlant[]>([Plant.getDefault()]);

    useEffect(() => {
        fetchAllPlants().then(res => {
            setPlants(res.data);
        })
    }, []);

    return (
        <Box pt={2}>
            <Typography textAlign={"center"} variant="h1">Choose a plant</Typography>
            <Box pt={4}>

                <Grid container
                      direction="column"
                      alignItems="stretch"
                      gap={5}
                >
                    {plants.map((plant, index) => {
                        return <PlantCardSimple key={index}
                                                      name={plant.name}
                                                      scientificName={plant.scientificName}
                                                      location={plant.location}
                                                      picture={plant.image}
                                                      pictureAlt={`Picture of ${plant.name}`}
                        />
                    })}
                </Grid>
            </Box>
        </Box>
    );
}

export default PlantsList;