type iTempRange = {min: number; max:number;}
export interface IPlant {
    _id?: string;
    PlantID: string;
    name?: string;
    scientificName?: string;
    location?: string | boolean;
    difficultyLevel?: number;
    points?: number | null;
    picture?: any;
    image?: string;
    pictureAlt?: string;
    lightType?: number;
    temperature?: iTempRange | null;
    fertilization?: string;
    isTakenBy?: string;
    isTaken?: boolean;
}


export class Plant implements IPlant {
    _id: string                     = "";
    PlantID: string                 = "";
    name: string                    = "";
    scientificName: string          = "";
    location: string | boolean      = false;
    difficultyLevel: number         = -1;
    points: number | null           = -1;
    picture: any                    = "";
    pictureAlt: string              = "Ingenting her";
    lightType: number               = -1;
    temperature: iTempRange | null  = {min: -1, max: -1};
    fertilization: string           = "";
    isTaken: boolean                = false;

    public static getDefault(): Plant {
        return new Plant();
    }

    public static validate(data: IPlant) {
        if(data == null)
            return null;

        let def: IPlant = this.getDefault();
        data._id                = data._id              ?? def._id;
        data.PlantID            = data.PlantID          ?? def.PlantID
        data.name               = data.name             ?? def.name
        data.scientificName     = data.scientificName   ?? def.scientificName
        data.location           = data.location         ?? def.location
        data.difficultyLevel    = data.difficultyLevel  ?? def.difficultyLevel
        data.points             = data.points           ?? def.points
        data.picture            = data.picture          ?? def.picture
        data.pictureAlt         = data.pictureAlt       ?? def.pictureAlt
        data.lightType          = data.lightType        ?? def.lightType
        data.temperature        = data.temperature      ?? def.temperature
        data.fertilization      = data.fertilization    ?? def.fertilization
        data.isTaken            = data.isTaken          ?? def.isTaken

        return data;
    }
}