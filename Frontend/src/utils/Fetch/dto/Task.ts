export interface iTaskClass {
    PlantID:                string;
    title:                  string;
    description:            string;
    reward:                 number;
    created:                string;
    isBooked:               boolean;
    isPublic:               boolean;
    hasProgressBar:         boolean;
    showDifficultyLevel:    boolean;
    rewardVisible:          boolean;
    buttonText:             string;
}

type iValidatePublic = {
    [key: number | string]: iTaskClass[]
}

export default class TaskClass implements iTaskClass {
    PlantID:                string  = "";
    title:                  string  = "";
    description:            string  = "";
    reward:                 number  = 0;
    created:                string  = new Date().toISOString();
    isBooked:               boolean = false;
    isPublic:               boolean = false;
    hasProgressBar:         boolean = true;
    showDifficultyLevel:    boolean = false;
    rewardVisible:          boolean = true;
    buttonText:             string  = "Complete task";

    public static getDefault() {
        return new TaskClass()
    }

    public static validate(data: iTaskClass) {
        if(data == null)
            return null;

        let def: iTaskClass = this.getDefault();

        data.PlantID                = data.PlantID              ?? def.PlantID;
        data.title                  = data.title                ?? def.title;
        data.description            = data.description          ?? def.description;
        data.reward                 = data.reward               ?? def.reward;
        data.created                = data.created              ?? def.created;
        data.isBooked               = data.isBooked             ?? def.isBooked;
        data.isPublic               = data.isPublic             ?? def.isPublic;
        data.hasProgressBar         = data.hasProgressBar       ?? def.hasProgressBar;
        data.showDifficultyLevel    = data.showDifficultyLevel  ?? def.showDifficultyLevel;
        data.rewardVisible          = data.rewardVisible        ?? def.rewardVisible;
        data.buttonText             = data.buttonText           ?? def.buttonText;

        return data;
    }


    public static validatePublic(data: iValidatePublic) {
        if(data == null)
            return null;

        let keys:(string|number)[] = Object.keys(data);


        keys.map(key => {
            // @ts-ignore
            return data[key] = data[key].map(item => {
                return this.validate(item);
            });
        });



        return data
    }
}
