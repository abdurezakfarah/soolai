const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const postPrompt = async (prompt: string) => {
  const url = `${baseUrl}/api/v1/dalle`;

  console.log("URL", url);

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  };

  const response = await fetch(url, postOptions);

  const data = await response.json();
  return data;
};
