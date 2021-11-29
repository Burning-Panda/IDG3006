import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import React from 'react';
import Droplet from '../../static/svgs/Icons/Droplet.svg'
import Coins from '../../static/svgs/Icons/Coins.svg'
import {createTheme, LinearProgress, Skeleton} from "@mui/material";
import DifficultyLevel from "../typography/difficultyLevel";
import Points from "../svgs/points";
import {SetCompletedTask} from "../../utils/Fetch/Tasks";

export interface iTaskCard {
    _id?: string;
    title?: string;
    description?: string;

    difficultyLevel?: number;
    showDifficultyLevel?: boolean;

    reward?: string | number;
    rewardVisible?: boolean;

    buttonText?: string;
    buttonHidden?: boolean;

    timeLeft?: string;

    done?: boolean;

    showProgress?: boolean;
    currentProgress?: number;

    status?: string;
    publicTask?: boolean;
}

function TaskCard(
    {
        _id = '',
        title = "Ukjent",
        description = "Ukjent",

        // Difficulty level
        difficultyLevel = 1,
        showDifficultyLevel = true,

        // Rewards
        rewardVisible = false,
        reward = "Ingen",

        // Button
        buttonText = "Ukjent",
        buttonHidden = false,

        // Time left
        timeLeft = new Date().toISOString(),
        done = false,

        // Has Progressbar
        showProgress = false,
        currentProgress = 50,

        status,
        publicTask
    }: iTaskCard) {

    let themeColor = () => {
        if(status === "warning") return "error.light";
        else if(status === "focus") return "yellow.light";
        else if(status === "completed") return "primary.extraLight";
        else return "white";
    }

    let barColor = () => {
        if(status === "warning") return "error";
        else if(status === "focus") return "warning";
        else if(status === "completed") return "primary";
        else return "white";
    }

    const [visible, setVisible] = React.useState(true);

    return (
        <Card elevation={2}
              sx={{
                  height: visible ? "auto" : 0,
                  transition: "all 0.5s ease-in-out",
              }}>

            <Box padding={1}
                 sx={{
                     position:"relative",
                     bgcolor:themeColor,
                 }}
            >
                <Grid container
                      alignItems={'center'}
                      spacing={1}
                      marginTop={2}
                >
                    <Grid item sx={{textAlign: "center"}}>
                        <img src={Droplet} alt="Water" height={45}/>
                    </Grid>
                    <Grid item>
                        <Box mt={showDifficultyLevel || rewardVisible ? 1 : 0}>
                            <Typography variant={"h2"} sx={{fontWeight:"bold"}}>{title}</Typography>
                            <Typography variant={"body1"}>{description}</Typography>
                        </Box>

                    </Grid>
                </Grid>

                <Box my={2}>
                    <LinearProgress
                        variant="determinate"
                        value={currentProgress}
                        color={"error"}
                        sx={{
                            height: "10px",
                            borderRadius: "10px",

                            "& .MuiLinearProgress-bar": {
                                borderRadius: "10px",
                            }
                        }}
                    />
                </Box>

                {!buttonHidden
                    ? buttonText
                        ? <Grid container alignItems={"center"} justifyContent={"center"}>
                            <Button variant="contained"
                                    sx={{px:3}}
                                    onClick={() => {
                                        if (_id && _id !== "" && !done) {
                                            SetCompletedTask(_id).then(r => console.log('Completed Task',r));
                                            setVisible(false);
                                        }
                                    }}
                            >{buttonText}</Button></Grid>
                        : <Skeleton variant="rectangular"  width={100} height={30}  sx={{borderRadius:"20px"}} />
                    :null}

                <Box sx={{
                    top:10,
                    right:20,
                    position:"absolute",
                }}>
                    {
                        /* If both of these variables are false, it hides this entire box */
                        showDifficultyLevel || rewardVisible
                            ? <Grid container>
                                {/* This hides or shows the difficulty level text and icon */
                                    showDifficultyLevel
                                        ? difficultyLevel !== -1
                                            ? <Grid item><DifficultyLevel level={difficultyLevel} /></Grid>
                                            : <Skeleton variant="rectangular" />
                                        : null
                                }

                                {/* This hides or shows the reward text */
                                    rewardVisible
                                        ? <Grid item>
                                            <Points reward={reward} />
                                        </Grid>
                                        : null
                                }
                            </Grid>
                            : null
                    }
                </Box>
            </Box>
        </Card>
    );
}

export default TaskCard;