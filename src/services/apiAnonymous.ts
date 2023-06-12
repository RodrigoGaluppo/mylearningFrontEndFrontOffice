import axios from "axios"


const api = axios.create({
    //https://my--menu.herokuapp.com/
    baseURL:"https://mylearningbll.azurewebsites.net/" + "/anonymous/" ,
})

export default api