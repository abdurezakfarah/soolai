import React,  {
  useEffect,
  useState
} from "react"


import {
  Alert
} from "./index"

export interface IMain {
  children: React.ReactNode;
}

const Main: React.FC<IMain> = ({
  children
}: IMain) => {
  
  const [ isOffline, setIsOffline ] = useState(false)
  
  
  
 useEffect(() => {
    const handleOffline = () => {
     setIsOffline(true)
    }
        
    const handleOnline = () => {
      setIsOffline(false)
    }
    
    window.addEventListener("offline", handleOffline)
     window.addEventListener("online", handleOnline) 
      
    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [])
  return (
     <main 
      className="relative mx-auto bg-[#f9fafe] px-4 py-1 min-h-[calc(100vh-360px)]">
            
      {
       isOffline && (
          <Alert
            variant="offline" 
            body="The Internet stopped working. 🌐😔" 
          />          
        )
      }
            
        { children }
     </main>  
  )
}

export default Main