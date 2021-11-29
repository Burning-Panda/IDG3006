import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import StartLayout from "../../_layouts/StartLayout";
import {Link, useParams} from "react-router-dom";
import {userStore} from "../../stores/user";

interface iStartLastStep {
}



function StartLastStep(props: iStartLastStep) {
    const i18n = {
        title: 'Sign in time',
        subtitle: "Here are the rules:",
        buttonSignin: 'Sign in',
        buttonNoUser: 'See plants and needs without user',
    }

    // @ts-ignore
    let { plant, avatar } = useParams();


    return (
        <StartLayout backlink={`/start/plant/${plant}/avatar`}>
            <Box sx={{px:2, height: '100%'}}>

                <Grid container
                      gap={4}
                      sx={{height: '100%'}}
                      direction="column"
                      textAlign={"center"}
                      alignItems="stretch"
                >
                    <Typography variant="h1" sx={{fontSize:24}}>{i18n.title}</Typography>

                    <Typography variant="h2" sx={{fontSize:20}}>{i18n.subtitle}</Typography>


                    <Typography variant={"body1"} sx={{fontSize:16}}>
                        Rewards will be given to the user with the highest points
                    </Typography>
                    <Typography variant={"body1"} sx={{fontSize:16}}>
                        You get some points every day you have a plant. Caring for plant will give you more points!
                    </Typography>
                    <Typography variant={"body1"} sx={{fontSize:16}}>
                        You will also receive <Typography component={"span"} sx={{fontSize:16, fontWeight:700}}>300 points</Typography> for joining!
                    </Typography>

                    <Box sx={{flex: 1}}/>

                    <Button variant={"contained"}
                            sx={{fontSize:16}}
                            fullWidth
                            component={Link}
                            to={`/signup/${avatar}/${plant}`}
                    >
                        {i18n.buttonSignin}
                    </Button>
                    <Button variant={"outlined"}
                            fullWidth
                            sx={{borderWidth:2, fontSize:16}}
                            onClick={() => {
                                userStore.setUser({
                                    name: 'SkipUser',
                                    points: 0,
                                    level: 1,
                                    isLoggedIn: true,
                                    plant: `${plant}`,
                                    avatar: `${avatar}`,
                                })
                            }}
                            component={Link}
                            to={'/'}
                    >{i18n.buttonNoUser}</Button>
                </Grid>
            </Box>
        </StartLayout>
    );
}

export default StartLastStep;