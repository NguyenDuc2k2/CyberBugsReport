/* eslint-disable no-useless-constructor */
import { BaseServices } from "../BaseServices";

class ExercisesUser extends BaseServices{
    constructor(){
        super()
    }

    signupUser =(newUser)=>{
        return this.post(`Users/signup`,newUser)
    }

    getUser = (keyWord) => {
        return this.get(`Users/getUser?keyword=${keyWord}`)
    }

    deleteUser =(idUser)=>{
        return this.delete(`Users/deleteUser?id=${idUser}`);
    }

    updateUser =(userUpdate)=>{
        return this.put(`Users/editUser`,userUpdate)
    }
}

export const exercisesUser =  new ExercisesUser();