## Part 1 AWS CLI using MQTT (no certs) to IoT Core (MQTT test client: Subscribe) ##

//check your current AWS IoT Core Region
//aws iot describe-endpoint --endpoint-type iot:Data-ATS

//By default, the AWS CLI version 2 now passes all binary input and binary output parameters as base64-encoded strings. A parameter that requires binary
//input has its type specified as blob (binary large object) in the documentation.

aws --region eu-central-1 iot-data publish --topic "myTopic" --cli-binary-format raw-in-base64-out --payload "{\"uptime\": 123,\"temp\": 44,\"humidity\": 33}"

//If you want to encode your payload in base64 here is the equivalent payload from above encoded (using encoding online at https://www.base64encode.org/ )

aws --region eu-central-1 iot-data publish --topic "myTopic" --payload IntcInVwdGltZVwiOiAxMjMsXCJ0ZW1wXCI6IDQ0LFwiaHVtaWRpdHlcIjogMzN9Ig==

//To upload a whole JSON file of sensor readings (your json file will be the path from your current working directory)

aws --region eu-central-1 iot-data publish --topic "myTopic" --cli-binary-format raw-in-base64-out --payload file://sample-json-file.json

//To upload a whole JSON file of base64 encoded sensor readings (your json file will be the path from your current working directory)

aws --region eu-central-1 iot-data publish --topic "myTopic" --output json --payload file://base64.json

//A test payload for the AWS IoT Core console

{
	"Temperature": 77,
	"Humidity": 88,
	"Time": 12349876,
	"Device_ID": "device_4"
}


//test JSON sample.json (copy and save as sample-json-file.json file from your working directory)

[
			{ "id": "5001", "type": "None" },
			{ "id": "5002", "type": "Glazed" },
			{ "id": "5005", "type": "Sugar" },
			{ "id": "5007", "type": "Powdered Sugar" },
			{ "id": "5006", "type": "Choco with Suger" },
			{ "id": "5003", "type": "Chocolate" },
			{ "id": "5004", "type": "Maple" }
]
		
// converted to base64 save as base64.json  (https://codebeautify.org/json-to-base64-converter)

WwoJCQl7ICJpZCI6ICI1MDAxIiwgInR5cGUiOiAiTm9uZSIgfSwKCQkJeyAiaWQiOiAiNTAwMiIsI
CJ0eXBlIjogIkdsYXplZCIgfSwKCQkJeyAiaWQiOiAiNTAwNSIsICJ0eXBlIjogIlN1Z2FyIiB9LA
oJCQl7ICJpZCI6ICI1MDA3IiwgInR5cGUiOiAiUG93ZGVyZWQgU3VnYXIiIH0sCgkJCXsgImlkIjo
gIjUwMDYiLCAidHlwZSI6ICJDaG9jbyBjb24gYXp1Y2FyIiB9LAoJCQl7ICJpZCI6ICI1MDAzIiwg
InR5cGUiOiAiQ2hvY29sYXRlIiB9LAoJCQl7ICJpZCI6ICI1MDA0IiwgInR5cGUiOiAiTWFwbGUiIH0KXQ==