export {};
import {isEmpty} from 'lodash';
import {IMeasurements} from "../dto/Measurments";

/**
 *
 * @param keys
 * @param data
 * @returns {Array} Valid object ready for parsing and input into the database.
 */
export function parseOne(keys: Array<string>, data: Object): {} | boolean {
    const acceptableKeys = keys;
    const bodyKeys = Object.keys(data);

    let returnData = {}

    for (let key in bodyKeys) {
        if(acceptableKeys.includes(String(bodyKeys[key]))) {
            returnData[bodyKeys[key]] = data[bodyKeys[key]];
        }
    }
    if (isEmpty(returnData)) return false
    return returnData;
}

/**
 *
 * @param keys
 * @param data
 * @returns {Array<IMeasurements> | boolean} Returns a list of Objects ready for the database
 */
export function parseMany(keys: Array<string>, data:any): Array<{}> | {}[] | boolean {
    let returnData:any = []


    data.map(obj => returnData.push(parseOne(keys, obj)))


    if (isEmpty(returnData)) return false
    return returnData;
}
