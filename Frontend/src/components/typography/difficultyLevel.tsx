import React from 'react';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PlantLevel from "../svgs/plantLevel";
import Box from "@mui/material/Box";


interface iDifficultyLevel {
    showInfoText?: boolean;
    infoText?: string;
    level?: number;
    iconSize?: number | string;
    iconPosition?: 'left' | 'right';

    textSize?: number | string;
    fontWeight?: number | string;
}

function DifficultyLevel(
    {
        showInfoText=false,
        infoText = 'Difficulty level',
        level=3,

        // Icon settings
        iconSize=20,
        iconPosition='left',

        // Text settings
        textSize=12,
        fontWeight=500
    }: iDifficultyLevel) {


    return (
        <Grid
            container
            alignItems="center"
            direction={iconPosition === 'right' ? 'row-reverse' : 'row'}
        >
            <Grid item>
                <PlantLevel level={level} size={iconSize} />
            </Grid>

            <Grid item>
                <Typography>
                    {showInfoText
                        ? `${infoText}: `
                        : null
                    }
                    <Box
                        component={"span"}
                        sx={{
                            fontWeight: fontWeight,
                            fontSize: textSize
                        }}
                    >
                        {returnLevelString(level)}
                    </Box>
                </Typography>
            </Grid>
        </Grid>
    );
}
function returnLevelString(level: number) {
    if (level >= 3) {
        return 'Expert'
    } else if (level === 2) {
        return 'Intermediate'
    } else {
        return 'Beginner'
    }
}


export default DifficultyLevel;