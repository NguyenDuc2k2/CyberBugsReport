/* eslint-disable no-useless-constructor */
import { BaseServices } from "./BaseServices";

class UserServices extends BaseServices {
    constructor() {
        super();
    }

    getUserSearch = (keyWord) => {
        return this.get(`Users/getUser?keyword=${keyWord}`)
    }

    assidnUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`, userProject)
    };

    getUserByProjectId = (idProject) => {
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
    }
}


export const userServices = new UserServices();