import React,{Component} from 'react';
import axios from 'axios';
import City from './City';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
  
  class Attraction extends Component {  
    constructor(props){
        super(props);
        this.state={
            landmark: [], 
         name:[],
        website:[],
         img:[],
          cityIdR: this.props.cityIdAttraction
        }
       // console.log(this.props.cityIdAttraction+"this.props.cityIdAttraction")
    }

    
componentDidMount(){
const axios = require("axios");

axios({
    "method":"GET",
    "url":"https://tripadvisor1.p.rapidapi.com/attractions/list",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"tripadvisor1.p.rapidapi.com",
    "x-rapidapi-key":"62e41a0607mshcef95c3b6c98e0bp1e76d1jsnf4fcca6a5b6a"
    },"params":{
    "lang":"en_US",
    "currency":"USD",
    "sort":"recommended",
    "lunit":"km",
    "limit":"30",
    "bookable_first":"false",
    "subcategory":"36",
    "location_id":"186338"
        // `${this.props.cityIdAttraction}`

    }
    })
    .then((response)=>{
        console.log("i am in then")
        console.log(response)
      for(let i in response.data.data){
          console.log("i am in for")
           this.setState({name: this.state.name.concat(response.data.data[i].name)})
            this.setState({website: this.state.website.concat(response.data.data[i].website)})
           this.setState({img: this.state.img.concat(response.data.data[i].photo.images.small.url)} )
    
        //  this.setState(prev=>{
        //     prev.landmark.concat({
        //          name: response.data.data[0].name,
        //         //  website: response.data.data[i].website,
        //        // img: response.data.data[i].photo.images.small.url
        //     }
        //     )
        //  })  
      }

      //samar
    //   for(var i=0;i<response.data.data.length;i++){
    //       console.log("I am in for")
    //       this.setState(prevStat=>({
    //           landmark:prevStat.landmark.push({
    //               name: response.data.data[i].name,
    //               website: response.data.data[i].website,
    //               img: response.data.data[i].photo.images.small.url
    //           })
    //       }))
    //}    

    //abdullah
    //     // this.setState({name: this.state.name.concat(response.data.data[i].name)})
    //     // this.setState({website: this.state.website.concat(response.data.data[i].website)})
    //     // this.setState({img: this.state.img.concat(response.data.data[i].photo.images.small.url)} )
    // }

    //   this.setState({ 
    //     name:response.data.data[0].name,
    //     website:response.data.data[0].website,
    //     img:response.data.data[0].photo.images.small.url  
    //   });

    })
    .catch((error)=>{
      console.log(error)
    })
    
}

render(){
    
    return(
        <div>
            <div>
               {this.DisplayAttrac()} 
                {/* <h3>{this.state.landmark[0].name}</h3> */}
                 {/* <p>{this.state.name}</p>
                <p>{this.state.website}</p>
            <img src={this.state.img}  alt="..." /> */}
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div> 
    );

}
DisplayAttrac(){
    // if(this.state.name[index]=="undefined"||this.state.website[index]=="undefined"){
    //     continue
    // }
    // else{
        return(
            <div>
            
                { this.state.name.map((n, index) => (
                    
                    <div>
                    <h3>{this.state.name[index]}</h3>
                    <h3>{this.state.website[index]}</h3>
                    <img src={this.state.img[index]}  alt="..." />
                    </div>
            ))}
            
            {/* <h3>{this.state.name[i]}</h3>
            <p>{this.state.website[i]}</p> */}
            </div>)
   // }
    
        
   // }
}
}

export default Attraction;