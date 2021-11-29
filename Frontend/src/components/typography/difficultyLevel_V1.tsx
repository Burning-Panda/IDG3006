import React from 'react';
import Typography from "@mui/material/Typography";
import NatureIcon from "@mui/icons-material/Nature";
import NatureOutlinedIcon from '@mui/icons-material/NatureOutlined';
import Box from "@mui/material/Box";


interface iDifficultyLevel {
    infoText?: string;
    level?: number;
}

function DifficultyLevel({infoText = 'Difficulty level', level=3}: iDifficultyLevel) {
    let icons = returnIcons(level)
    return (
        <Box >
            <Typography>{infoText}: <strong>{returnLevelString(level)}</strong></Typography>
            <Box>
                {icons.map(item => {
                    return item;
                })}
            </Box>
        </Box>
    );
}
function returnLevelString(level: number) {
    switch (level) {
        case 3:
            return 'Expert'
        case 2:
            return 'Intermediate'
        case 1:
            return 'Easy'
        default:
            return 'Something went wrong'
    }
}
function returnIcons(number:number) {
    if (!number || (number === 0)) return [<NatureIcon />]

    let icons = []
    for (let i = 0; i < number; i++) {
        icons.push(<NatureIcon color="primary"/>)
    }
    if(number < 3 && number > 0) {
        let emptyNum = 3 - number
        for (let i = 0; i < emptyNum; i++) {
            icons.push(<NatureOutlinedIcon color="primary" />)
        }
    }

    return icons;
}

export default DifficultyLevel;