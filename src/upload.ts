const coords = require('yolo-coords')
const array = coords('16', 'sample/training_images/gates_and_jobs1.txt')

const tags = {
    jobs: "15",
    gates: "16"
}

console.log(array)