import axios from "axios"


const api = axios.create({
    //https://my--menu.herokuapp.com/
    baseURL:"http://localhost:8080/customer/" ,
})

export default api