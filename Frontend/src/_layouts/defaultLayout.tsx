import React from 'react';
import Navbar from '../components/navbars/navbar';
import {Container} from "@mui/material";
import Header from '../components/navbars/header';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";
import {BackButtonIcon} from "../components/svgs/svgIcons";
import Typography from "@mui/material/Typography";

interface iLayout {
    children: React.ReactNode;
    links?: {
        name: string,
        link: string,
        icon: JSX.Element,
    }[]
    backlink?: string;
    startScreen?: boolean;
}

function Layout({children, links, backlink, startScreen}: iLayout) {
    if (startScreen) {
        return (
            <Container
                maxWidth="sm"
                sx={{
                    px:2,
                }}
            >
                {children}
            </Container>
        )
    }

    return (
        <>
            <Header />
            <Container
                maxWidth="sm"
                sx={{
                    pb: 15,
                    pt: 10,
                }}
            >
                {children}
            </Container>
            <Navbar links={links} />
        </>
    )
}


export default Layout;