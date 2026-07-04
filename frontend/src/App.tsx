
import { useState , useEffect} from "react";
//import CalculatorD from "../../backend/calc.ts";
//import 'index.css';
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
      lat_friend: 31.91986436810846 ,
      long_friend: 34.9643254312947 ,
      lat_threat: 32.0345901735186,
      long_threat: 33.8249539518382,
      n: 'N',
      e: 'E',
      threatend:false,
      range:60
    }
    
  })
  const map = useMap();
  const [mapCenter, setMapCenter] = useState({
    lat: threatD.data.lat_friend,
    lng: threatD.data.long_friend
  });
   useEffect(() => {
    if (!map) return;

    map.panTo(mapCenter);
  }, [mapCenter]);
/*

MK1 try:
  function handle_LatChange____= async(e: { target: { value: any; }; }) => {
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      x: threatD.data.x,
      y: e.target.value,
      a: threatD.data.a,
      b: threatD.data.b,
      r: threatD.data.r
    });
    console.log(response.data.isInside);

    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        y: e.target.value,
        threatend: response.data.isInside,
        
      }
      
    });
    //return console.log(response.data.isInside);
  }
*/

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

  // former input functionsL MK3
  ///*
  async function handle_LatChange____(e: { target: { value: any; }; }) {
    //explaining to my future self:
    //שולח לשרת שיחזיר לי את החישוב עם מה שיש לי
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      x: threatD.data.long_friend,
      y: e.target.value,
      a: threatD.data.long_threat,
      b: threatD.data.lat_threat,
      range: threatD.data.range
    });
    console.log("backend answer: "+response.data.result);
    //מעדכן את מה שצריך לעדכן לפי ההחזר של השרת
    //כנ"ל גם בפונקציות הבאות- אין לי כח לכתוב

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
    console.log ("frontend answer: "+threatD.data.threatend)
    //map.panTo(mapCenter)
  }
  async function handle_LongChange____(e: { target: { value: any; }; }) {
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      x: e.target.value,
      y: threatD.data.lat_friend,
      a: threatD.data.long_threat,
      b: threatD.data.lat_threat,
      range:threatD.data.range,
    });
    console.log("backend answer: "+response.data.result);

    

    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        long_friend: response.data.x,
        lat_friend: response.data.y,
        long_threat: response.data.a,
        lat_threat: response.data.b,
        range:response.data,
        threatend: response.data.result,
        
      }
    });
  }
  async function handle_Lau_LatChange____(e: { target: { value: any; }; }) {
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      x: threatD.data.long_friend,
      y: threatD.data.lat_friend,
      a: threatD.data.long_threat,
      b: e.target.value,
      range:threatD.data.range,
    });
    console.log("backend answer: "+response.data.result);

    

    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        long_friend: response.data.x,
        lat_friend: response.data.y,
        long_threat: response.data.a,
        lat_threat: response.data.b,
        threatend: response.data.result,
        range:response.data.range,
        
      }
    });
    
    if(response.data.y < 0){
      threatD.data.n = 'S'  
    }else{
      threatD.data.n = 'N'
    }
  }
  async function handle_Lau_LongChange____(e: { target: { value: any; }; }) {
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      x: threatD.data.long_friend,
      y: threatD.data.lat_friend,
      a: e.target.value,
      b: threatD.data.lat_threat,
      range:threatD.data.range,
    });
    console.log("backend answer: "+response.data.result);

    

    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        long_friend: response.data.x,
        lat_friend: response.data.y,
        long_threat: response.data.a,
        lat_threat: response.data.b,
        threatend: response.data.result,
        range:response.data.range
        
      }
    });
    if (response.data.a <0){
      threatD.data.e = 'W'
    }else{
      threatD.data.e = 'E'
    }
  }
  async function handleRChange____(e: { target: { value: any; }; }) {
    
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      x: threatD.data.long_friend,
      y: threatD.data.lat_friend,
      a: threatD.data.long_threat,
      b: threatD.data.lat_threat,
      range: e.target.value
    });
    console.log("backend answer: "+response.data.result);
    

    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        threatend: response.data.result,
        long_friend: response.data.x,
        lat_friend: response.data.y,
        long_threat: response.data.a,
        lat_threat: response.data.b,
        range:response.data.range,
        
      }
    });
    setMapCenter
    console.log('done!---------------------------------------------------------------------------------------------------------------------')
  }
  //*/

  // former input functionsL MK2
  /*
  
  async function handle_LatChange____(e: { target: { value: any; }; }) {
    //explaining to my future self:
    //שולח לשרת שיחזיר לי את החישוב עם מה שיש לי
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      x: threatD.data.x,
      y: e.target.value,
      a: threatD.data.a,
      b: threatD.data.b,
      r: threatD.data.dist,
      isInside: threatD.data.threatend,
      dist: threatD.data.dist
    });
    console.log("backend answer: "+response.data.result);
    //מעדכן את מה שצריך לעדכן לפי ההחזר של השרת
    //כנ"ל גם בפונקציות הבאות- אין לי כח לכתוב

    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        x: response.data.x,
        y: response.data.y,
        a: response.data.a,
        b: response.data.b,
        r: response.data.r,
        dist:response.data.dist,
        threatend: response.data.isInside,
        
      }
    });
    console.log ("frontend answer: "+threatD.data.threatend)
    map.panTo(mapCenter)
  }

  async function handle_LongChange____(e: { target: { value: any; }; }) {
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      x: e.target.value,
      y: threatD.data.y,
      a: threatD.data.a,
      b: threatD.data.b,
      r: threatD.data.dist,
      isInside: threatD.data.threatend,
      dist:threatD.data.dist,
    });
    console.log("backend answer: "+response.data.result);

    

    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        x: response.data.x,
        y: response.data.y,
        a: response.data.a,
        b: response.data.b,
        r: response.data.r,
        dist:response.data,
        threatend: response.data.isInside,
        
      }
    });
  }
  async function handle_Lau_LatChange____(e: { target: { value: any; }; }) {
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      x: threatD.data.x,
      y: threatD.data.y,
      a: threatD.data.a,
      b: e.target.value,
      r: threatD.data.dist,
      isInside: threatD.data.threatend,
      dist:threatD.data.dist,
    });
    console.log("backend answer: "+response.data.result);

    

    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        x: response.data.x,
        y: response.data.y,
        a: response.data.a,
        b: response.data.b,
        r: response.data.r,
        threatend: response.data.isInside,
        dist:response.data
        
      }
    });
    
    if(response.data.y < 0){
      threatD.data.n = 'S'  
    }else{
      threatD.data.n = 'N'
    }
  }
  async function handle_Lau_LongChange____(e: { target: { value: any; }; }) {
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      x: threatD.data.x,
      y: threatD.data.y,
      a: e.target.value,
      b: threatD.data.b,
      r: threatD.data.dist,
      isInside: threatD.data.threatend,
      dist:threatD.data.dist,
    });
    console.log("backend answer: "+response.data.result);

    

    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        x: response.data.x,
        y: response.data.y,
        a: response.data.a,
        b: response.data.b,
        r: response.data.r,
        threatend: response.data.isInside,
        dist:response.data.dist
        
      }
    });
    if (response.data.a <0){
      threatD.data.e = 'W'
    }else{
      threatD.data.e = 'E'
    }
  }
  async function handleRChange____(e: { target: { value: any; }; }) {
    
    const response = await axios.post('http://localhost:5000/api/check-threat', {
      x: threatD.data.x,
      y: threatD.data.y,
      a: threatD.data.a,
      b: threatD.data.b,
      r: e.target.value,
      isInside: threatD.data.threatend,
      dist: e.target.value
    });
    console.log("backend answer: "+response.data.result);
    

    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        threatend: response.data.isInside,
        x: response.data.x,
        y: response.data.y,
        a: response.data.a,
        b: response.data.b,
        r: response.data.r,
        dist:response.data.dist,
        
      }
    });
    setMapCenter
    console.log('done!---------------------------------------------------------------------------------------------------------------------')
  }

*/

  //former input functions: mk1
  /*
  function handle_LatChange(e: { target: { value: any; }; }) {
    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        y: e.target.value,
        threatend: CalculatorD.inside_threat_range(threatD.data.x , e.target.value, threatD.data.a ,threatD.data.b , threatD.data.r),
        
      }
      
    });
  }
  function handle_LongChange(e: { target: { value: any; }; }) {
    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        x: e.target.value,
        threatend: CalculatorD.inside_threat_range(e.target.value , threatD.data.y , threatD.data.a ,threatD.data.b , threatD.data.r)
      }
    });
  }
  function handle_Lau_LatChange(e: { target: { value: any; }; }) {
    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        b: e.target.value,
        threatend: CalculatorD.inside_threat_range(threatD.data.x , threatD.data.y , threatD.data.a ,e.target.value , threatD.data.r)
      }
    });
    
    if(threatD.data.y < 0){
      threatD.data.n = 'S'  
    }else{
      threatD.data.n = 'N'
    }
  }
  function handle_Lau_LongChange(e: { target: { value: any; }; }) {
    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        a: e.target.value,
        threatend: CalculatorD.inside_threat_range(threatD.data.x , threatD.data.y , e.target.value ,threatD.data.b , threatD.data.r)
      }
    });
    if (threatD.data.a <0){
      threatD.data.e = 'W'
    }else{
      threatD.data.e = 'E'
    }
  }
  function handleRChange(e: { target: { value: any; }; }) {
    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        dist: (e.target.value),
        threatend: CalculatorD.inside_threat_range(threatD.data.x , threatD.data.y , threatD.data.a ,threatD.data.b , (e.target.value)),
        r: CalculatorD.MilesToDeg(e.target.value),
        
      }
    });
    console.log('done!---------------------------------------------------------------------------------------------------------------------')
  }
  */

  return(
    <> 
      <table>
        <table
          className="lister">
          <tbody>
            <tr>
              <td>lat_jet</td>
              <td>
                <input
                  type="number"
                  value={threatD.data.lat_friend}
                  onChange={handle_LatChange____}/>
              </td>
            </tr>
            <tr>
              <td>long_jet</td>
              <td>
                <input
                  type="number"
                  value={threatD.data.long_friend}
                  onChange={handle_LongChange____}/>
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
            </tr>
            <tr>
              <td>long_Launch</td>
              <td>
                <input
                  type="number"
                  value={threatD.data.long_threat}
                  onChange={handle_Lau_LongChange____}/>
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
            </tr>
            <tr>
              <td colSpan={3}>
                <div style={{ width: "60vw", height: "50vh" }}>

                  <APIProvider apiKey="AIzaSyAXopL59J_almetTtcRi9YXp25YxLxyhoc" >
                      <Map defaultZoom={12} defaultCenter={{ lat: threatD.data.lat_friend, lng: threatD.data.long_friend }} mapId="DEMO_MAP_ID">
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
      </table>
      
      <div>
        <i>launched from: {threatD.data.long_threat} {threatD.data.n}° , {threatD.data.lat_threat} {threatD.data.e}°. with a range of: {threatD.data.range} nautical Miles</i>
      </div>
      <br />
      under threat: {String(threatD.data.threatend)}
            
          
        
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