import Measurement, { IMeasurements } from "./dto/Measurement";


export async function GetMyPlantMeasurements(PlantID:string): Promise<IMeasurements> {
    const url = `${process.env.REACT_APP_BASE_URL}/get/Measurement/latest/${PlantID}?auth=${process.env.REACT_APP_AUTH_TOKEN}`;
    let data: IMeasurements = await fetch(url).then(resp => {
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

    //@ts-ignore
    return Measurement.validate(data.data)
}