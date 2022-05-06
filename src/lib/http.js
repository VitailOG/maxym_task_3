import axios from "axios";
import {mainStore} from '../stores/mainStore';
import { useQuasar } from "quasar";

const BASE_URL = 'http://127.0.0.1:3001/api/v1'
const http = axios.create({
  baseURL: BASE_URL
})


http.interceptors.response.use((config) => {
  const store = mainStore()
  const options = store.options
  if (config.config.url.endsWith('/list')){
    if(config.data.length === 0 && options.request.offset !== 0){
      options.request.offset -= options.request.limit
      let mainConfig = config.config
      mainConfig.data = options
      store.disableButtonNext = true
      return http.request(mainConfig)
    }
  }
  return config;
}, error => {
  const statusCode = error.response.status
  const $q = useQuasar()
  if (statusCode === 500){
    $q.notify({
      type:'negative',
      message:'Помилка сервера'
    })
  }
})

export default http
