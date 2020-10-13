import React, {useState} from 'react'
import axios from "axios";

function CodePhoto(){

    const [custname, setCustname] = useState('')
    const [test, setTest] = useState(true)
    
    

   const submitHandler = async e => {
    e.preventDefault();
    
    
    
   }

    const uploadImage = async e => {
     
    }


    return(
      
        <div className="App">
            <h1>Upload image</h1>
            <input type="file" name="file" multiple="multiple" onChange={uploadImage} />
            <input type="text" value={custname} placeholder="Customer Name" onChange={e => setCustname(e.target.value)} />
            <button>Upload</button>
            {test ? (
                <h3></h3>
            ):(
                <h3>Loaded</h3>
            )}
        </div>
       
    )

}
export default CodePhoto