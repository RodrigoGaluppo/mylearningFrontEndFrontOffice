import axios from "axios"


const api = axios.create({
    //https://my--menu.herokuapp.com/
    baseURL:"http://localhost:8080/anonymous/" ,
})

export default api