export const postPrompt = async (prompt: string) => {
  
    const baseUrl = import.meta.env.VITE_SERVER_BASE_URL
    const endPoint= import.meta.env.VITE_ENDPOINTS_V1_DALLE
      
    const url = baseUrl + endPoint
      
   const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    }    
    
     const response = await fetch(url, postOptions)
     
     
     const data = await response.json()
     return data
}