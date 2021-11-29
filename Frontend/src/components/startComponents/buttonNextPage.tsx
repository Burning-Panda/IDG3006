import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import React from "react";

interface iNextButton {
    disabled: boolean;
    link: string;
    buttonText: string;
}
function ButtonNextPage(props: iNextButton) {
    return <Box sx={{
        position:"fixed",
        bottom:0,
        left:0,
        right:0,
        width:"100vw",
        height:"70px",
        backdropFilter: "blur(50px)",
        bgcolor: "primary.extraLight"
    }} textAlign={"center"}>
        <Button disabled={props.disabled}
                variant={"contained"}
                sx={{px:4, mt:1.5}}
                component={Link}
                to={props.link}
        >{props.buttonText}</Button>
    </Box>
}

export default ButtonNextPage;
