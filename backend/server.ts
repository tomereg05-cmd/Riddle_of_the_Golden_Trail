
// things I installed:
/*
npm install "@vis.gl/react-google-maps"     - inside frontend folder    


npm i --save-dev @types/node                - inside backend folder
npm i express                               - inside backend folder
npm i cors                                  - inside backend folder
npm install -D @types/cors                  - inside backend folder                       
npm i --save-dev nodemon                    - inside backend folder
npm i -D tsx                                - inside backend folder

npm i axios                                 - inside frontend folder
*/
// npm run devstart # run the "devstart" package script                       - to run the backend server -> when in the backend folder
// or just npm run  devStart

import express from 'express';
import cors from 'cors';
import CalculatorD from './calc';
import threat from './calc';
import ans from './calc';


const corsOptions = {
    origin: 'http://localhost:5173', 
}



const app = express();
const port = 5000;

app.use(cors(corsOptions));
app.use(express.json());


function delay(time:number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

//req = request, res = response
app.get("/api" , (req, res) => {
    res.json({ message: "Hello from the backend!  ;} " });
});




app.post('/api/check-threat', (req, res) => {
    const { x , y, a, b, range} = req.body;
    const result = CalculatorD.check_inside_threat(x, y, a, b ,range);
    res.json({x,y,a,b,range,result})//לחזור

    
});

app.post('/api/underThreat',(req ,res) => {
    /*
    1. get lat(y), long(x), range[(dist)in nautical miles], speed(not one yet)
    2. convert nautical miles(dist) to degrees(r)
    3. call CalculatorD.find_Edge(x,y,r)
    4. call opensky API to get all jets in range
    5. create object threat:threat = new threat(x,y,dist,speed)
    6. create empty array Ans:ans[] and fill it using the line below
    7. call CalculatorD.all_Under_threat(jets[],threat)
    

    */
   delay(1000).then(

   );

});
/*
app.post('/api/deg-to-miles', (req, res) =>{
    const {r, lat} = req.body;
    const resault:number = CalculatorD.DegToMiles(r, lat);
    res.json(resault);
});
*/
/*

export CLIENT_ID="the dogfighter-api-client"
export CLIENT_SECRET="egx3psmtTYQsZA6yQz9HFJt6uOGveH7W"

export TOKEN=$(curl -X POST "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "grant_type=client_credentials" \
-d "client_id=$CLIENT_ID" \
-d "client_secret=$CLIENT_SECRET" | jq -r .access_token)

curl -H "Authorization: Bearer $TOKEN" https://opensky-network.org/api/states/all | jq .

*/






app.listen(port, () => {
    console.log(`backend running at: http://localhost:${port}`);
});