import React, {useState} from 'react';
import ImageOfYoda from "../../static/images/plant-2.jpg";
import Box from "@mui/material/Box";
import CongratulationsPopup from "../../components/modal/CongratulationsPopup";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PlantCard from "../../components/cards/plantCard";
import SensorCard from "../../components/cards/sensorCard";
import PlantLevel from "../../components/svgs/plantLevel";
import TaskCard from "../../components/cards/taskCard";

interface iTestPage {

}

function TestPage(props: iTestPage) {
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

            <Typography variant="h1">Choose a plant</Typography>
            <Box>
                {plantsAvailable.map((plant, index) => {
                        return <PlantCard key={index} {...plant} />
                    }
                )}
            </Box>

            <Box mt={4}>
                <SensorCard
                    icon={<PlantLevel level={3} size={5}/>}
                    title="I am all good"
                    info="Light: bright, not direct sun"
                />
            </Box>

            <Box mt={4}>
                <TaskCard />
            </Box>
        </Box>
    );
}

export default TestPage;