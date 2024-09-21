import { surpriseMePrompts } from "../constants";

export const generateRandomPrompt = (prompt: string = ""): string => {
  if (surpriseMePrompts?.length === 0) {
    return "";
  }

  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) {
    return generateRandomPrompt(prompt);
  }

  return randomPrompt;
};
