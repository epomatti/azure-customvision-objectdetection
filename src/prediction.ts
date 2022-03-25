import { getPredictionClient } from "./cognitiveServices"
import * as fs from 'fs';

const projectId = process.env["projectId"]!
const predictionSampleDataRoot = process.env["predictionSampleDataRoot"]!
const publishName = process.env["publishName"]!

async function main() {

    const client = getPredictionClient()
    const imageFiles = fs.readdirSync(predictionSampleDataRoot);

    for await (const file of imageFiles) {
        const data = fs.readFileSync(`${predictionSampleDataRoot}/${file}`)
        const results = await client.detectImage(projectId, publishName, data)
        console.log("Results:");
        results!.predictions!.forEach(predictedResult => {
            console.log(`\t ${predictedResult.tagName!}: ${(predictedResult.probability! * 100.0).toFixed(2)}% ${predictedResult.boundingBox!.left!},${predictedResult.boundingBox!.top!},${predictedResult.boundingBox!.width!},${predictedResult.boundingBox!.height!}`);
        });
    }
}
main()
    .catch(e => console.error(e))

