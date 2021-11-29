import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {Badge, Paper} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import RoomIcon from "@mui/icons-material/Room";
import {OverviewIcon} from "../svgs/svgIcons";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {useState} from "react";

interface iNavbar {
    links?: {
        name: string,
        link: string,
        icon: JSX.Element,
    }[]
}




export default function Navbar({links = [{name:"Empty", link: "/", icon:<HomeIcon/>}] }: iNavbar) {
    const [value, setValue] = React.useState(0);
    const [notificationVisibility, setNotificationVisibility] = useState(false);

    let notificationIcon = <Badge color="primary" variant="dot" invisible={notificationVisibility}><AssignmentIcon /></Badge>


    const navbarLinks = [
        {name:"Home", link: "/", icon:<HomeIcon/>, number:0},
        {name:"Tasks", link: "/tasks", icon:notificationIcon, number: 1},
        {name:"Map", link: "/map", icon:<RoomIcon />, number: 2},
        {name:"Overview", link: "/Plants", icon:<OverviewIcon backgroundFill={value === 3 ? "#62851A" : "rgb(255,255,255)"} />, number: 3}
    ]


    //console.log(value)
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                {
                    navbarLinks.map((link, index) => {
                        return <BottomNavigationAction
                            key={index}
                            component={Link}
                            to={link.link}
                            label={link.name}
                            icon={link.icon}
                        />
                    }

                )}

            </BottomNavigation>
        </Paper>
    );
}