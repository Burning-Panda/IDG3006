import React from 'react';

interface iCheckFirstVisit {

}

export default class CheckFirstVisit implements iCheckFirstVisit {
    private firstVisit: boolean;

    constructor() {
        this.firstVisit = CheckFirstVisit.checkLocalStorage();
    }

    public isFirstVisit() {
        this.firstVisit = true;
        let onFirstVisit = CheckFirstVisit.checkLocalStorage()
        if (!onFirstVisit) {
            this.firstVisit = false;
        }

        return this.firstVisit;
    }

    public static saveCompletedFirstVisit() {
        CheckFirstVisit.saveFirstVisit('false');
    }


    // check local storage for first visit
    private static checkLocalStorage() {
        let checkStorage = localStorage.getItem('firstVisit');
        if (!checkStorage || checkStorage === 'true') {
            CheckFirstVisit.saveFirstVisit('true');
            return true;
        }
        return false
    }

    // save first visit to local storage
    private static saveFirstVisit(fv: string) {
        localStorage.setItem('firstVisit', fv);
    }

    public static clearLocalStorage() {
        localStorage.removeItem('firstVisit');
    }

}