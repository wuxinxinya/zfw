// 房屋相关的所有接口
import api from '../../axios'

// 获取房屋
export function getFilters(id){
  return api.get('/houses/condition',{
    params:{
      id
    }
  })
}