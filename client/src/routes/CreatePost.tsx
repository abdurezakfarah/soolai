import React, { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createPost, postPrompt } from "../api";
import { preview } from "../assets";
import { Loader, PageHead } from "../components";
import { generateRandomPrompt } from "../utils";

export interface IPost {
  id?: string;
  name: string;
  prompt: string;
  photo: string;
}

export default function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState<IPost>({
    name: "",
    photo: "",
    prompt: "",
  });

  useEffect(() => {
    toast.message(
      "Hey! If you see a 400 error when generating images, it's likely because my OpenAI free trial key expired or hit its limit. The error message will provide more details. Feel free to check out my previous creations on the homepage or see how I handled the project on GitHub!",
      {
        duration: 100000,
      }
    );
  }, []);

  const [generatingImg, setGeneratingImg] = useState(false);
  const [sharingPost, setSharingPost] = useState(false);

  const generateImage = async () => {
    if (!form.prompt) {
      alert("Please enter a prompt to generate image");
      return;
    }

    try {
      setGeneratingImg(true);

      const data = await postPrompt(form.prompt);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setForm((prevForm: IPost) => ({
        ...prevForm,
        photo: `data:image/jpeg;base64,${data.photo}`,
      }));
    } catch (error) {
      console.log(error);

      const defaultMessage = "Something went wrong";

      if (error instanceof Error) {
        toast.error(error.message || defaultMessage);
      } else {
        toast.error(defaultMessage);
      }
    } finally {
      setGeneratingImg(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(form.prompt && form.photo && form.name)) {
      alert(
        "Please enter prompt, valid name and then generate image to share with the community"
      );
      return;
    }
    try {
      setSharingPost(true);

      const data = await createPost(form);
      if ("error" in data) {
        toast.error(data.error);
        return;
      }
      navigate("/");
    } catch (error) {
       console.log(error);

       const defaultMessage = "Something went wrong";

       if (error instanceof Error) {
         toast.error(error.message || defaultMessage);
       } else {
         toast.error(defaultMessage);
       }
    } finally {
      setSharingPost(false);
    }
  };

  const handleSurpriseMePrompt = () => {
    const randomPrompt = generateRandomPrompt(form.prompt);
    setForm((prevForm: IPost) => ({
      ...prevForm,
      prompt: randomPrompt,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container max-w-7xl mx-auto">
      <PageHead
        title="Start Creating"
        subtitle="Make artistic and beautiful pictures using DALL-E AI, then share them with our community."
      />

      <form
        className="mt-14 flex flex-col gap-4 md:gap-8 max-w-3xl"
        onSubmit={handleSubmit}
      >
        <label className="space-y-2">
          <span className="font-bold">Name</span>
          <input
            className="placeholder:text-gray-500 flex h-12 w-full rounded-md border border- p-3 text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-"
            onChange={handleChange}
          />
        </label>
        <div className="space-y-2">
          <div className=" flex items-center gap-2">
            <label
              htmlFor="prompt"
              className="block text-sm md:text-base font-medium text-gray-900"
            >
              Prompt
            </label>

            <span className="-ml-2 text-red-800" aria-label="required">
              &#42;
            </span>

            <button
              type="button"
              className="py-1 md:p-3 px-2 md-p-6 bg-[#ECECF1] rounded-lg font-semibold md:font-bol text-xs md:base text-black uppercase hover:bg-[#CACAD1] hover:outline-none hover:translate-y-0.5 hover:scale-90 transition duration-100 ease-out hover:ease-in border border-slate-300"
              onClick={handleSurpriseMePrompt}
            >
              Surprise me
            </button>
          </div>
          <textarea
            id="prompt"
            inputMode="text"
            name="prompt"
            placeholder={
              "A man wanders through the rainy streets of Tokyo, with bright neon signs, 50mm"
            }
            value={form.prompt}
            onChange={handleChange}
            rows={3}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base text-ellipsis rounded-lg focus:ring-secondary focus:border-secondary outline-none block w-full p-3 resize-none overflow-x-hidden"
          />
        </div>
      </form>

      <section className="relative size-64 md:size-80 mt-10 md:mt-16 p-3 flex justify-center items-center bg-gray-50 border border-gray-300 text-sm text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
        {form.photo ? (
          <img
            className="h-full w-full object-contain"
            src={form.photo}
            alt={form.prompt}
          />
        ) : (
          <img
            className="h-3/4 w-3/4 object-contain opacity-40"
            src={preview}
            alt="preview"
          />
        )}
        {generatingImg && (
          <div className="absolute inset-0 z-0 flex flex-col gap-1 justify-center items-center bg-[#00000050] rounded-lg">
            <Loader />
            <span className="text-sm text-white font-semibold tracking-tight select-none">
              Generating...
            </span>
          </div>
        )}
      </section>

      <button
        type="button"
        className="w-full flex-1 py-2.5  px-5 rounded-md bg-green-600 text-white text-center font-semibold tracking-tight uppercase disabled:bg-green-800 disabled:opacity-50 disabled:scale-95 disabled:translate-y-0.25 hover:translate-y-0.25 hover:scale-95 transition duration-100 ease-out hover:ease-in select-none"
        disabled={generatingImg}
        onClick={generateImage}
      >
        {generatingImg ? "Generating..." : "Generate"}
      </button>

      <p className="mt-2 text-black-light text-[14px] md:text-lg">
        After you make the picture you like, you can easily show it to everyone
        in the community.
      </p>
      <button
        className="w-full flex-1 mt-3 py-2.5  px-5 rounded-md bg-secondary text-white text-center font-semibold tracking-tight uppercase disabled:opacity-50 disabled:translate-y-0.25 hover:translate-y-0.25 hover:scale-95 transition duration-100 ease-out hover:ease-in select-none"
        disabled={sharingPost}
      >
        {sharingPost ? "Sharing..." : "Share it with the community"}
      </button>
    </div>
  );
}
