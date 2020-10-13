import React, {useState, useRef} from 'react'
import axios from "axios";
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import { Header, Footer, Sidebar } from "components";

import {
    Row,
    Col,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Input,
    Form,
    FormGroup,
    Label,
  } from "reactstrap";
  var amountUploaded = 0;
  var amountNotUploaded = 0;
function Upload(props){
    const [tal, setTal] = useState('')
    const [files, setFiles] = useState('')
    const [fileslength, setFilesLength] = useState('')

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(true)
    const [custname, setCustname] = useState('')
    const [custemail, setCustemail] = useState('')
    const [tempcode, setTempcode] = useState('')
    const [amoutUploadedFiles, setAmountUploadedFiles] = useState(0)
    const [amoutNotUploadedFiles, setAmountNotUploadedFiles] = useState(0)
   
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") + ""}`
        }
      };

      const inputRef = useRef();
      const onClick = () => {
        if (inputRef.current) {
          inputRef.current.select();
          inputRef.current.setSelectionRange(0, 9999);
          document.execCommand("copy");
        }
      };
   const submitHandler = async e => {
       
       amountUploaded = 0;
       amountNotUploaded = 0;
    e.preventDefault();
    const data = new FormData()
   if(files.length > 0){
       setFilesLength(files)
    const temp_passres = await axios.post(
        "https://tozophoto.azurewebsites.net/api/temppass",
        {
          custname: custname,
          custemail: custemail,
          usercompanyname: `${localStorage.getItem("companyname")}`
        },
        config,
      ); 
      console.log(`${localStorage.getItem("companyname")}`)
        
      setTempcode("https://focus-foto.azureedge.net/users/" + temp_passres.data.tempPassword)
      
        for (var i=0; i < files.length; i++) {
            data.append('file', files[i])
            data.append('upload_preset', 'dmtdmtdmt')
           
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dqacelyhg/image/upload', 
            {method: 'POST', 
        body: data,
      }
        )
      
       
        let file = await res.json();
       
            console.log(file.public_id)
        setImage(file.secure_url)
        await axios.post(
            "https://tozophoto.azurewebsites.net/api/imagetemppass",
            {
            imagelink: file.secure_url,
            originalfilename: file.original_filename +"."+ file.format,
            temppasswordid: temp_passres.data.id,
            publicid: file.public_id
            },
            config           
          ).then(response => {
        
           setAmountUploadedFiles(amountUploaded += 1);
            setCustemail("")
            setCustname("")
            setFiles("")
            
            
            
          })
          .catch(error => {
          
            
            setAmountNotUploadedFiles(amountNotUploaded += 1)
              
          });    

        }     
        setLoading(false) 
    }
    
       console.log(tal)
       
             
   }
console.log(tal)
    const uploadImage = async e => {
        setLoading(true)
        setFiles(e.target.files)

        console.log(files, 2222)     
    }

    return(
      <div id="page-container">
        <div id="content-wrap">
        <div className="App">
             <PanelHeader size="sm" />
            
           <div style={{textAlign: "center", color: "grey", fontFamily: "verdana",  marginTop: "20px"}}>
             <h1>Upload image</h1>
             </div>
           <div style={{marginTop: "50px"}}>
            <Form inline>
                
            <Input style={{marginLeft: "10px"}} type="file" name="file" multiple="multiple" onChange={uploadImage} />
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0" style={{marginTop: "20px", marginLeft: "10px"}}>
      <FormGroup  className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="exampleEmail" className="mr-sm-2">Name</Label>
        <Input type="text" style={{width: "200px", backgroundColor: "white"}} value={custname} placeholder="Customer Name" onChange={e => setCustname(e.target.value)}  />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="examplePassword" className="mr-sm-2">Email</Label>
        <Input type="text" style={{width: "200px", backgroundColor: "white"}} value={custemail}  placeholder="Customer Email" onChange={e => setCustemail(e.target.value)}  />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="examplePassword" className="mr-sm-2">Link</Label>
        <Input style={{width: "300px", backgroundColor: "white"}} innerRef={inputRef} value={tempcode} readOnly  />
        <Button style={{marginLeft: "5px"}} color="secondary" size="sm" onClick={onClick}>Copy</Button>
      </FormGroup>
      <Button onClick={submitHandler} style={{ marginLeft: "10px", backgroundColor: "#4CAF50", fontSize: "13px"}}>Upload</Button>
      </FormGroup>
    
    </Form>
    
    </div>
        
            {loading == false && fileslength.length > 0 ? (
               <h5  style={{ marginLeft:"20px", marginTop: "10px"}}>Loaded</h5>
            ):(
                <h3></h3>
            )}
            <div style={{marginTop: "50px", marginLeft: "10px"}}>
            <h6>Successfully uploaded Files: {amountUploaded}</h6>
            <br></br>
            <h6>Failed Files: {amountNotUploaded}</h6>
            </div>
          </div>
          </div>
         
        </div>
        
    )
}
export default Upload