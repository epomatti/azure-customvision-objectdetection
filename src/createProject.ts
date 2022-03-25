import { getTrainingClient } from "./cognitiveServices"
require('dotenv').config()

const tagsVar = process.env["tags"]!;
const projectName = process.env["projectName"]!;

async function main() {
    const client = getTrainingClient();

    const domains = await client.getDomains();
    const objDetectDomain = domains.find(domain => domain.type === "ObjectDetection")!;
    const project = await client.createProject(projectName, { domainId: objDetectDomain.id })!;

    console.log(`Project created. Add the ID to the .env file: '${project.id}'`)

    const tagNames = tagsVar.split(",");
    const tagPromises : any = []
    tagNames.forEach(tag => {
        tagPromises.push(client.createTag(project.id!, tag))
    })

    await Promise.all(tagPromises)

}

main()
    .catch(e => console.error(e))