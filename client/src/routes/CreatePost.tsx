import React, {
 useState,
 ChangeEvent,
 FormEvent,
} from "react"

import {
    useNavigate
} from "react-router-dom"

import {
 postPrompt,
 createPost
} from "../api"

import {
    generateRandomPrompt,
    
} from "../utils"

import { 
   preview 
   } from "../assets"
   
import { 
    Loader, 
    FormField,
    PageHead,
    Alert
    } from "../components"
    
    
export interface IPost {
  id?:string;
  name: string;
  prompt: string;
  photo: string;
}    

  
    
const CreatePost: React.FC = () => {
  
  const navigate = useNavigate()
  
      
  const [ form, setForm ] = useState<IPost>({
    name: "",
    prompt: "",
    photo: ""
  })
  
  const [ generatingImg, setGeneratingImg ] = useState(false)
  const [ sharingPost, setSharingPost ] = useState(false)
  const [ error, setError ] = useState("")

  const handleErrorClose= () => setError("")
  
  const generateImage = async () => {
    if (!form.prompt) {
      alert("Please enter a prompt to generate image")
      return
    }
    
    try {
      setGeneratingImg(true)
    
             
     const data = await postPrompt(form.prompt)
         
     if (!data.success){
      setError(data?.message)
      return
     }
     
     
     setForm((prevForm: IPost) => ({
       ...prevForm,
       photo: `data:image/jpeg;base64,${data.photo}`
     }))
     
    } catch(error: any){
     setError("Oopsie! We had a tiny problem sending your words to our computer to make pictures. But don't worry, we know about it, and we'll make it better! 😊")
    } finally {
      setGeneratingImg(false)
    }    
    
  }
  //handlers
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (!(form.prompt && form.photo && form.name)){
      alert("Please enter prompt, valid name and then generate image to share with the community")
      return
    }
    try {
      setSharingPost(true)
             
       const data = await createPost(form)
          if (!data.success){
            setError(data?.message)
            return
          }
       navigate("/")
      
    } catch(error: any){
      setError("Oopsie! We had a little problem and couldn't send your post to the community. But don't worry, we know about it, and we'll make it better! 😊")
    } finally{
      setSharingPost(false)
    }
  }
  const handleChange= (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget    
    setForm((prevForm: IPost) => ({
      ...prevForm,
      [name]: value
    }))
    
    
  }
  
  const handleSurpriseMePrompt = () => {
    const randomPrompt = generateRandomPrompt(form.prompt)  
    setForm((prevForm: IPost) => ({
      ...prevForm,
      prompt: randomPrompt
    }))    
  }
   
  return (
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
        title="Start Creating"
        subtitle="Make artistic and beautiful pictures using DALL-E AI, then share them with our community."
      />
      
      <form
        className="mt-14 max-w-3xl"
        onSubmit={handleSubmit}
      >
        <section
          className="flex flex-col gap-5"
        >
        <FormField
          label="Your name"
          inputMode='text'
          name="name"
          placeholder="John Doe"
          value={form.name}
          handleChange={handleChange}
          required
          autoComplete="given-name"
          minLength={3}
          maxLength={15}
          preventEnterKeyDefault
          rows={2}
         />
        <FormField
          label="Prompt"          
          inputMode='text'
          name="prompt"
          placeholder={"A man wanders through the rainy streets of Tokyo, with bright neon signs, 50mm"}
          value={form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMePrompt={handleSurpriseMePrompt}      
          rows={3}
         />        
        </section>
        
         <section
          className="relative w-64 h-64 md:w-80 md:h-80 mt-10 p-3 flex justify-center items-center bg-gray-50 border border-gray-300 text-sm text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
         >
          {
            form.photo
            ? (
              <img 
                className="h-full w-full object-contain"
                src={form.photo}
                alt={form.prompt}
              />
            )
            : (
               <img 
                className="h-3/4 w-3/4 object-contain opacity-40"
                src={preview}
                alt="preview"
              />
            )
          }
          {
            generatingImg && (
              <div
               className="absolute inset-0 z-0 flex flex-col gap-1 justify-center items-center bg-[#00000050] rounded-lg"
              >
                <Loader />
                <span 
                className="text-sm text-white font-semibold tracking-tight select-none"
                >
                 Generating...
                 </span>
              </div>
            )
           
          }
         </section>
         
         
        <fieldset
         className="mt-5 flex gap-5"
        >
          <button
          type="button"
           className="w-full flex-1 py-2.5  px-5 rounded-md bg-green-600 text-white text-center font-semibold tracking-tight uppercase disabled:bg-green-800 disabled:opacity-50 disabled:scale-95 disabled:translate-y-0.25 hover:translate-y-0.25 hover:scale-95 transition duration-100 ease-out hover:ease-in select-none"
           disabled={generatingImg}
           onClick={generateImage}
          >
          {
            generatingImg
            ? "Generating..."
            :"Generate"
          }
          </button>
        </fieldset>
        
        <fieldset
         className="mt-10"
        >
        <p
         className="mt-2 text-black-light text-[14px] md:text-lg"
        >
        After you make the picture you like, you can easily show it to everyone in the community.
        </p>
         <button
           className="w-full flex-1 mt-3 py-2.5  px-5 rounded-md bg-secondary text-white text-center font-semibold tracking-tight uppercase disabled:opacity-50 disabled:translate-y-0.25 hover:translate-y-0.25 hover:scale-95 transition duration-100 ease-out hover:ease-in select-none"
         
         >
           {
           sharingPost
             ? "Sharing..."
             : "Share it with the community"
           }
         </button>
        </fieldset>
      </form>
      
      
    </div>
  )
}

export default CreatePost