const weather = require("weather-js"); // https://www.npmjs.com/package/weather-js
const cities = require("cities"); // https://www.npmjs.com/package/cities
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

exports.handler = async function (event, context) {
  let weatherPromise = function (data) {
    return new Promise((resolve, reject) => {
      weather.find(
        { search: `${data.State} ${data.City}`, degreeType: "F" },
        function (err, result) {
          if (err) console.log("error weather", err);

          let weatherTempArr = [];
          if (result) {
            result.forEach((item) => {
              console.log(item.current.temperature);
              weatherTempArr.push({
                temperature: item.current.temperature,
                humidity: item.current.humidity,
              });
            });
          }
          data.weather = weatherTempArr;
          resolve(data);
        }
      );
    });
  };

  //Process the incoming messages.
  const obj = cities.gps_lookup(event.lat, event.long);

  // get ISO8601 date format, natively supported in browser JS
  const d = new Date();
  const n = d.toISOString(); // move timestamping function to local scope to prevent 'warm start' issues, and memory heap TSR issue

  /******************* get current weather by using city and state from cities.js *******************/
  let data = Object.assign({}, event, {
    City: obj.city,
    State: obj.state,
    Time: n,
  });

  const response = await weatherPromise(data);

  // Prepare the S3 parameters
  const bucketName = "weather-data-sets";
  const fileName = "weather-data.json";
  const fileContent = JSON.stringify(response);

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
    ContentType: "application/json",
  };

  // Upload the data to S3
  try {
    await s3.putObject(params).promise();
    console.log("Data uploaded to S3 successfully.");
  } catch (error) {
    console.error("Error uploading data to S3:", error);
  }

  return response;
};
