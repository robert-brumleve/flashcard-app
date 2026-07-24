import { UserProgress } from "../types/UserProgress";
import { readFile } from "fs/promises";
import { writeFile } from "fs/promises";
import path from "path";

export async function loadUserProgress(userId: string): Promise<UserProgress> {
    // Get User Progress JSON path
    const userProgressPath = path.join(process.cwd(), 'users', userId, 'progress.json');
    
    // Read progress.json
    const userProgressJSON = await readFile(userProgressPath, "utf8");

    // Parse JSON, create UserProgress object
    const userProgress: UserProgress = JSON.parse(userProgressJSON);

    return userProgress;
}

export async function saveUserProgress(userId: string, userProgress: UserProgress) {
    // Create JSON string
    const jsonString = JSON.stringify(userProgress, null, 2);

    // Get User Progress JSON file path
    const userDir = path.join(process.cwd(), 'users', userId);
    const userPath = path.join(userDir, 'progress.json');

    // Write the User Progress JSON file
    await writeFile(userPath, jsonString, 'utf8');
}