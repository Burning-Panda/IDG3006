import React from 'react';
import Typography from "@mui/material/Typography";
import StartLayout from "../../_layouts/StartLayout";
import Grid from "@mui/material/Grid";
import {Link, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {userStore} from "../../stores/user";
import CheckFirstVisit from "../../stores/firstVisit";

interface iSignupPrivacyPolicy {

}

function SignupPrivacyPolicy(props: iSignupPrivacyPolicy) {
    const i18n = {
        title: 'Privacy policy',
        subtitle: "Summary",
        buttonNext: "I accept",

        paragraphs: [
            'Your email will be used to confirm that you are a student',
            'Data will be stored locally',
            'Your account can be deleted at any time'
        ]
    }

    const plantAndAvatarFromUserStore = userStore.getAvatarAndPlant()



    return (
        <StartLayout backlink={`/signup/${plantAndAvatarFromUserStore.avatar}/${plantAndAvatarFromUserStore.plant}`}>
            <Grid container
                  gap={4}
                  sx={{
                      pt:10,
                      height: '100%',
                      px:2
                  }}
                  direction="column"
                  textAlign={"center"}
                  justifyContent="center"
                  alignItems="center"
            >
                <Typography variant="h1" sx={{fontSize:24}}>{i18n.title}</Typography>

                <Typography variant="h2" sx={{fontSize:20}}>{i18n.subtitle}</Typography>

                <Grid container direction={"column"} gap={2} textAlign={"left"} sx={{maxWidth:250}}>
                    {i18n.paragraphs.map((p, i) => (
                        <Typography key={i} variant="body1" sx={{fontSize:16}}>{p}</Typography>
                    ))}
                </Grid>

                <Button variant="contained"
                        sx={{fontSize:16, px:5}}
                        component={Link}
                        onClick={() => {
                            userStore.updateAcceptedTerms(true);
                            CheckFirstVisit.saveCompletedFirstVisit();
                        }}
                        to={`/`}
                >
                    {i18n.buttonNext}
                </Button>
            </Grid>
        </StartLayout>
    );
}

export default SignupPrivacyPolicy;