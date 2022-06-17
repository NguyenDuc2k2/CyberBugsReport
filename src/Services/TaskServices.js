/* eslint-disable no-useless-constructor */
import { BaseServices } from "./BaseServices";

class TaskServices extends BaseServices {
    constructor() {
        super()
    }

    getAllTaskType = () => {
        return this.get(`TaskType/getAll`);
    }

    createTask = (taskOject) => {
        return this.post(`Project/createTask`, taskOject)
    }

    getAllPriority = () => {
        return this.get(`Priority/getAll`);
    }


    getAllStatus = () => {
        return this.get(`Status/getAll`)
    }

    getTaskDetail =(taskId)=>{
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }
    
    updateStatusTask = (taskStatusUpdate)=>{
        return this.put(`Project/updateStatus`,taskStatusUpdate)
    }

    updateTask =(taskUpdate)=>{
        return this.post(`Project/updateTask`,taskUpdate)
    }
}


export const taskServices = new TaskServices();