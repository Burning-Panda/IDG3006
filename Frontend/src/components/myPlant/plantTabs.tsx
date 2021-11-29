import React, {useEffect} from 'react';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./TabPanel";
import Box from "@mui/material/Box";
import Needs from "../tabs/needs";
import Measurement from "../../utils/Fetch/dto/Measurement";
import {GetMyPlantMeasurements} from "../../utils/Fetch/Measurements";
import Grid from "@mui/material/Grid";
import SensorCard from "../cards/sensorCard";
import {CelciusIcon, SunIcon, UtensilsIcon} from "../svgs/svgIcons";
import {IPlant} from "../../utils/Fetch/dto/Plant";
import { GetMyPlantTask } from '../../utils/Fetch/Tasks';
import { TransitionGroup} from "react-transition-group";



interface iPlantTabs {
    plantID: string;
    plantData: IPlant | null;
}

function PlantTabs(props: iPlantTabs) {
    const [currTab, setCurrTab] = React.useState(0);

    const [lastMeasurements, setLastMeasurements] = React.useState<Measurement>(Measurement.getDefault());
    const [tasks, setTasks] = React.useState<[any] | null>(null);


    const [lightMeasurements, setLightMeasurements] = React.useState<number>(0);
    const [temperatureMeasurements, setTemperatureMeasurements] = React.useState<number>(0);
    const [humidityMeasurements, setHumidityMeasurements] = React.useState<number>(0);
    const [moistureMeasurements, setMoistureMeasurements] = React.useState<number>(0);



    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrTab(newValue);
    };

    useEffect(() => {
        if(props.plantID && props.plantID !== "") {
            GetMyPlantMeasurements(props.plantID).then(res => {
                //@ts-ignore
                setLastMeasurements(res);
                setLightMeasurements(Number(res.light));
                setTemperatureMeasurements(Number(res.temperature));
                setHumidityMeasurements(Number(res.humidity));
                setMoistureMeasurements(Number(res.moisture));
            })

            GetMyPlantTask(props.plantID).then(res => {
                //@ts-ignore
                setTasks(res);

            })
        }
    }, [props.plantID])



    //${props.plantData.temperature.min} - ${String(props.plantData.temperature.max)
    /* Color Setting */
    const sunny = lightMeasurements > 70 ? "Too Sunny" : lightMeasurements > 45 ? "I am all good" : lightMeasurements > 25 ? "Partly Sunny" : "Too Dark"
    const sunColor = lightMeasurements > 50 ? "primary" : lightMeasurements > 25 ? "warning" : "error"

    //@ts-ignore
    const tempExistsCheckMin = props.plantData.temperature.min ? props.plantData.temperature.min : 10, tempExistsCheckMax = props.plantData.temperature.max ? props.plantData.temperature.max : 30
    // set color based on temperature +- 5
    const tempColor =
        temperatureMeasurements > tempExistsCheckMin - 5 && temperatureMeasurements < tempExistsCheckMax + 5
            ? "primary" : temperatureMeasurements > tempExistsCheckMax + 5 ? "error" : "warning"




    // @ts-ignore
    return (
        <Box mt={2}>
            <Tabs
                value={currTab}
                onChange={handleChange}
                indicatorColor="primary"
                centered
                variant="fullWidth"
                sx={{
                    borderColor: "#517701",
                    "& .Mui-selected": {
                        borderWidth: "3px",
                        color: "#517701"
                    },
                    "& button": {
                        fontSize: "20px",
                        fontWeight:400,
                        fontStyle:"normal",
                        px:"0px",
                        textTransform: "capitalize"
                    },
                    "& .MuiTabs-indicator": {
                        backgroundColor: "#517701",
                        height:3
                    }
                }}
            >
                <Tab label="Needs" {...a11yProps(0)}/>
                <Tab label="Tips" {...a11yProps(1)}/>
                <Tab label="My Story" {...a11yProps(2)}/>
            </Tabs>

            <TabPanel value={currTab} index={0}>
                <Box sx={{mx: "-24px"}}>
                    <Needs Cards={tasks} />


                        <TransitionGroup component={Grid} container direction={"column"} gap={2}>
                            <SensorCard
                                title={sunny}
                                info={
                                    // @ts-ignore
                                    String(props.plantData.lightType) || "Unknown"}
                                icon={<SunIcon size={40}/>}
                                progressBar={lightMeasurements}
                                coloring={sunColor}
                            />
                            <SensorCard
                                title={"I am all good"}
                                info={// @ts-ignore
                                    `Temperature between ${props.plantData.temperature.min} - ${String(props.plantData.temperature.max)}` || "Temperature: 20 ℃"}
                                icon={<CelciusIcon size={40} />}
                                progressBar={temperatureMeasurements}
                                coloring={tempColor}
                            />
                            <SensorCard
                                title={"I am all good"}
                                info={//@ts-ignore
                                    props.plantData.fertilization || "Unknown"}
                                icon={<UtensilsIcon size={40} />}
                                progressBar={90}
                            />
                        </TransitionGroup>
                </Box>



            </TabPanel>

            <TabPanel value={currTab} index={1}>
                Item Two
            </TabPanel>

            <TabPanel value={currTab} index={2}>
                Item Three
            </TabPanel>
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



export default PlantTabs;