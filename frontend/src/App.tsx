
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
      y: 31.91986436810846 ,
      x: 34.9643254312947 ,
      b: 32.0345901735186,
      a: 33.8249539518382,
      r: 1,
      n: 'N',
      e: 'E',
      threatend:false,
      dist:60
    }
    
  })
  const map = useMap();
  const [mapCenter, setMapCenter] = useState({
    lat: threatD.data.y,
    lng: threatD.data.x
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
    console.log("backend answer: "+response.data.isInside);
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
    console.log("backend answer: "+response.data.isInside);

    

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
    console.log("backend answer: "+response.data.isInside);

    

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
    console.log("backend answer: "+response.data.isInside);

    

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
    console.log("backend answer: "+response.data.isInside);
    

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
    console.log("backend answer: "+response.data.isInside);
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
    console.log("backend answer: "+response.data.isInside);

    

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
    console.log("backend answer: "+response.data.isInside);

    

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
    console.log("backend answer: "+response.data.isInside);

    

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
    console.log("backend answer: "+response.data.isInside);
    

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
      <h1>Learn and Practice: make mistakes</h1>
      <table
        className="lister">
        <tbody>
          <tr>
            <td>lat_jet</td>
            <td>
              <input
                type="number"
                value={threatD.data.y}
                onChange={handle_LatChange____}/>
            </td>
          </tr>
          <tr>
            <td>long_jet</td>
            <td>
              <input
                type="number"
                value={threatD.data.x}
                onChange={handle_LongChange____}/>
            </td>
          </tr>
          <tr>
            <td>lat_Launch</td>
            <td>
              <input
                type="number"
                value={threatD.data.b}
                onChange={handle_Lau_LatChange____}/>
            </td>
          </tr>
          <tr>
            <td>long_Launch</td>
            <td>
              <input
                type="number"
                value={threatD.data.a}
                onChange={handle_Lau_LongChange____}/>
            </td>
          </tr>
          <tr>
            <td>Threat Range in nautical Miles:</td>
            <td>
              <input
                type="number"
                value={threatD.data.dist}
                onChange={handleRChange____}/>
                
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div style={{ width: "60vw", height: "50vh" }}>

                <APIProvider apiKey="AIzaSyAXopL59J_almetTtcRi9YXp25YxLxyhoc" >
                    <Map defaultZoom={12} defaultCenter={{ lat: threatD.data.y, lng: threatD.data.x }} mapId="DEMO_MAP_ID">
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
      <div>
        <i>launched from: {threatD.data.a} {threatD.data.n}° , {threatD.data.b} {threatD.data.e}°. with a range of: {threatD.data.r} degrees</i>
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