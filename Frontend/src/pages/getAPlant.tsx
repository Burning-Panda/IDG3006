import React, {useState} from 'react';
import Box from "@mui/material/Box";
import PlantCard from "../components/cards/plantCard";
import Typography from "@mui/material/Typography";

import ImageOfYoda from "../static/images/plant-2.jpg"
import CongratulationsPopup from "../components/modal/CongratulationsPopup";
import SensorCard from '../components/cards/sensorCard';
import TaskCard from '../components/cards/taskCard';
import PlantLevel from '../components/svgs/plantLevel';


interface iPlantsList {

}

function PlantsList(props: iPlantsList) {
    const [plantsAvailable, setPlantsAvailable] = useState([
        {
            "name": "Yoda",
            "scientificName": "Yodamus Maximums",
            "location": "Mustad",
            "difficultyLevel": 2,
            "picture": ImageOfYoda,
            "pictureAlt": "Picture of Yoda"
        }
    ]);

    return (
        <Box>
            <CongratulationsPopup />

            <Typography variant="h2">Choose a plant</Typography>
            <Box>
                {plantsAvailable.map(plant => {
                        return <PlantCard {...plant} />
                    }
                )}
            </Box>
        </Box>
    );
}

export default PlantsList;