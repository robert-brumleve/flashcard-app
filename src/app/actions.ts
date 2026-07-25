'use server'

import { saveUserProgress } from "../lib/progressStorage";
import { UserProgress } from "../types/UserProgress";

export async function saveProgressAction(userProgress: UserProgress) {
    saveUserProgress(userProgress);
}