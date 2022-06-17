import { BaseServices } from "./BaseServices";

/* eslint-disable no-useless-constructor */
class CyberBugsSevicer extends BaseServices {
    constructor() {
        super();
    }
    signinCyberBugs = (userLogin) => {
        return this.post(`users/signin`, userLogin)
    }

    getListProject = () => {
        return this.get(`Project/getAllProject`)
    }

    getAllProjectCategory =()=>{
        return this.get(`ProjectCategory`)
    }
};


export const cyberBugsSevicer = new CyberBugsSevicer();