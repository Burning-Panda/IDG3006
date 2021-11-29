import {IPlant, Plant} from "./dto/Plant";


/*
async function getData(): Promise<void> {
        let data = await fetch(`${process.env.REACT_APP_BASE_URL}/get/Plants?auth=${process.env.REACT_APP_AUTH_TOKEN}`, {
            method: 'GET',
            mode: "no-cors",
        })
            .then(async response => {
                let jsonObject;
                if(response.ok) {
                    jsonObject = await response.json();
                }
                if(!response.ok) {
                    const error = response.statusText;
                    return Promise.reject(error);
                }
                return jsonObject
            }).then(jsonObject => {
                console.log(jsonObject)
                setPlants(jsonObject);
                setLoading(false);
            })
            .catch(err => console.log(err));

        return data;

    }
 */

export async function GetMyPlant(PlantID:string): Promise<IPlant> {
    const url = `${process.env.REACT_APP_BASE_URL}/get/Plant/${PlantID}?auth=${process.env.REACT_APP_AUTH_TOKEN}`;
    let data: IPlant = await fetch(url).then(resp => {
        let jsonObject;
        if(resp.ok) {
            //@ts-ignore
            jsonObject = resp.json();
        }
        if(!resp.ok) {
            const error = resp.statusText;
            console.log(error);
            return Promise.reject(error);
        }
        return jsonObject;
    }).catch(err => {
        console.log(err);
        return null;
    })

    if (data !== null) {
        // @ts-ignore
        return Plant.validate(data.data)
    }
    return data
}

export async function GetPlants(plantID: number): Promise<IPlant | null> {
    /*
    const url = `${process.env.REACT_APP_BASE_URL}/get/Plants?auth=${process.env.REACT_APP_AUTH_TOKEN}`;

    let data: IWatermeter = await fetch (url).then(response => {
        let jsonObject;
        if(response.ok) {
            jsonObject = response.json();
        }
        if (!response.ok) {
            const error = response.statusText;
            return Promise.reject(error);
        }

        return jsonObject;
    }).catch(error => {
        console.log(error);
    });

    return Watermeter.validate(data);
    * */
    return null
}

export interface iGetAllPlants {
    ok: boolean;
    data: IPlant[] | [];
    error?:string
}

export async function fetchAllPlants(): Promise<iGetAllPlants> {

    const url = `${process.env.REACT_APP_BASE_URL}/get/Plants?auth=${process.env.REACT_APP_AUTH_TOKEN}`;

    // @ts-ignore
    let data: getAllPlants = await fetch(url).then(async response => {
        let json;
        if(response.ok) {
            json = await response.json() as iGetAllPlants;
        }
        if (!response.ok) {
            const error = response.statusText;
            return Promise.reject(error);
        }
        return json;

    }).catch(error => {
        console.log(error);
    });

    return data;
}

export async function fetchAllPlantsInArray(plants: [] | null) {
    const url = `${process.env.REACT_APP_BASE_URL}/get/Plants/AllPlants?auth=${process.env.REACT_APP_AUTH_TOKEN}&plants=${plants ? plants.join(',') : ''}`;
    // @ts-ignore
    let data: getAllPlants = await fetch(url).then(async response => {
        let json;
        if(response.ok) {
            json = await response.json() as iGetAllPlants;
        }
        if (!response.ok) {
            const error = response.statusText;
            return Promise.reject(error);
        }
        return json;

    }).catch(error => {
        console.log(error);
    });
    //console.log(data)
    return data.data;
}