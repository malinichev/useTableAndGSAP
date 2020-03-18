import * as axios from 'axios'


var axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    // baseURL: 'https://my-json-server.typicode.com/malinichev/myApi',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });


export const getUsersApi = () => {
   return axiosInstance.get('/users')
        .then(res=>res.data)
        

}
export const getPostApi = () => {
   return axiosInstance.get('/posts')
        .then(res=>res.data)
}
export const delPostApi = (postId) => {
//    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
//     method: 'DELETE'
//   })
//   .then(res=>res.json())
  


// axiosInstance.delete(`/posts/${postId}`,{
  return axiosInstance.delete(`/posts/${postId}`)
        .then(res=>res.data)
}
export const updatePostApi = ({id, ...postData}) => {

  return axiosInstance.put(`/posts/${id}`, postData)
      .then(res=>res.data)
        
}

