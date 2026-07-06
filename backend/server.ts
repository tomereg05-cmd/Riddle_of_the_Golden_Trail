
// things I installed:
/*
npm install "@vis.gl/react-google-maps"     - inside frontend folder    


npm i --save-dev @types/node                - inside backend folder
npm i express                               - inside backend folder
npm i cors                                  - inside backend folder
npm install -D @types/cors                  - inside backend folder                       
npm i --save-dev nodemon                    - inside backend folder
npm i -D tsx                                - inside backend folder

npm i axios                                 - inside frontend and backend folder
*/
// npm run devstart # run the "devstart" package script                       - to run the backend server -> when in the backend folder
// or just npm run  devStart
import { prisma } from "./lib/prisma";
import express from 'express';
import cors from 'cors';
import CalculatorD, { importantDataClient } from './calc';
import axios from "axios";
import { error } from 'node:console';


const corsOptions = {
    origin: 'http://localhost:5201', 
}

async function GetData_fetch (lamin:number,lomin:number,lamax:number,lomax:number) {
     try{
        const externalResult = await axios.get(`https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`)
        console.log("time of request given by opensky: ")
        console.log(externalResult.data.time)
        return externalResult.data;
        
    }
    catch(error){
        console.log(error)
        return null;
    }
    
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

app.post("/api/saveData", async (req,res) => {
    const {speed,a,b,range,ClosestFriendly}= req.body;
    const operation = await prisma.operation.create({
        data: {
        threat: {
            create: {
            lat_threat:         b,
            long_threat:        a,
            speed_threat:       Number(speed),
            range_threat:       range,

            },
        },
        aircraft: {
            create:{
                icao24:             ClosestFriendly[0],
                callsign:           ClosestFriendly[1],
                origin_country:     ClosestFriendly[2],
                time_position:      ClosestFriendly[3],
                last_contact:       ClosestFriendly[4],
                longitude:          ClosestFriendly[5],
                latitude:           ClosestFriendly[6],
                baro_altitude:      ClosestFriendly[7],
                on_ground:          ClosestFriendly[8],
                velocity:           ClosestFriendly[9],
                true_track:         ClosestFriendly[10],
                vertical_rate:      ClosestFriendly[11],
                geo_altitude:       ClosestFriendly[13],
                squawk:             ClosestFriendly[14],
                spi:                ClosestFriendly[15],
                position_source:    ClosestFriendly[16],
            }
        },
        },
        include: {
        threat: true,
        aircraft:true,
        },
    });
    console.log("Created user:", operation);
    res.json(false)
});

app.post("/api/tti", (req,res) => {
    const {speed,a,b,range,dist,ClosestFriendly}=req.body;
    console.log("initial param: "+speed+" "+a+" "+b+" "+range+" "+dist);
    const tti=CalculatorD.TTI(dist,speed)
    res.json({speed,a,b,range,tti,ClosestFriendly,dist})

});



app.post('/api/check-threat', async (req, res) => {
    const {speed, a, b, range} = req.body;
    console.log("initial param: "+speed+" "+a+" "+b+" "+range)

    const edges=CalculatorD.find_Edge(a,b,range)
    const lamin = edges.south;
    const lomin = edges.west;
    const lamax = edges.north;
    const lomax = edges.east;
    let dist= 0;
    let externalResult= await GetData_fetch(lamin,lomin,lamax,lomax);
    if (externalResult!=null){
        //const externalResult = CalculatorD.fakeAPI();
        let j:number;
        let i:any[]= [];
        let Friendlies_With_Known_Location:importantDataClient[]=[]
        let distanceBetweenThem:number
        if(externalResult.states!=null){
            for (j=0;j<externalResult.states.length;j++){
                i=externalResult.states[j]
                if (i[6]!=null&& i[5]!=null){
                    distanceBetweenThem=CalculatorD.calcDist(i[5],i[6],a,b)

                    Friendlies_With_Known_Location.push(new importantDataClient(
                        CalculatorD.check_inside_threat(i[5],i[6],a,b,range),
                        distanceBetweenThem,
                        j,
                        i[6],
                        i[5],
                        CalculatorD.TTI(distanceBetweenThem,speed)))
                }
                

            }
        }
        let ClosestFriendly:any[]=[]
        let Index:number=0
        let minDist:number=100000
        let checkFriendlies:boolean=false
        const noFriendlies:string="no friendlies in range"
        let tti=''
        
        if(externalResult.states==null){
            ClosestFriendly.push(noFriendlies)
        }else{
            for (j=0;j<Friendlies_With_Known_Location.length;j++){
                if(Friendlies_With_Known_Location[j].getInside()==true){
                    
                    if(Friendlies_With_Known_Location[j].getDist()<minDist){
                        minDist=Friendlies_With_Known_Location[j].getDist();
                        Index=Friendlies_With_Known_Location[j].getIndexInArray();
                        checkFriendlies=true;
                        tti=''+Friendlies_With_Known_Location[j].getInterceptTime();
                        dist = Friendlies_With_Known_Location[j].getDist();
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
       
        console.log({speed,a,b,range,tti,ClosestFriendly, dist},"sending full")
        return res.json({speed,a,b,range,tti,ClosestFriendly,dist})
    }else{
        if(externalResult==null){
            console.log("there was an error fetching the data")
        }
    }
    const tti=''
    const ClosestFriendly="no friendlies in range"
    console.log("sending error")
    res.json({speed,a,b,tti,ClosestFriendly,dist})
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
    
    //nevermide. done that on the API above
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