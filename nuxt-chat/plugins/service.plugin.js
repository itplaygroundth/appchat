import { ApiService } from '../api/api.service'

export default ({app:{$axios}},inject) =>{
    const apiservice = new ApiService($axios)
    inject('apiservice',apiservice)
}