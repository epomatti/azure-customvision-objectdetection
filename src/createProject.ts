import { getTrainingClient } from "./cognitiveServices"
import { TrainingAPIClientCreateTagOptionalParams } from "@azure/cognitiveservices-customvision-training/esm/models";

require('dotenv').config()

const tagsVar = process.env["tags"]
const projectName = process.env["projectName"]

async function main() {
    const client = getTrainingClient();

    const domains = await client.getDomains()
    const objDetectDomain = domains.find(domain => domain.type === "ObjectDetection");
    const project = await client.createProject(projectName, { domainId: objDetectDomain.id });

    console.log(`Project created. Add the ID to the .env file: ${project.id}`)

    const tagObj = JSON.parse(tagsVar);
    const tagPromises = []
    tagObj.forEach((tag: { "name": string; "object": string;}) => {
        const params: TrainingAPIClientCreateTagOptionalParams = { description : tag.object }
        tagPromises.push(client.createTag(project.id, tag.name, params))
    })

    await Promise.all(tagPromises)

}

main()
    .catch(e => console.error(e))