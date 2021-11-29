import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FilledButton from "../buttons/filledButton";
import React from "react";

export default  function NoTasksAvailable() {
    return (
        <Box textAlign={"center"}>
            <Typography variant={"h2"} component={"p"}>
                Wow!
            </Typography>
            <Typography variant={"h2"} component={"p"}>
                you are all done!
            </Typography>
            <Typography variant={"h2"} component={"p"} mt={3}>
                Good job!
            </Typography>

            <Box mt={2}>
                <FilledButton text={"See task history"} />
            </Box>
        </Box>
    )
}