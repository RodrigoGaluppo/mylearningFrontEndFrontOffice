import axios from "axios"


const api = axios.create({
    //https://my--menu.herokuapp.com/
    baseURL:"http://" + "192.168.1.197:8080" + "/customer/" ,
})

export default api