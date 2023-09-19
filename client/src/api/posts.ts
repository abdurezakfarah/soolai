export interface IPost {
  id?:string;
  name: string;
  prompt: string;
  photo: string;
}    
    
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL
 
export const createPost = async (post: IPost) => {  
    const endPoint= import.meta.env.VITE_ENDPOINTS_V1_POSTS
      
    const url = baseUrl + endPoint
          
   const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    }    
    
     const response = await fetch(url, postOptions)
          
     const data = await response.json()
     return data
}


export const getPosts = async () => {  
    const endPoint= import.meta.env.VITE_ENDPOINTS_V1_POSTS      
    const url = baseUrl + endPoint 
    const response = await fetch(url)          
    const data = await response.json()
     
     return data
}