import {  notification } from "antd";

export const notifiFucction = (type, message, desrciption) => {
    notification[type]({
        message: message,
        desrciption: desrciption
    })
}