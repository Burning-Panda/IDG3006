import React  from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Link, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import Blop from "../../static/svgs/Blop.svg";
import Ouch from "../../static/svgs/Ouch.svg";
import Yupi from "../../static/svgs/Yupi.svg";
import ButtonNextPage from "../../components/startComponents/buttonNextPage";
import StartLayout from "../../_layouts/StartLayout";


interface iSelectAvatar {
}

const i18n = {
    title: "Select your avatar:",
    button: "I'm ready"
};

function SelectAvatar(props: iSelectAvatar) {
    // @ts-ignore
    let { plant } = useParams();
    const [selectedAvatar, setSelectedAvatar] = React.useState("");



    const avatars = [
        {id:1, name: 'Blop', image: Blop, imgAlt: "Avatar named Blop"},
        {id:2, name: 'Yupi', image: Yupi, imgAlt: "Avatar named Yupi"},
        {id:3, name: 'Auch', image: Ouch, imgAlt: "Avatar named Auch"},
    ]


    return (
        <StartLayout backlink={`/start/plant`}>
            <Typography textAlign={"center"} sx={{fontSize:24}}>{i18n.title}</Typography>

            <Grid container sx={{pt:3}} gap={4}>
                {avatars.map((avatar) => {
                    return (
                        <Grid container
                              key={avatar.id}
                              alignItems={"center"}
                              sx={{
                                  transition: "all 0.3s ease-in-out",
                                  borderRadius: "10px",
                                  boxShadow: "0px 0px 24px -5px #BABABA",
                                  opacity:
                                      selectedAvatar === avatar.name
                                          ? 1
                                          : selectedAvatar === ""
                                              ? 1
                                              : 0.5,

                              }}
                        >
                            <img src={avatar.image} width={100} alt={avatar.imgAlt} />
                            <Grid item px={2} sx={{
                                width: "calc(100% - 100px)",
                            }}>
                                <Button fullWidth
                                        variant={"contained"}
                                        sx={{
                                            transition: "all 0.3s ease-in-out",
                                            fontSize: selectedAvatar === avatar.name ? "1.1rem": "1rem"
                                        }}
                                        onClick={() => {
                                            if (selectedAvatar === "" || selectedAvatar !== avatar.name) {
                                                setSelectedAvatar(avatar.name)
                                            } else if(selectedAvatar === avatar.name) {
                                                // @ts-ignore
                                                setSelectedAvatar("")
                                            }}}
                                >
                                    {avatar.name}
                                </Button>
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
            <ButtonNextPage disabled={selectedAvatar === ""}
                            link={`/start/plant/${plant}/avatar/${selectedAvatar}`}
                            buttonText={i18n.button}
                />
        </StartLayout>
    );
}



export default SelectAvatar;