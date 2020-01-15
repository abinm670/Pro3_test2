import React from 'react';
import Time from './Time';
import axios from 'axios';
import GetCityInfo from './GetCityInfo';
import Resturant from './Resturant'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
//const citiesId=["1","2"]
export default class City extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props.match.params.id)
    this.state = {
      alpha: this.props.alphaCode,
      cities: [],
      citiesId: [],
      citiesName: [],
      img: [],
      citiesName2: "",
      imgs: []
    }
  }
  componentDidMount() {
    // const axios = require("axios");
    axios({
      "method": "GET",
      "url": "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "62e41a0607mshcef95c3b6c98e0bp1e76d1jsnf4fcca6a5b6a"
      },
      "params": {
        "countryIds": `${this.props.match.params.id}`
        // `${this.props.alphaCode}`
      }
    })
      .then(res => {
        for (let i = 0; i < 5; i++) {
          this.setState({ cities: this.state.cities.concat(res.data.data[i]) })
          this.setState({ citiesId: this.state.citiesId.concat(res.data.data[i].id) })
          this.setState({ citiesName: this.state.citiesName.concat(res.data.data[i].name) })
          this.setState({ citiesName2: this.state.citiesName2.concat(res.data.data[i].name) })
        };
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
    // var x =this.state.citiesName2; 
    // console.log(x);
    for (let i = 0; i <= this.state.citiesName.length; i++) {
      axios({
        "method": "GET",
        "url": "https://tripadvisor1.p.rapidapi.com/locations/search",
        "headers": {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          "x-rapidapi-key": "62e41a0607mshcef95c3b6c98e0bp1e76d1jsnf4fcca6a5b6a"
        }, "params": {

          "query": `${this.state.citiesName[i]}`

          ,
          "lang": "en_US",
          "units": "km",

        }
      })
        .then((response) => {
          console.log(this.state.citiesName[i])

          this.setState({ img: this.state.img.concat(response.data.data[i].result_object.photo.images.small.url) })

        })
        .catch((error) => {
          console.log(error)

        })
    }
  }
  render() {
    console.log(this.state.citiesName)

    return (
      <Router>
        <div>
          {/* <Link to="/Time">Time</Link>{" "} */}
          {/* <Link to="/GetCityInfo">GetCityInfo</Link>{" "} */}
          <Link to="/Time">Time</Link>
          <ul>
            {this.state.cities.map(city => <Link to="/GetCityInfo"><li>{city.name}</li></Link>)}
            {/* { this.state.citiesId.map(cityId => <li>{cityId.id}</li>)} */}
            {this.DisplayRest()}
            <Route path="/GetCityInfo" component={() => <GetCityInfo cityName2={this.state.citiesName} />} />
            <Route path="/Time" component={() => <Time cityIdTime={this.state.citiesId} />} />
          </ul>
        </div>
      </Router>
    )
  }
  DisplayRest() {
    return (
      <div>
        {this.state.cities.map((n, index) => (
          <div>
            <img src={this.state.img[index]} alt="..." />
          </div>
        ))}
      </div>)
  }
}