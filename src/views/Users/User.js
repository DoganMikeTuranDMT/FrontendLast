import React, {useState,useEffect} from 'react'
import { withSnackbar } from "notistack";
import axios from "axios";
import Gallery from 'react-grid-gallery';
import apiFacade from "../../auth/apiFacade";
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import "../../assets/css/test.css"
import Footer from "../../components/Footer/Footer"
import {
        Row,
        Col,
        Button,
        Card,
        CardBody,
        CardHeader,
        CardTitle
      } from "reactstrap";

function User(props){

    const [isSelected, setIsSelected] = useState(false)
    const [custname, setCustname] = useState('')
    const [tester, setTester] = useState('')
    const [test, setTest] = useState(true)
    const [images, setImages] = useState("")
    const [loadedimages, setLoadedimages] = useState([])
    const [original, setOriginal] = useState("")
    const [count, setCount] = useState(0);
    const [feedback, setFeedback] = useState('')
    const [name, setName] = useState('Tony')
    const [email, setEmail] = useState('doganmiketuran@gmail.com')
  
    useEffect(() => {
      
        apiFacade.getData(
          `temppass/get/${props.match.params.id}`
          
          
        ).then(response => setLoadedimages(response.map((s, index )=> ({
                src: response[index].imageLink,
                originalFileName: response[index].originalFileName + " |",
                custName: response[index].custName,
                custEmail: response[index].custEmail,
                tempPasswordId: response[index].tempPasswordId,
                thumbnail: response[index].imageLink,
                userCompanyName: response[index].userCompanyName,
                publicId: response[index].publicId
                
                
                
        })))).catch(err => console.log("error!"));
        
       
       
    }, []);

    

   
    const onSelectImage = (index) => {
        var a = 0;
         console.log(loadedimages[0]) 
         // loadedimages = img  
      var images = loadedimages.slice();
      var img = loadedimages[index];

      // do something with image here
     
      console.log(loadedimages[0].userCompanyName)
      
      if(img.hasOwnProperty("isSelected")){
      setImages(images);
      img.isSelected = !img.isSelected;
      }
  else{
      img.isSelected = true;
      setImages(images)
  }
  for (let index = 0; index < loadedimages.length; index++) {
    if(loadedimages[index].isSelected){
        a += 1;
    }
}
setCount(a);  
  }
  
 const sendFeedback = (templateId, variables) => {
	window.emailjs.send(
  	'gmail', templateId,
  	variables
  	).then(res => {
    	console.log('Email successfully sent!')
  	})
  	// Handle errors here however you like, or use a React error boundary
  	.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }

   const submitHandler = async e => {

    e.preventDefault();
    var arrayOfFileNames = [];

    for (let index = 0; index < loadedimages.length; index++) {
        if(loadedimages[index].isSelected){

           arrayOfFileNames.push(loadedimages[index].originalFileName) 
        }
    }
    
    console.log(arrayOfFileNames)
     const mappedArrayOfFileNames = arrayOfFileNames.map(e => 
        e.split('|').join('| ')
    )
    var listOfPublicId = [];
  for (let index = 0; index < loadedimages.length; index++) {
      listOfPublicId.push(loadedimages[index].publicId)
      
  }
  await axios.post(
    "https://focusfoto.azurewebsites.net/api/image",
    
    listOfPublicId
    
  )
    console.log(listOfPublicId)
    console.log(mappedArrayOfFileNames)
     await apiFacade
     .DeleteData(`temppass/${loadedimages[0].tempPasswordId}`)
     .then(response => {
        props.enqueueSnackbar(`Successfully Sent to ${loadedimages[0].userCompanyName}`, { variant: "success" });

    })
    .catch(error => {
        props.enqueueSnackbar("Image not uploaded ", { variant: "error" });
        
          
      });    

    const templateId = 'template_h6b3jqo';

	sendFeedback(templateId, {message: mappedArrayOfFileNames, from_name: loadedimages[0].custName, cust_mail: loadedimages[0].custEmail, reply_to: email})
    console.log(original)
    setLoadedimages('')
   
    console.log(mappedArrayOfFileNames)
    
   }


    return loadedimages[0] == undefined ? (
     <div className="App">
         
         <PanelHeader size="sm" />
        <div style={{color: "red", fontFamily: "verdana", textAlign: "center", marginTop: "20px", fontSize: "30px" }}>Could not find data on this Link!</div>  
        <div id="page-container-user"></div>
        <Footer></Footer>
        </div>
        
        
    ) : ( <div className="App">
    <PanelHeader size="sm" />
    <h6 style={{marginTop: "10px", fontSize: "18px", fontFamily: "arial black"}}>Antal valgte billeder: {count}</h6>
<div >
    <div style={{textAlign: "center", fontSize:"45px", fontFamily: "verdana"}}>
{loadedimages[0].userCompanyName}
</div>
<div style={{
        
       display: "block",
       minHeight: "1px",
       width: "100%",
       border: "1px solid #ddd",
       overflow: "auto",
       marginTop: "70px",
       objectFit: "auto"}}>
                
    <Gallery
images={loadedimages}
onSelectImage={onSelectImage}
margin={2}
rowHeight={180}


    />
   
    </div>
    
    <div style={
            {display: "flex",
             flexDirection: "flex-end",
             alignItems: "flex-end",
             position: "right",
             justifyContent: "flex-end",
             marginRight: "1%",
             
            
            }
            }>
 
    <Button onClick={submitHandler} style={{backgroundColor: "#4CAF50", fontSize: "15px"}}>Send</Button>
    
    </div>
    <div id="page-container-user-with-foto"></div>
        <Footer></Footer>
        
    </div>
  
   
</div> )
       
    

}
export default withSnackbar(User)