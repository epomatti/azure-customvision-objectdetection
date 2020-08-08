const coords = require('yolo-coords')
import { getTrainingClient } from "./cognitiveServices"
import * as fs from 'fs';
import * as path from 'path';

const projectId = process.env["projectId"]
const trainingImagesSampleDataRoot = process.env["trainingImagesSampleDataRoot"]
const trainingClassesSampleDataRoot = process.env["trainingClassesSampleDataRoot"]

if (projectId === undefined || projectId.length === 0) {
    throw new Error("You must set the project ID");
}

async function main() {
    const client = getTrainingClient();

    const tags = await client.getTags(projectId);

    const imageFiles = fs.readdirSync(`${trainingImagesSampleDataRoot}`);
    imageFiles.forEach(image => {

        console.log(path.parse(image).name)

        // const region = { tagId: forkTag.id, left: forkImageRegions[file][0], top: forkImageRegions[file][1], width: forkImageRegions[file][2], height: forkImageRegions[file][3] };
        // const entry = { name: file, contents: fs.readFileSync(`${forkDir}/${file}`), regions: [region] };
        // const batch = { images: [entry] };
        // // Wait one second to accommodate rate limit.
        // await setTimeoutPromise(1000, null);
        // fileUploadPromises.push(trainer.createImagesFromFiles(sampleProject.id, batch));
    })



    // const array = coords('16', 'sample/training_images/gates_and_jobs1.txt')


}
main()
    .catch(e => console.error(e))

