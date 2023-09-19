import React, { 
    useState, 
    useEffect,
    useRef,
    ChangeEvent
    } from "react"
    
import {
  Card,
  FormField,
  Loader,
  PageHead,
  Alert
} from "../components"

import {
 getPosts
} from "../api"

//renders
const renderLoader = () => {
    return (
      <div
         className="flex justify-center items-center"
       >
           <Loader />
       </div>
    )
  }
  
export interface IPost {
 id: string,
 name: string,
 prompt: string,
 photo: string
}

export interface RenderCardsProps {
  data: IPost[] | [],
  title: string
}
  
const RenderCards: React.FC<RenderCardsProps>= ({ data, title }) => {
    if(data?.length > 0) {
     return (
      data
       .map((post: IPost) => (<Card key={post.id} {...post} />))
     )
    } else {
     return (
      <h2
        className="my-2 mx-auto tracking-tighter font-extrabolder text-4xl text-slate-300 p-4  "
      >
       { title }
      </h2>
     )
    }
}
 
const Root = () => {
 
  //states
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<IPost[] | []>([])
  const [searchedResult, setSearchedResult] = useState<IPost[] | []>([])
  const [searchText, setSearchText] = useState("")
 const [ error, setError ] = useState("")
  
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
 
  
  useEffect(() => {
   
   const loadPosts = async () => {
     try{
      setLoading(true)
       
       const data = await getPosts()
       
       if (!data.success){
            setError(data?.message)
            return
       }
       const posts = data?.posts       
       posts && setPosts(posts)
       
     } catch(error: any){
      
      setError("Oopsie! We had a little problem and couldn't take images from our computer. But don't worry, we know about it, and we'll make it better! 😊")
        
     } finally{
       setLoading(false)
     }
   }
   
   loadPosts()
   
   return () => {
     if (!searchTimeoutRef.current) return
     
     clearTimeout(searchTimeoutRef.current)
   }
  }, [])
  
  const handleErrorClose= () => setError("")
  
  const handleSearchChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
   setSearchText(event.currentTarget.value)
   
   if (searchTimeoutRef.current){
    clearTimeout(searchTimeoutRef.current)
   }
   const searchTimeout = setTimeout(() => {
       const searchedResult = posts
           ?.filter(
              (post: IPost) => (post.name
                 ?.toLowerCase()
                 .includes(searchText.toLowerCase()) ||
                 post.prompt
                  ?.toLowerCase()
                 . includes(searchText.toLowerCase())
                 )
            )
      setSearchedResult(searchedResult)      
   }, 500) as NodeJS.Timeout
   
   searchTimeoutRef.current = searchTimeout
  }
  
  
  return  (
   <div
    className="max-w-7xl mx-auto"
   >
    {
     error && (
       <Alert 
         variant="error"
         body={error}
         onClose={handleErrorClose}
      />
     )
    }
      <PageHead 
        title="Discover Our Community's Art"
        subtitle="Enjoy creative and beautiful images created by DALL-E AI."
      />
      
      {
        (posts.length > 0) && (
          <section
            className="mt-16"
           >
              <FormField
                label="Search posts"
                inputMode="search"          
                name="searchPosts"
                placeholder={"Cabdirisaaq  or blue yacht..."}
                value={searchText}
                rows={2}
                handleChange={handleSearchChange}       
              />           
          </section>
        )
      }
      
      <section
        className="mt-10"
      >
       {
         loading
         ? (
           renderLoader()
         )
         : (
           <>
            {
              searchText && (
                <h2
                  className="font-medium text-black-light text-xl mb-3 tracking-tight"
                >
                Showing results for <span className="font-bold text-black-dark">{searchText}</span>
                </h2>
              )
            }
            <div
              className="grid grid-cols-1 gap-3 lg:grid-cols-4 sm:grid-cols-3 xs:grid-2"
            >
            {
             searchText
             ? (
              <RenderCards 
                data={searchedResult}
                title={"No search results found."}
                />
             )
             : (
               <RenderCards 
                data={posts}
                title={error ? "Could not get posts" : "No posts yet"}
                />
             )
            }
            </div>
           </>
         )
       }
      </section>
      
   </div>
  )
}

export default Root