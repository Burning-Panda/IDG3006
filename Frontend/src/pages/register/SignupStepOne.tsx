import React, {useEffect} from 'react';
import TextField from "@mui/material/TextField";
import StartLayout from "../../_layouts/StartLayout";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {Link, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {userStore} from "../../stores/user";

interface iSignupStepOne {

}



function SignupStepOne(props: iSignupStepOne) {


    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatedPassword, setRepeatedPassword] = React.useState('');
    const [isSamePassword, setIsSamePassword] = React.useState(true);
    const [isNTNUmail, setIsNTNUmail] = React.useState(true);
    const [isAllValidated, setIsAllValidated] = React.useState(false);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleRepeatedPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatedPassword(event.target.value);
    };

    const handleSubmit = () => {
        if(isSamePassword && isNTNUmail && isAllValidated){
            userStore.setUser({
                email: email,
                name: name,
                points: 0,
                level: 1,
                isLoggedIn: true,
                plant: plant,
                avatar: avatar,
            });
        }
    };

    useEffect(() => {
        if (password !== repeatedPassword) {
            setIsSamePassword(false);
        } else {
            setIsSamePassword(true);
        }
    }, [password, repeatedPassword]);
    useEffect(() => {
        // check if email contains @ntnu.no or @stud.ntnu.no and is a valid email
        if (email.includes('@ntnu.no') || email.includes('@stud.ntnu.no')) {
            setIsNTNUmail(true);
        } else {
            setIsNTNUmail(false);
        }
    }, [email]);

    useEffect(() => {
        if (name !== '' && email !== '' && password !== '' && repeatedPassword !== '' && isSamePassword && isNTNUmail) {
            setIsAllValidated(true);
        } else {
            setIsAllValidated(false);
        }
    }, [name, email, password, repeatedPassword, isSamePassword, isNTNUmail]);


    const i18n = {
        title: "Excellent",
        subtitle: "Now its time to sign up",
        buttonNext: "Next",

        email: {
            label: "NTNU-mail",
            placeholder: "example@ntnu.no or @stud.ntnu.no"
        },
        password: {
            label: "Password",
            placeholder: ""
        },
        repeatPassword: {
            label: "Repeat password",
            placeholder: ""
        },
        nickname: {
            label: "Nickname",
            placeholder: ""
        },
    }
    // @ts-ignore
    let { plant, avatar } = useParams();

    return (
        <StartLayout backlink={`/start/plant/${plant}/avatar/${avatar}`}>
            <Grid container
                  gap={4}
                  sx={{
                      pt:10,
                      height: '100%',
                      px:2
                  }}
                  direction="column"
                  textAlign={"center"}
            >
                <Typography variant="h1" sx={{fontSize:24}}>{i18n.title}</Typography>

                <Typography variant="h2" sx={{fontSize:20}}>{i18n.subtitle}</Typography>

                <Grid container gap={2}>
                    <TextField id="email"
                               label={i18n.email.label}
                               variant="outlined"
                               onChange={handleEmailChange}
                               fullWidth
                               value={email}
                               error={!isNTNUmail}
                               helperText={!isNTNUmail ? 'Please use a NTNU-mail' : ''}
                    />
                    <TextField id="password"
                               type="password"
                               label={i18n.password.label}
                               variant="outlined"
                               onChange={handlePasswordChange}
                               fullWidth
                               value={password} />
                    <TextField id="password-repeat"
                               error={!isSamePassword}
                               type="password"
                               label={i18n.repeatPassword.label}
                               variant="outlined"
                               onChange={handleRepeatedPasswordChange}
                               fullWidth
                               value={repeatedPassword}
                               helperText={!isSamePassword ? "Passwords do not match" : ""}
                    />
                    <TextField id="nickname"
                               label={i18n.nickname.label}
                               variant="outlined"
                               onChange={handleNameChange}
                               fullWidth
                               value={name}
                    />
                </Grid>
            </Grid>
            <Box
                textAlign={"center"}
            sx={{
                position: 'fixed',
                bottom: 50,
                width: '100vw',
            }}>
                <Button variant={"contained"}
                        sx={{fontSize:16, px:5}}
                        component={Link}
                        disabled={!isAllValidated}
                        onClick={handleSubmit}
                        to={`/signup/privacy`}
                >{i18n.buttonNext}</Button>
            </Box>
        </StartLayout>
    );
}

export default SignupStepOne;