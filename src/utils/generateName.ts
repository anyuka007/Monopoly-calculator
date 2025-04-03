import { funnyNames } from "../variables/names";

let availableNames = [...funnyNames]; 

export const generateRandomName = (): string => {
  if (availableNames.length === 0) {
    availableNames = [...funnyNames]; 
  }

  const randomIndex = Math.floor(Math.random() * availableNames.length);
  const randomName = availableNames[randomIndex];
  availableNames.splice(randomIndex, 1); 
  return randomName;
};