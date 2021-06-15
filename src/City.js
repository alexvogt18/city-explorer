import React from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


class City extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      city: '',
      displayName: '',
      cityLon: 0,
      cityLat: 0,
      citySrc: ''
    };
  }

  handleChange = (e) => {
    this.setState({ city: e.target.value })
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    const key = process.env.REACT_APP_EXPLORER_API_KEY;

    let URL = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${this.state.city}&format=json`;

    const response = await axios.get(URL);

    console.log(response);

    const cityInformation = response.data[0];

    let cityLon = cityInformation.lon;

    let cityLat = cityInformation.lat;

    let locationURL = `https://maps.locationiq.com/v3/staticmap?key=${key}&center=${cityLat},${cityLon}&zoom=2`

    const localResponse = await axios.get(locationURL);

    let citySrc = localResponse.png;

    let displayName = cityInformation.display_name;

    this.setState({displayName});
    this.setState({cityLat});
    this.setState({cityLon});
    this.setState({citySrc});

  }

  render() {
    return (
      <>
        <Form onSubmit = {this.handleSubmit} >
          <Form.Group controlId="city name">
            <Form.Label>City Name</Form.Label>
            <Form.Control onChange = {this.handleChange} type="city" placeholder="Enter City Name Here!" />
            <Button onClick = {this.handleSubmit}>Explore!</Button>
          </Form.Group>
        </Form>
        <h2>{this.state.city}</h2>
        <h2>{this.state.displayName}</h2>
        <ul>
          <li>This City's Latitude is: {this.state.cityLat}</li>
          <li>This City's Longitude is: {this.state.cityLon}</li>
        </ul>
        <div>{this.state.citySrc}</div>
      </>
    );
  }
 }
export default City;