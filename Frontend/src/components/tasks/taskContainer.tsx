import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import TaskCard, {iTaskCard} from "../cards/taskCard";
import Paper from "@mui/material/Paper";
import BasicInfo, { iBasicInfo } from "../myPlant/basicInfo";
import NotFoundImage from "../../static/images/notFound.jpg";
import { IPlant } from '../../utils/Fetch/dto/Plant';


interface iOtherTasks {
    title?: string;
    tasks?: iTaskCard[];
    plant?: IPlant;
}

function TaskContainer(
    {
        plant,
        title,
        tasks = []
    }: iOtherTasks) {

    return (
        <Box mt={5}>
            {title ? <Typography variant={"h2"} textAlign={"center"}>{title}</Typography> : null}
            <Paper elevation={5}>
                <Box px={1} pb={1} mt={title?3:0}>
                    <BasicInfo
                        name={//@ts-ignore
                            plant.name ? plant.name : "Plant"}
                        scientificName={plant ? plant.scientificName : "Scientific Name"}
                        location={plant ? plant.location : "Location"}
                        picture={{//@ts-ignore
                            image: plant.image || plant.picture || NotFoundImage, alt: plant ? plant.name : "Plant"}}
                    />
                    <Box mt={3}>
                        {tasks.length > 0 ? tasks.map((task: iTaskCard, index: React.Key | null | undefined) => {
                            return (
                                <Box key={index}
                                     mb={
                                         /* This checks if the current loop iteration is the
                                         same as the length of the list of tasks */
                                         index !== (tasks.length-1)?2:0
                                     }
                                >
                                    <TaskCard  {...task} />
                                </Box>
                            )
                        }) : ''
                        }
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default TaskContainer;