import TaskClass, {iTaskClass} from "./dto/Task";
import {userStore} from "../../stores/user";

export async function GetMyPlantTask(PlantID:string): Promise<iTaskClass | null> {
    const url = `${process.env.REACT_APP_BASE_URL}/get/Task/plant/${PlantID}?auth=${process.env.REACT_APP_AUTH_TOKEN}`;
    let data: {ok:boolean; data: iTaskClass[]} = await fetch(url).then(resp => {
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
        // @ts-ignore
        return jsonObject;
    }).catch(err => {
        console.log(err);
        return null;
    })

    if (data.ok) {
        // @ts-ignore
        return data.data.map(task => {return TaskClass.validate(task)})
    }
    return null
}

export async function SetCompletedTask(TaskID:string): Promise<boolean> {
    const url = `${process.env.REACT_APP_BASE_URL}/set/Task/completed/${TaskID}?auth=${process.env.REACT_APP_AUTH_TOKEN}&user=${userStore.getUserName()}`;
    // update a task in the database
    let data: {ok:boolean} = await fetch(url).then(resp => {
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
        // @ts-ignore
        return jsonObject;
    }).catch(err => {
        console.log(err);
        return false;
    })

    return data.ok;

}

export async function getPublicTasks(): Promise<iTaskClass[] | null> {
    const url = `${process.env.REACT_APP_BASE_URL}/get/Task/public?auth=${process.env.REACT_APP_AUTH_TOKEN}${userStore.isLoggedIn() ? `&plant=${userStore.getPlant()}` : ''}`;
    let data: {ok:boolean; data: any} = await fetch(url).then(resp => {
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
        // @ts-ignore
        return jsonObject;
    }).catch(err => {
        console.log(err);
        return null;
    })

    if (data.ok) {
        // @ts-ignore
        return TaskClass.validatePublic(data.data)
    }
    return null
}