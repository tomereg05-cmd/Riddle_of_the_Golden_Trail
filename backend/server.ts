
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
import CalculatorD, { importantDataClient } from './calc';


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
    const {speed, a, b, range} = req.body;
    console.log("initial param: "+speed+" "+a+" "+b+" "+range)
    const externalResult = CalculatorD.fakeAPI();
    let j:number;
    let i:any[]= [];
    let FriendliesWith_KnownLocation:importantDataClient[]=[]
    let distanceBetweenThem:number
    for (j=0;j<externalResult.states.length;j++){
        i=externalResult.states[j]
        if (i[6]!=null&& i[5]!=null){
            distanceBetweenThem=CalculatorD.calcDist(i[5],i[6],a,b)

            FriendliesWith_KnownLocation.push(new importantDataClient(
                CalculatorD.check_inside_threat(i[5],i[6],a,b,range),
                distanceBetweenThem,
                j,
                i[6],
                i[5],
                CalculatorD.interceptingTime(distanceBetweenThem,speed)))
        }
        

    }
    let ClosestFriendly:any[]=[]
    let Index:number=0
    let minDist:number=100000
    let checkFriendlies:boolean=false
    const noFriendlies:string="no friendlies in range"
    let closingTime=''
    if(externalResult.states==null){
        ClosestFriendly.push(noFriendlies)
    }else{
        for (j=0;j<FriendliesWith_KnownLocation.length;j++){
            if(FriendliesWith_KnownLocation[j].getInside()==true){
                
                if(FriendliesWith_KnownLocation[j].getDist()<minDist){
                    minDist=FriendliesWith_KnownLocation[j].getDist();
                    Index=FriendliesWith_KnownLocation[j].getIndexInArray();
                    checkFriendlies=true;
                    closingTime=''+FriendliesWith_KnownLocation[j].getInterceptTime();
                }
            }
            
        }
        if(checkFriendlies==false){
            ClosestFriendly.push(noFriendlies)
        }else{
            ClosestFriendly=externalResult.states[Index];
        }

    }
    //const result = CalculatorD.check_inside_threat(x, y, a, b ,range);
    //res.json({x,y,a,b,range,result})
    console.log({speed,a,b,range,closingTime,ClosestFriendly})
    res.json({speed,a,b,range,closingTime,ClosestFriendly})
    
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