import React from 'react';

export interface iUser {
    email?: string;
    name: string;
    points: number;
    isLoggedIn: boolean;
    level: number;
    plant: string;
    avatar: string;
    acceptedTerms?: boolean;
}

/* a react user store class using localStorage with typescript types */



export class userStore extends React.Component<{}, iUser> {
    private user: iUser;
    static user: iUser;
    public props:any;




    constructor() {
        // @ts-ignore
        super();
        this.user = userStore.getUser() || {
            email: '',
            name: '',
            points: 0,
            level: 1,
            isLoggedIn: false,
            plant: '',
            avatar: '',
            acceptedTerms: false,
        };
    }

    componentDidUpdate() {
        userStore.user = this.user;
    }


    public static getUserName() {
        return this.getUser().name
    }

    public static getUser(): iUser {
        if (!this.user) {
            this.user = this.getUserFromLocalStorage()
            this.saveUser()
        }
        return this.user;

    }

    public static setUser(user: iUser): void {
        if(!user) return;
        this.user = user;
        this.saveUser();
        return;
    }

    // Is logged in?
    public static isLoggedIn(): boolean {
        return this.getUser().isLoggedIn;
    }

    /* Logs the user in */
    public static login(user: iUser): void {
        this.user.name = user.name  || '';
        this.user.points = user.points || 0;
        this.user.level = user.level  || 1;
        this.user.isLoggedIn = true;
        this.user.plant = user.plant || '';
        this.user.avatar = user.avatar || '';
        this.user.acceptedTerms = user.acceptedTerms || false;

        this.saveUserToLocalStorage(this.user);
    }

    public static getPlant(): string {
        return this.getUser().plant;
    }

    public static getAvatar(): string {
        return this.getUser().avatar;
    }

    public static getAvatarAndPlant(): {avatar: string, plant: string} {
        if(!this.user) this.getUserFromLocalStorage();
        return {plant: this.getPlant(), avatar: this.getAvatar()}
    }

    /* Clears out the user from the app */
    public static logout(): void {
        this.clear();
        this.user.email = '';
        this.user.name = '';
        this.user.points = 0;
        this.user.level = 0;
        this.user.isLoggedIn = false;
        this.user.plant = '';
        this.user.avatar = '';
        this.user.acceptedTerms = false;
    }

    public static updateAcceptedTerms(acceptedTerms: boolean): void {
        this.user.acceptedTerms = acceptedTerms;
        this.saveUserToLocalStorage(this.user);
    }

    /* Adds new points to the user */
    public static addPoints(points: number): void {
        this.user.points += points;
        this.saveUser();
    }

    /* Adds a level to the user */
    public static addLevel(level: number): void {
        if(this.user.level < 3)this.user.level += level;
        this.saveUser();
    }


    /* Clear user from local storage */
    public static clear(): void {
        localStorage.removeItem('user');
    }

    /* Controls the saving of user to local storage */
    private static saveUserToLocalStorage(user: iUser): void {
        localStorage.setItem('user', JSON.stringify(user));
    }


    /* Checks if user exists in local storage or returns a new user using iUser */
    private static getUserFromLocalStorage(): iUser {
        let user: iUser;
        if (localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user') as string);
        } else {
            user = {
                email: '',
                name: '',
                points: 0,
                level: 0,
                isLoggedIn: false,
                plant: '',
                avatar: '',
                acceptedTerms: false,
            };
        }
        return user;
    }

    /* shortened save function*/
    public static saveUser() {
        this.saveUserToLocalStorage(this.user);
    }
}