export type IMeasurements = {
    timestamp?:      Date;
    PlantID?:       string;
    moisture?:      string | number;
    humidity?:      string | number;
    light?:         string | number;
    temperature?:   string | number;
}
type promisedReturnValue = IMeasurements | false | null;

/**
 * If no data is provided or some data is missing, a null is returned.
 * A request should be sent to the microcontroller to check if they have the missing data.
 * @param data
 * @constructor
 * @returns promisedReturnValue
 */
export default class Measurement implements IMeasurements {
    PlantID:        string  = "";
    moisture:       string  = "";
    humidity:       string  = "";
    light:          string  = "";
    temperature:    number  = -1;


    public static getDefault() {
        return new Measurement();
    }

    public static validate(data: IMeasurements) {
        if(data == null)
            return null;

        let def: IMeasurements = this.getDefault();

        data.PlantID        = data.PlantID      ?? def.PlantID;
        data.moisture       = data.moisture     ?? def.moisture;
        data.humidity       = data.humidity     ?? def.humidity;
        data.light          = data.light        ?? def.light;
        data.temperature    = data.temperature  ?? def.temperature;

        return data;
    }
}


module.exports = Measurement;
