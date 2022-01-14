const express = require('express');
const app = express();
const https = require('https')
const bodyParser = require('body-parser');
const { response } = require('express');
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', (req, resp) => {
    resp.sendFile(__dirname + '/index.html')
})




app.post('/', (req, resp) => {
    console.log('Post request recieved')
    var cityName = req.body.query;
    const query = cityName
    const appid = '0ff2257d4f400972c8f9ffe20a7377d0'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${appid}`
    console.log(url)
    https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherDate = JSON.parse(data)
            var weatherData = JSON.parse(data)
            var temp = weatherData.main.temp;
            var weather_icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
            console.log(weatherData.weather[0])
            resp.send(`     
                                    <style>
                                * {
                                    padding: 0;
                                    margin: 0;
                                    /* font-family: "Jost", sans-serif; */
                                    font-family: "Quicksand", sans-serif;
                                }

                                body {
                                    background: #e7cafc;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    flex-wrap: wrap;
                                    height: 100vh;
                                    width: 100vw;
                                }

                                html,
                                body {
                                    font-size: 62.5%;
                                    height: 100%;
                                }

                                html {
                                    background: #eee;
                                }

                                .box {
                                    width: 25vw;
                                    height: 70vh;
                                    border-radius: 0.5rem;
                                    box-shadow: 0 0.4rem 3rem rgba(0, 0, 0, 0.4);
                                    background: #c6a5dd;
                                    position: relative;
                                    overflow: hidden;
                                    transform: translate3d(0, 0, 0);
                                    min-width: 20rem;
                                    min-height: 35rem;
                                }

                                .wave {
                                    opacity: 0.3;
                                    position: absolute;
                                    top: 120%;
                                    left: 50%;
                                    background: white;
                                    width: 50rem;
                                    height: 50rem;
                                    margin-left: -25rem;
                                    margin-top: -25rem;
                                    transform-origin: 50% 48%;
                                    border-radius: 43%;
                                    animation: drift 3000ms infinite linear;
                                    z-index: 1;
                                }

                                .wave.-three {
                                    animation: drift 5000ms infinite linear;
                                    z-index: 2 !important;
                                    opacity: 0.2;
                                }

                                .wave.-two {
                                    animation: drift 7000ms infinite linear;
                                    opacity: 0.1;
                                    z-index: 3 !important;
                                }

                                .box:after {
                                    content: "";
                                    display: block;
                                    left: 0;
                                    top: 0;
                                    width: 100%;
                                    height: 100%;
                                    z-index: 11;
                                    transform: translate3d(0, 0, 0);
                                }

                                @keyframes drift {
                                    from {
                                        transform: rotate(0deg);
                                    }

                                    from {
                                        transform: rotate(360deg);
                                    }
                                }

                                .info {
                                    position: absolute;
                                    bottom: 0;
                                    width: 100%;
                                    height: 45%;
                                    z-index: 4;
                                }

                                .location {
                                    margin-top: 1.5rem;
                                    text-align: center;
                                    font-weight: 800;
                                    font-size: 3rem;
                                }

                                .fa-street-view {
                                    animation: rotates 3s linear infinite alternate;
                                }

                                @keyframes rotates {
                                    from {
                                        transform: translateX(-0.5rem);
                                    }

                                    to {
                                        transform: translateX(0.5rem);
                                    }
                                }

                                #date {
                                    text-align: center;
                                    margin-top: 0.5rem;
                                    color: #57606f;
                                    font-size: 1.2rem;
                                    font-weight: 300;
                                    text-transform: uppercase;
                                }

                                .weatherNow {
                                    margin-top: 1rem;
                                    text-align: center;
                                    font-size: 3rem;
                                }
                                .userInput{
                                    margin-top: 4rem;
                                    text-align: center;
                                    font-size: 1rem;
                                }

                                .temp {
                                    margin-top: 2.5rem;
                                    text-align: center;
                                    font-size: 3rem;
                                }

                                .tempmin_max {
                                    text-align: center;
                                    margin-top: 0.3rem;
                                    font-weight: 300;
                                    font-size: 1.2rem;
                                    color: #57606f;
                                }
                                .moreInfo{
                                    text-align: center;
                                    margin-top: 0.3rem;
                                    font-weight: 300;
                                    font-size: 1.2rem;
                                    color: #57606f;
                                }

                                #weathercon {
                                    height: 40%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    font-size: 3em;
                                    // margin-bottom: 2rem;
                                }

                                #weathercon .fas {
                                    font-size: 6rem;
                                    animation: fas-anime 3s linear infinite alternate;
                                }

                                @keyframes fas-anime {
                                    from {
                                        transform: scale(1.1);
                                    }

                                    to {
                                        transform: scale(1.5);
                                    }
                                }

                                @media (max-width: 600px) {
                                    .box {
                                        width: 90vw;
                                        height: 80vh;
                                    }

                                    .wave {
                                        top: 85%;
                                    }

                                    #weathercon {
                                        font-size: 5em;
                                    }

                                    .info {
                                        font-size: 1.5rem;
                                    }
                                }

                                @media (max-height: 500px) {
                                    .box {
                                        height: 80vh;
                                    }

                                    .wave {
                                        top: 115%;
                                    }
                                }

                                body>span {
                                    width: 100vw;
                                    text-align: center;
                                    color: grey;
                                }
                            </style>



            
                            <body>

                            <div class="box">
                                <div class="wave -one"></div>
                                <div class="wave -two"></div>
                                <div class="wave -three"></div>
                                <h2 class="weatherNow">Welcome to WEATHER.LIVE</h2>
                                <br>
                                <br>
                                <form action="/" method="post" class="userInput">
                                    <label for="" placeholder="eg. Delhi"><b>CITY NAME</b></label>
                                    <input type="text" name="query">
                                    <button type="submit" name="submit">GO</button>
                                </form>
                                <div id="weathercon">
                                    <img src = "${weather_icon}">
                                </div>

                                <div class="info">
                                    <h2 class="location">
                                        <i class="fas fa-street-view" style="color: #fff"></i>${query}
                                    </h2>
                                   
                                    <h1 class="temp">${temp}°C</h1>
                                    <h3 class="tempmin_max">
                                        Min ${weatherData.main.temp_min}°C | Max${weatherData.main.temp_max}°C
                                    </h3>
                                    <h3 class = "moreInfo">Pressure = ${weatherData.main.pressure}</h3>
                                    <h3 class = "moreInfo">Humidity = ${weatherData.main.humidity}</h3>
                                    <h3 class = "moreInfo">Visibility = ${weatherData.visibility}</h3>
                                    <h3 class = "moreInfo">Wind speed = ${weatherData.wind.speed}</h3>
                                    <h3 class = "moreInfo">direction = ${weatherData.wind.deg}</h3>

                                </div>
                            </div>

                           
                        </body>`);
        })
    })
})





app.listen(process.env.PORT || 3000, () => {
    console.log('SEREVER IS RUNNING - 3000')
})