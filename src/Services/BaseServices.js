import Axios from "axios"
import { DOMAIN_CYBERBUGS, TOKEN } from "../Util/Contants/SettingSystem"

 export class BaseServices {
    put = (url, modal) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: "PUT",
            data: modal,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) }
        })
    }

    post = (url, modal) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: "POST",
            data: modal,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) }
        });
    }

    get = (url, modal) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: "GET",
            data: modal,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) }
        })
    }

    delete = (url, modal) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: "DELETE",
            data: modal,
            headers: { "Authorization": "Bearer " + localStorage.getItem(TOKEN) }
        })
    }
}