
import { useState } from "react";
import CalculatorD from "../../backend/calc.ts";


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
      threatend:false
    }
    
  })
  
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
    }
  }
  function handleRChange(e: { target: { value: any; }; }) {
    setThreat({
      ...threatD,
      data: {
        ...threatD.data,
        r: e.target.value,
        threatend: CalculatorD.inside_threat_range(threatD.data.x , threatD.data.y , threatD.data.a ,threatD.data.b , e.target.value)
      }
    });
  }
  return(
        <>
          
            <label>
            lat_jet:
            <input
              type="number"
              value={threatD.data.y}
              onChange={handle_LatChange}/>
            </label>
            <label>
            Long_jet:
            <input
              type="number"
              value={threatD.data.x}
              onChange={handle_LongChange}/>
            </label>
            <label>
            lat_Launch:
            <input
              type="number"
              value={threatD.data.b}
              onChange={handle_Lau_LatChange}/>
            </label>
            <label>
            Long_Launch:
            <input
              type="number"
              value={threatD.data.a}
              onChange={handle_Lau_LongChange}/>
            </label>
            <label>
            Threat range in Miles:
            <input
              type="number"
              value={threatD.data.r}
              onChange={handleRChange}/>
            </label>
            
            <div>
              <i>launched from: {threatD.data.a} {threatD.data.n}° , {threatD.data.b} {threatD.data.e}°. with a range of: {threatD.data.r} degrees</i>
            </div>
            <br />
            under threat: {String(threatD.data.threatend)}
      </> 
  )

}

export default App




