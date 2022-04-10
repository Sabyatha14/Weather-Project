const express = require("express");
const https = require("https");
const app = express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.post("/",(req,res)=>{
    const query=req.body.CityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric"+"&appid=dc2ae79f58ea08ddc5844736cac357d3";
    https.get(url, (response) => {
        
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp=weatherData.main.temp;
            const des=weatherData.weather[0].description
             const icon=weatherData.weather[0].icon
            const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"

           res.write("<h1>The temperature in "+query+" is : "+temp+" degree Celcius</h1>");
           res.write("<p>The weather is currently "+des+"</p>");
           res.write("<img src="+imgurl+">")
           res.send();
        });
    })
})

app.listen(3000, () => {
    console.log("Server is running at 3000 port")
})

