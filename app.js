const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "69880b0eae4e3e5b27c284c539edbfbe"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const feelsLike = weatherData.main.feels_like;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            const description = weatherData.weather[0].description;
            res.write(`<h1>The weather is currently ${description}.</h1>`);
            res.write(`<h1>The temperature in ${query} is: ${temp} degrees Celcius. But it feels like ${feelsLike} degrees Celcius.</h1>`);
            res.write("<img src=" + imageURL + ">")
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log('Server is running on port 3000');
})