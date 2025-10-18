import axios from 'axios'
import Config from '../config/config'
const Api = axios.create({
    baseURL: Config.api_url,
})


Api.interceptors.request.use(
    config => {
        config.headers['x-api-key'] = Config.authorization_token
        return config
    },
    error => Promise.reject(error)
)

export default Api