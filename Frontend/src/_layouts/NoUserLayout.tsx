import React from "react";
import Header from "../components/navbars/header";
import {Container} from "@mui/material";

interface iNoUserLayout {
    children: React.ReactNode
}



function NoUserLayout({children}: iNoUserLayout) {
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
        </>
    )
}

export default NoUserLayout;