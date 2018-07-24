import React, { Component } from 'react'
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react'
import MAP_KEY from '../config/Mapkey'
import CLIENT_ID from '../config/Clientid'
import CLIENT_SECRET from '../config/ClientSecret'
import swal from 'sweetalert'
import Powered from '../img/Powered.png'
import Sidebar from './Sidebar'

export class Container extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        showingListInfoWindow: false,
        listCoord: {lat: 0, lng: 0},
        venue: '',
        photoUrl: '',
        rating: ''
    }
    //map click
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null,
            showingListInfoWindow: false
          })
        }
    };

    //marker click
    onMarkerClick = (props, marker, e) => {
        fetch(`https://api.foursquare.com/v2/venues/${props.id}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180723`)
        .then(res => res.json())
        .then(data => this.setState({
            photoUrl: data.response.venue.bestPhoto.prefix + 'cap200' + data.response.venue.bestPhoto.suffix,
            rating: data.response.venue.rating
        })).catch((err) => {
            console.log(err)
            swal("Error!", "The api request has failed", "error")
        })
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        showingListInfoWindow: false
        });
    }
    //list click
    onListClick = (club) => {
        fetch(`https://api.foursquare.com/v2/venues/${club.id}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180723`)
        .then(res => res.json())
        .then(data => this.setState({
            photoUrl: data.response.venue.bestPhoto.prefix + 'cap200' + data.response.venue.bestPhoto.suffix,
            rating: data.response.venue.rating
        })).catch((err) => {
            console.log(err)
            swal("Error!", "The api request has failed", "error")
        });
        this.setState({
            showingListInfoWindow: true,
            showingInfoWindow: false,
            listCoord: {lat: club.lat, lng: club.lng},
            venue: club.name
        });
    }

    render () {
        const { clubs } = this.props
        const { listCoord } = this.state
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }

        return (
            <div>
            <Map
                google={this.props.google}
                initialCenter={{
                    lat: 41.887832,
                    lng: -87.623177
                }}
                zoom={12}
                onClick={this.onMapClicked}
                role={'Application'}
                >
                {clubs.map((club) => (
                    <Marker
                        key={club.name}
                        name={club.name}
                        position={{lat: club.lat, lng: club.lng}}
                        onClick={this.onMarkerClick}
                        id={club.id} />
                ))}
                <InfoWindow
                    onOpen={this.windowHasOpened}
                    onClose={this.windowHasClosed}
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                        <img src={this.state.photoUrl} alt={this.state.selectedPlace.name}/>
                        <h5>Rating: {this.state.rating}</h5>
                        <img src={Powered} alt={'Powered by Foursqaure'}/>
                    </div>
                </InfoWindow>
                <InfoWindow
                    onOpen={this.windowHasOpened}
                    onClose={this.windowHasClosed}
                    visible={this.state.showingListInfoWindow}
                    position={listCoord}>
                <div>
                    <h4>{this.state.venue}</h4>
                    <img src={this.state.photoUrl} alt={this.state.venue}/>
                    <h5>Rating: {this.state.rating}</h5>
                    <img src={Powered} alt={'Powered by Foursqaure'}/>
                </div>
                </InfoWindow>
                <Sidebar onListClick={this.onListClick} clubs={clubs} />
            </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey : MAP_KEY
})(Container)