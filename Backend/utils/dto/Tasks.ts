export interface iTaskClass {
    reward: number;
    title: string;
    description: string;
    showDifficultyLevel: boolean;
    buttonText: string;
    taskStatus: string;
    hasProgressBar: boolean;
    status: string
    rewardVisible: boolean;
}

export default class TaskClass implements iTaskClass {
    buttonText:             string  = "";
    description:            string  = "";
    hasProgressBar:         boolean = false;
    reward:                 number  = 0;
    rewardVisible:          boolean = false;
    showDifficultyLevel:    boolean = false;
    status:                 string  = "";
    taskStatus:             string  = "";
    title:                  string  = "";

    public static getDefault() {
        return new TaskClass()
    }

    public static validate(data: iTaskClass) {
        if(data == null)
            return null;

        let def: iTaskClass = this.getDefault();

        data.buttonText             = data.buttonText           ?? def.buttonText;
        data.description            = data.description          ?? def.description;
        data.hasProgressBar         = data.hasProgressBar       ?? def.hasProgressBar;
        data.reward                 = data.reward               ?? def.reward;
        data.rewardVisible          = data.rewardVisible        ?? def.rewardVisible;
        data.showDifficultyLevel    = data.showDifficultyLevel  ?? def.showDifficultyLevel;
        data.status                 = data.status               ?? def.status;
        data.taskStatus             = data.taskStatus           ?? def.taskStatus;
        data.title                  = data.title                ?? def.title;
    }
}
