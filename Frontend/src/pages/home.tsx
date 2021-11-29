import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import BasicInfo from "../components/myPlant/basicInfo";
import plant from "../static/images/plant-1.webp";
import PlantTabs from "../components/myPlant/plantTabs";
import LayoutAvatarBg from "../components/layouts/Layout_AvatarBG";
import {IPlant, Plant} from "../utils/Fetch/dto/Plant";
import {GetMyPlant} from "../utils/Fetch/Plants";
import {iUser} from "../stores/user";

interface iHome {
    user: iUser;
}

function Home({user}: iHome) {
    const [ownedPlant, setOwnedPlant] = React.useState<IPlant | null>(Plant.getDefault());

    useEffect(() => {
        GetMyPlant(user.plant).then(res => {
            // @ts-ignore
            setOwnedPlant(res)})

    }, [user.plant]);

    return (
        <LayoutAvatarBg title={"My Plant"}>
            <Box mt={4}>
                <BasicInfo name={
                    //@ts-ignore
                    ownedPlant.name || "My Plant"}
                   picture={//@ts-ignore
                           {image: ownedPlant?.image || ownedPlant.picture || plant, alt: ownedPlant.pictureAlt || "No Alt"}}
                           scientificName={//@ts-ignore
                               ownedPlant.scientificName || "No scientific name"}
                           location={//@ts-ignore
                               ownedPlant.location || "No location"}
                />
                <PlantTabs plantID={user.plant} plantData={ownedPlant}/>
            </Box>
        </LayoutAvatarBg>
    );
}

/*


 */



export default Home;
