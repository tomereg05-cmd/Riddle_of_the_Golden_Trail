
import { useState , useEffect} from "react";
import CalculatorD from "../../backend/calc.ts";
//import 'index.css';
//import React from "react";
///*
import {
  APIProvider,
  Map,
  Marker, 
  useMap,
} from "@vis.gl/react-google-maps";

//*/


function App() {
  const [threatD,setThreat] =useState({
    data: {
      y: 31.919864368108467 ,
      x: 34.96432543129473 ,
      b: 32.03459017351866,
      a: 33.82495395183825,
      r: 1,
      n: 'N',
      e: 'E',
      threatend:false,
      dist:69.16944444444445
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
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map defaultCenter={mapCenter} defaultZoom={10}>
        <Marker
          position={mapCenter}
          onClick={({latLng}) => setMapCenter(latLng)}
        />
      </Map>
    </div>
  );
*/

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
    console.log('done!')
  }
  return(
        <> 
            <table
              className="lister">
              <tbody>
                <tr>
                  <td>lat_jet</td>
                  <td>
                    <input
                      type="number"
                      value={threatD.data.y}
                      onChange={handle_LatChange}/>
                  </td>
                </tr>
                <tr>
                  <td>long_jet</td>
                  <td>
                    <input
                      type="number"
                      value={threatD.data.x}
                      onChange={handle_LongChange}/>
                  </td>
                </tr>
                <tr>
                  <td>lat_Launch</td>
                  <td>
                    <input
                      type="number"
                      value={threatD.data.b}
                      onChange={handle_Lau_LatChange}/>
                  </td>
                </tr>
                <tr>
                  <td>long_Launch</td>
                  <td>
                    <input
                      type="number"
                      value={threatD.data.a}
                      onChange={handle_Lau_LongChange}/>
                  </td>
                </tr>
                <tr>
                  <td>Threat Range in Miles:</td>
                  <td>
                    <input
                      type="number"
                      value={threatD.data.dist}
                      onChange={handleRChange}/>
                      
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div style={{ width: "60vw", height: "50vh" }}>

                     <APIProvider apiKey="AIzaSyAXopL59J_almetTtcRi9YXp25YxLxyhoc" >
                          <Map defaultZoom={12} defaultCenter={{ lat: threatD.data.y, lng: threatD.data.x }} mapId="DEMO_MAP_ID">
                            <Marker
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
  // The markers for The Dakota and The Frick Collection
  let mk1 = new google.maps.Marker({position: dakota, map: map});
  let mk2 = new google.maps.Marker({position: frick, map: map});
}
*/

export default App




