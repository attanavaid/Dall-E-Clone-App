import { surpriseMePrompts } from "../constants"
import FileSaver from 'file-saver'

export function getRandomPrompt(prompt: string): string {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const randomPrompt = surpriseMePrompts[randomIndex]
    
    if (randomPrompt === prompt) return getRandomPrompt(prompt)

    return randomPrompt
}

export async function downloadImage(_id: number, photo: string): Promise<void> {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}

export async function copyPrompt(_id: number, prompt: string): Promise<void> {
    try {
        await navigator.clipboard.writeText(prompt.charAt(0).toUpperCase() + prompt.slice(1));
        console.log('Content copied to clipboard');
    } 
    
    catch (error) {
        console.error('Failed to copy: ', error);
    }
}