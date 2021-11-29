import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import LayoutAvatarBg from "../components/layouts/Layout_AvatarBG";
import TaskContainer from "../components/tasks/taskContainer";
import NoTasksAvailable from "../components/tasks/noNewTasksMain";
import {getPublicTasks} from "../utils/Fetch/Tasks";
import TaskClass from "../utils/Fetch/dto/Task";
import {userStore} from "../stores/user";
import {fetchAllPlantsInArray} from "../utils/Fetch/Plants";
import {Plant} from "../utils/Fetch/dto/Plant";

interface iTasks {

}

function Tasks(props: iTasks) {
    const [tasks, setTasks] = React.useState<any>([TaskClass.getDefault()]);
    const [plants, setPlants] = React.useState<any>([]);
    const [myPlantTasks, setMyPlantTasks] = React.useState<any>([]);
    const [publicTasks, setPublicTasks] = React.useState<any>([]);
    
    useEffect(() => {
        getPublicTasks().then(res => {
            if (res) {
                // @ts-ignore
                setMyPlantTasks(res[userStore.getPlant()])
                let keys = Object.keys(res);
                let filteredKeys = keys.filter(key => key !== userStore.getPlant());
                setPublicTasks(filteredKeys);
                let plantTasks:any = {};
                filteredKeys.forEach((key: string | number) => {
                    // @ts-ignore
                    plantTasks[key] = res[key];
                });
                setTasks(plantTasks);

                if (keys !== []) {
                    // @ts-ignore
                    fetchAllPlantsInArray(keys).then(plantsRes => {
                        if (plantsRes) {
                            // @ts-ignore
                            setPlants(plantsRes);
                        }
                    }).catch(err => {console.log(err);})
                }
            }
        }).catch(err => {console.log(err);})
    },[])

    const [myPlant, setMyPlant] = React.useState<any>(Plant.getDefault())
    useEffect(() => {
        setMyPlant(plants.filter((plant: any) => plant.PlantID === userStore.getPlant())[0])
    },[plants])


    return (
        <LayoutAvatarBg title={"Tasks"}>
            <Box mt={5} pb={1} sx={{overflow:"visible"}}>

                {plants.length > 0 && myPlant
                    ? <TaskContainer tasks={myPlantTasks} plant={myPlant} />
                    : <NoTasksAvailable />
                }

            </Box>


            {/*  <TaskContainer title={"Possible tasks"} tasks={tasks}/> */}
            {// @ts-ignore
                plants.length > 0
                ? publicTasks.map((item: string | number, index: React.Key | null | undefined) => {
                    // filter plants and return the first plant that matches the plant id
                    // @ts-ignore
                    let plant = plants.filter((plant: any) => plant.PlantID === item)[0];

                    return <TaskContainer
                        key={index}
                        title={index !== 0 ? '' : "Possible tasks"}
                        plant={plant}
                        tasks={tasks[item]}/>
                })
                : ''
            }


        </LayoutAvatarBg>
    );
}


export default Tasks;