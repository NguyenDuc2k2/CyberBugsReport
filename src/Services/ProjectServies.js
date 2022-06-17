/* eslint-disable no-useless-constructor */
import { BaseServices } from "./BaseServices";


class ProjectServices extends BaseServices {
  constructor() {
    super()
  }

  getProjectDetail = (projectId) => {
    return this.get(`Project/getProjectDetail?id=${projectId}`)
  }

  createProject = (newProject) => {
    return this.post(`Project/createProjectAuthorize`, newProject)
  }

  updateProject = (projectUpdate) => {
    return this.put(`Project/updateProject?projectId=${projectUpdate.id}`)
  }

  deleteProject = (idProject) => {
    return this.delete(`Project/deleteProject?projectId=${idProject}`)
  }

  deleteUserProject = (userPorject) => {
    return this.post(`Project/removeUserFromProject`, userPorject)
  }


  assignUserProject = (userProject) => {
    return this.post(`Project/assignUserProject`, userProject);
  }


}


export const projectServies = new ProjectServices();