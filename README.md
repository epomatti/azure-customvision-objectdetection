# Azure Custom Vision - Object Detection

Azure Cognitive Services Custom Vision using the JavaScript SDK.

## Setup

Create the Cognitive Services resource:

```
az cognitiveservices account create -n <name> -g <group> --kind CognitiveServices --sku S0 -l eastus --yes
```

You can also use `--sku F0` which is the free tier.

Go to [customvision.ai](https://www.customvision.ai/projects#/settings) resources and copy the folling parameters:

<img src="docs/resource.png"/>

You may also get these values from the Azure Portal. I opened issue [#14595](https://github.com/Azure/azure-cli/issues/14595) to get the Key using the CLI.

Start by copying the sample `.env`:

```
cp .env.sample .env
```

Now add the values to the `.env` file:

```
customVisionTrainingKey=<training_key>
customVisionTrainingEndPoint=<endpoint>
predictionResourceId=<prediction_resource_id>
```

:information_source: _Custom Vision recommends at least 50 images per set to ensure model performance. 
Following the rule of thumb 70/30 you should have at least 15 additional images for the prediction tests._

Set the `project name` and `publish name` in the `.env` file:

```
projectName=<your_project_name>
publishName=<publish_name>
```