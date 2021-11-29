export type tempRange = {
    min?:Number;
    max?:Number;
}

export interface IPlant {
    PlantID?:           String;
    name:               String;
    scientificName?:    String;
    wateringType?:      String;
    lightType?:         String;
    tempRange?:         tempRange;
    fertilization?:     String;
    recentlyWatered?:   Boolean;
    whoWatered?:        String;
    difficulty?:        Number;
    isTakenBy?:         String;
    endTakenDate?:      String;

}

/**
 * Validate plant data and return standardized values.
 * To be used for frontend display.
 * @param data
 * @constructor
 * @returns IPlant
 */

export default class Plant implements IPlant{

    name:               String      = "";
    scientificName?:    String      = "";
    wateringType?:      String      = "";
    lightType?:         String      = "";
    tempRange?:         tempRange   = {min: 0, max: 10};
    fertilization?:     String      = "";
    recentlyWatered?:   Boolean     = true;
    whoWatered?:        String      = "";
    difficulty?:        Number      = 0;
    isTakenBy?:         String      = "";
    endTakenDate?:      String      = "";

    public static getDefault() {
        return new Plant();
    }

    public static validate(data: IPlant) {
        if(data == null)
            return null;

        let def: IPlant = this.getDefault();


        data.name               = data.name             ?? def.name;
        data.scientificName     = data.scientificName   ?? def.scientificName;
        data.wateringType       = data.wateringType     ?? def.wateringType;
        data.lightType          = data.lightType        ?? def.lightType;
        data.tempRange          = data.tempRange        ?? def.tempRange;
        data.fertilization      = data.fertilization    ?? def.fertilization;
        data.recentlyWatered    = data.recentlyWatered  ?? def.recentlyWatered;
        data.whoWatered         = data.whoWatered       ?? def.whoWatered;
        data.difficulty         = data.difficulty       ?? def.difficulty;
        data.isTakenBy          = data.isTakenBy        ?? def.isTakenBy;
        data.endTakenDate       = data.endTakenDate     ?? def.endTakenDate;

        return data;
    }
}