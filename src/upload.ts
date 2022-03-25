import { getTrainingClient } from "./cognitiveServices"
import * as fs from 'fs';
import { ImageFileCreateBatch, ImageFileCreateEntry } from "@azure/cognitiveservices-customvision-training/esm/models";

const projectId = process.env["projectId"]!
const trainingSampleDataRoot = process.env["trainingSampleDataRoot"]!

if (projectId === undefined || projectId.length === 0) {
    throw new Error("You must set the project ID");
}

async function main() {
    const client = getTrainingClient();

    let fileUploadPromises = [];
    const imageFiles = fs.readdirSync(trainingSampleDataRoot);
    const files: ImageFileCreateEntry[] = []
    const chunk = imageFiles.slice(0, 64)

    chunk.forEach(file => {
        const data = fs.readFileSync(`${trainingSampleDataRoot}/${file}`)
        const fileEntry: ImageFileCreateEntry = { name: file, contents: data }
        files.push(fileEntry);
    })
    const batch: ImageFileCreateBatch = { images: files }
    fileUploadPromises.push(client.createImagesFromFiles(projectId, batch))

    await Promise.all(fileUploadPromises);

    console.log("Uploaded all images");

}
main()
    .catch(e => console.error(e))

