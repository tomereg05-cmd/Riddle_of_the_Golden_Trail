
import { useState , useEffect} from "react";
//import CalculatorD from "../../backend/calc.ts";
//import React from "react";
///*
import {
  APIProvider,
  Map,
  AdvancedMarker, 
  useMap,
} from "@vis.gl/react-google-maps";
import axios from "axios";
//*/


function App() {


  const [threatD,setThreat] =useState({
    data: {
      threatSpeed: 250,
      lat_threat: 32.0345901735186,
      long_threat: 33.8249539518382,
      n: 'N',
      e: 'E',
      range:60,
      jet_lat: '',
      jet_long:'',
      interceptTime:'',
      jet_id:'',
    }
    
  })
  const map = useMap();
  const [mapCenter, setMapCenter] = useState({
    lat: threatD.data.lat_threat,
    lng: threatD.data.long_threat,
  });
   useEffect(() => {
    if (!map) return;

    map.panTo(mapCenter);
  }, [mapCenter]);


  //mk4 faulty
/*
  async function get_calculated_threat(lat_friend:number,long_friend:number,lat_threat:number,long_threat:number,range:number){
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      x: long_friend,
      y: lat_friend,
      a: long_threat,
      b: lat_threat,
      range: range
    });
    console.log(response.data);
    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        long_friend: response.data.x,
        lat_friend: response.data.y,
        long_threat: response.data.a,
        lat_threat: response.data.b,
        range:response.data.range,
        threatend: response.data.result,
        
      }
    });
  }

  async function handeChange(change:number,changed_field:string) {
    ///*
    switch(changed_field){
      case "x":
        setThreat({
          ...threatD,
          data: {
            ...threatD.data,
            lat_friend: threatD.data.lat_friend,
            long_friend: change,
            long_threat: threatD.data.long_threat,
            lat_threat: threatD.data.lat_threat,
            range:threatD.data.range,
          }
        });
        console.log(change)
        console.log(threatD.data)
        get_calculated_threat(threatD.data.lat_friend,change,threatD.data.lat_threat,threatD.data.long_threat,threatD.data.range)
        console.log('case x done')
        
      case "y":
        setThreat({
            ...threatD,
            data: {
              ...threatD.data,
              lat_friend: change,
            }
        });
        get_calculated_threat(threatD.data.lat_friend,threatD.data.long_friend,threatD.data.lat_threat,threatD.data.long_threat,threatD.data.range)

      case "a":
        setThreat({
            ...threatD,
            data: {
              ...threatD.data,
              long_threat: change,
            }
        });
        get_calculated_threat(threatD.data.lat_friend,threatD.data.long_friend,threatD.data.lat_threat,threatD.data.long_threat,threatD.data.range)

      case "b":
        setThreat({
            ...threatD,
            data: {
              ...threatD.data,
              lat_threat: change,
            }
        });
        get_calculated_threat(threatD.data.lat_friend,threatD.data.long_friend,threatD.data.lat_threat,threatD.data.long_threat,threatD.data.range)

      case "r":
        setThreat({
            ...threatD,
            data: {
              ...threatD.data,
              range:change,
            },
        });
        get_calculated_threat(threatD.data.lat_friend,threatD.data.long_friend,threatD.data.lat_threat,threatD.data.long_threat,threatD.data.range)
    }
    
    
    
    
    console.log ("frontend answer: "+threatD.data.threatend)
  }

  function handle_LatChange____(e: { target: { value: any; }; }){
    handeChange(e.target.value,"y")
  }
  function handle_LongChange____(e: { target: { value: any; }; }){
    console.log(e.target.value)
    console.log('change x')
    handeChange(e.target.value,"x")
    
  }
  function handle_Lau_LatChange____(e: { target: { value: any; }; }){
    handeChange(e.target.value,"b")
  }
  function handle_Lau_LongChange____(e: { target: { value: any; }; }){
    handeChange(e.target.value,"a")
  }
  function handleRChange____(e: { target: { value: any; }; }){
    handeChange(e.target.value,"r")
  }
*/

  async function handle_speedChange____(e: { target: { value: any; }; }) {
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      speed: e.target.value,
      a: threatD.data.long_threat,
      b: threatD.data.lat_threat,
      range:threatD.data.range,
    });
    console.log("the response of handleSpeedChange is: speed:"+(response.data.speed)+" a:"+(response.data.a)+" b:"+(response.data.b)+" range:"+(response.data.range)+" timeToIntercept"+(response.data.closingTime)+" friendly:"+(response.data.ClosestFriendly))
    
    if (response.data.ClosestFriendly[0]==="no friendlies in range"){
      setThreat({
        ...threatD,
        data: {
          ...threatD.data,
          threatSpeed: response.data.speed,
          long_threat: response.data.a,
          lat_threat: response.data.b,
          range:response.data.range,
          jet_lat:'',
          jet_long:'',
          jet_id:'',
          interceptTime:'No friendlies in range!',
          }
      });
    }else{
      let TTI:number//time to impact
      TTI = response.data.closingTime
      TTI = Math.floor(TTI*10000)
      TTI = TTI/10000
      let tti:string =""+ TTI +" Hours"
      if(response.data.closingTime<1){
        TTI = TTI*60
        TTI = Math.floor(TTI*10)
        TTI = TTI/10
        tti=""+TTI+" Minutes"
      }
      setThreat({
        ...threatD,
        data: {
          ...threatD.data,
          threatSpeed: response.data.speed,
          long_threat: response.data.a,
          lat_threat: response.data.b,
          range:response.data.range,
          jet_lat:       "Colsest frindly at lat:  "+response.data.ClosestFriendly[6],
          jet_long:      "Colsest frindly at long: "+response.data.ClosestFriendly[5],
          interceptTime: "Time to intercept: "+TTI+" Hours",
          jet_id:        "Friendly Registry: "+response.data.ClosestFriendly[2],
        }
      });
    }
    setMapCenter
  }
  async function handle_Lau_LatChange____(e: { target: { value: any; }; }) {
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      speed: threatD.data.threatSpeed,
      a: threatD.data.long_threat,
      b: e.target.value,
      range:threatD.data.range,
    });
    console.log("the response of handle_Lau_LatChange is: speed:"+(response.data.speed)+" a:"+(response.data.a)+" b:"+(response.data.b)+" range:"+(response.data.range)+" timeToIntercept"+(response.data.closingTime)+" friendly:"+(response.data.ClosestFriendly))
    
    if (response.data.ClosestFriendly[0]==="no friendlies in range"){
      setThreat({
        ...threatD,
        data: {
          ...threatD.data,
          threatSpeed: response.data.speed,
          long_threat: response.data.a,
          lat_threat: response.data.b,
          range:response.data.range,
          jet_lat:'',
          jet_long:'',
          jet_id:'',
          interceptTime:'No friendlies in range!',
          }
      });
    }else{
      let TTI:number//time to impact
      TTI = response.data.closingTime
      TTI = Math.floor(TTI*10000)
      TTI = TTI/10000
      let tti:string =""+ TTI +" Hours"
      if(response.data.closingTime<1){
        TTI = TTI*60
        TTI = Math.floor(TTI*10)
        TTI = TTI/10
        tti=""+TTI+" Minutes"
      }
      setThreat({
        ...threatD,
        data: {
          ...threatD.data,
          threatSpeed: response.data.speed,
          long_threat: response.data.a,
          lat_threat: response.data.b,
          range:response.data.range,
          jet_lat:       "Colsest frindly at lat:  "+response.data.ClosestFriendly[6],
          jet_long:      "Colsest frindly at long: "+response.data.ClosestFriendly[5],
          interceptTime: "Time to intercept: "+TTI+" Hours",
          jet_id:        "Friendly Registry: "+response.data.ClosestFriendly[2],
        }
      });
    }
    setMapCenter
    if(response.data.y < 0){
      threatD.data.n = 'S'  
    }else{
      threatD.data.n = 'N'
    }
  }
  async function handle_Lau_LongChange____(e: { target: { value: any; }; }) {
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      speed: threatD.data.threatSpeed,
      a: e.target.value,
      b: threatD.data.lat_threat,
      range:threatD.data.range,
    });
    console.log("the response of handle_Lau_LongChange is: speed:"+(response.data.speed)+" a:"+(response.data.a)+" b:"+(response.data.b)+" range:"+(response.data.range)+" timeToIntercept"+(response.data.closingTime)+" friendly:"+(response.data.ClosestFriendly))
    
    if (response.data.ClosestFriendly[0]==="no friendlies in range"){
      setThreat({
        ...threatD,
        data: {
          ...threatD.data,
          threatSpeed: response.data.speed,
          long_threat: response.data.a,
          lat_threat: response.data.b,
          range:response.data.range,
          jet_lat:'',
          jet_long:'',
          jet_id:'',
          interceptTime:'No friendlies in range!',
          }
      });
    }else{
      let TTI:number//time to impact
      TTI = response.data.closingTime
      TTI = Math.floor(TTI*10000)
      TTI = TTI/10000
      let tti:string =""+ TTI +" Hours"
      if(response.data.closingTime<1){
        TTI = TTI*60
        TTI = Math.floor(TTI*10)
        TTI = TTI/10
        tti=""+TTI+" Minutes"
      }
      setThreat({
        ...threatD,
        data: {
          ...threatD.data,
          threatSpeed: response.data.speed,
          long_threat: response.data.a,
          lat_threat: response.data.b,
          range:response.data.range,
          jet_lat:       "Colsest frindly at lat:  "+response.data.ClosestFriendly[6],
          jet_long:      "Colsest frindly at long: "+response.data.ClosestFriendly[5],
          interceptTime: "Time to intercept: "+TTI+" Hours",
          jet_id:        "Friendly Registry: "+response.data.ClosestFriendly[2],
        }
      });
    }
    setMapCenter
    if (response.data.a <0){
      threatD.data.e = 'W'
    }else{
      threatD.data.e = 'E'
    }
  }
  async function handleRChange____(e: { target: { value: any; }; }) {
    
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      speed: threatD.data.threatSpeed,
      a: threatD.data.long_threat,
      b: threatD.data.lat_threat,
      range: e.target.value
    });
    console.log("the response of handleRChange is: speed:"+(response.data.speed)+" a:"+(response.data.a)+" b:"+(response.data.b)+" range:"+(response.data.range)+" timeToIntercept"+(response.data.closingTime)+" friendly:"+(response.data.ClosestFriendly))
    
    if (response.data.ClosestFriendly[0]==="no friendlies in range"){
      setThreat({
        ...threatD,
        data: {
          ...threatD.data,
          threatSpeed: response.data.speed,
          long_threat: response.data.a,
          lat_threat: response.data.b,
          range:response.data.range,
          jet_lat:'',
          jet_long:'',
          jet_id:'',
          interceptTime:'No friendlies in range!',
          }
      });
    }else{
      let TTI:number//time to impact
      TTI = response.data.closingTime
      TTI = Math.floor(TTI*10000)
      TTI = TTI/10000
      let tti:string =""+ TTI +" Hours"
      if(response.data.closingTime<1){
        TTI = TTI*60
        TTI = Math.floor(TTI*10)
        TTI = TTI/10
        tti=""+TTI+" Minutes"
      }
      setThreat({
        ...threatD,
        data: {
          ...threatD.data,
          threatSpeed: response.data.speed,
          long_threat: response.data.a,
          lat_threat: response.data.b,
          range:response.data.range,
          jet_lat:       "Colsest frindly at lat:  "+response.data.ClosestFriendly[6],
          jet_long:      "Colsest frindly at long: "+response.data.ClosestFriendly[5],
          interceptTime: "Time to intercept: "+tti,
          jet_id:        "Friendly Registry: "+response.data.ClosestFriendly[2],
        }
      });
    }
    setMapCenter
  }
  //*/

  return(
    <> 
      <div className="baseline" >
        <table style={{width:"100%",height:"100%" }}>
          <tbody>

          
            <tr>
              <td colSpan={3}>
                <h1 style={{fontFamily:"cursive"}}>Find the closest friendly jet threatened</h1>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <table>
                  <tbody>
                    <tr>
                      <td><div className="threat_param">Threat speed (MPH)</div></td>
                      <td>
                        <input
                          type="number"
                          value={threatD.data.threatSpeed}
                          onChange={handle_speedChange____}/>
                      </td>
                      <td>
                        {threatD.data.interceptTime}
                      </td>
                    </tr>
                    <tr>
                      <td>lat_Launch</td>
                      <td>
                        <input
                          type="number"
                          value={threatD.data.lat_threat}
                          onChange={handle_Lau_LatChange____}/>
                      </td>
                      <td>
                        {threatD.data.jet_lat}
                      </td>
                      
                    </tr>
                    <tr>
                      <td>long_Launch</td>
                      <td>
                        <input
                          type="number"
                          value={threatD.data.long_threat}
                          onChange={handle_Lau_LongChange____}/>
                      </td>
                      <td>
                        {threatD.data.jet_long}
                      </td>
                    </tr>
                    <tr>
                      <td>Threat Range in nautical Miles:</td>
                      <td>
                        <input
                          type="number"
                          value={threatD.data.range}
                          onChange={handleRChange____}/>
                          
                      </td>
                      <td>
                        {threatD.data.jet_id}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div style={{ width: "60vw", height: "50vh" }}>

                          <APIProvider apiKey="AIzaSyAXopL59J_almetTtcRi9YXp25YxLxyhoc" >
                              <Map defaultZoom={8} defaultCenter={{ lat: threatD.data.lat_threat, lng: threatD.data.long_threat }} mapId="DEMO_MAP_ID">
                                <AdvancedMarker
                                    position={mapCenter}
                                  />
                              </Map>
                          </APIProvider>
                          </div>
                      </td>
                    </tr>
                      

                  </tbody>
                </table>
              </td>
            </tr> 
            <tr>
              <td colSpan={2}>
                <div>
                  <i style={{fontFamily:"cursive"}}>launched from: {threatD.data.long_threat} {threatD.data.n}° , {threatD.data.lat_threat} {threatD.data.e}°. with a range of: {threatD.data.range} nautical Miles</i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      
      </div>
            
          
        
    </> 
  )

}






                     


/*
<div style={{ width: "60vw", height: "50vh" }}>
            <APIProvider apiKey="AIzaSyAXopL59J_almetTtcRi9YXp25YxLxyhoc">
              <div className="map-container">
                <Map zoom={12} center={{ lat: threatD.data.y, lng: threatD.data.x }} mapId="DEMO_MAP_ID"/>
              </div>
            </APIProvider>
          </div>




<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXopL59J_almetTtcRi9YXp25YxLxyhoc&callback=initMap"></script>



function initMap() {
  let map;
  // The map, centered on Central Park
  const center = {lat: 40.774102, lng: -73.971734};
  const options = {zoom: 15, scaleControl: true, center: center};
  map = new google.maps.Map(
      document.getElementById('map'), options);
  // Locations of landmarks
  const dakota = {lat: 40.7767644, lng: -73.9761399};
  const frick = {lat: 40.771209, lng: -73.9673991};
  // The AdvancedMarkers for The Dakota and The Frick Collection
  let mk1 = new google.maps.AdvancedMarker({position: dakota, map: map});
  let mk2 = new google.maps.AdvancedMarker({position: frick, map: map});
}*/


export default App