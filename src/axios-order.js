import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://minostore-a799b.firebaseio.com/'
})

export default instance;