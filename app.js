const express = require("express");
const https = require("https");
const bodyparser=require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(reqs,resp)
{
  var name=reqs.body.city;
  const query=name;
  const appid="24447137090e28bd422ccd0b15e30342";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units=imperial";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      const name=weatherData.name;
      const icon=weatherData.weather[0].icon;
      const imageUrl="http://openweathermap.org/img/wn/"+ icon+"@2x.png";
      resp.write("<p>The weather is currently "+weatherDescription+"</p>");
      resp.write("<h1>The temperature in "+name+" is "+temp+"</h1>");
      resp.write("<img src=" + imageUrl +">");
      resp.send();
    });
  });

});
app.listen(3000, function() {
  console.log("sever is running at port 3000");
});
