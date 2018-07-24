import React, { Component } from 'react'
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react'
import MAP_KEY from '../config/Mapkey'
import SideNav, { Nav, NavText, NavIcon } from 'react-sidenav'
import {music} from 'react-icons-kit/fa/music'
import SVGIcon from 'react-icons-kit'
import CLIENT_ID from '../config/Clientid'
import CLIENT_SECRET from '../config/ClientSecret'

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
            alert('Api request has failed')
        })
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        showingListInfoWindow: false
        });
    }
    //list click
    async onListClick(club) {
        fetch(`https://api.foursquare.com/v2/venues/${club.id}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180723`)
        .then(res => res.json())
        .then(data => this.setState({
            photoUrl: data.response.venue.bestPhoto.prefix + 'cap200' + data.response.venue.bestPhoto.suffix,
            rating: data.response.venue.rating
        })).catch((err) => {
            console.log(err)
            alert('Api request has failed')
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
                        <img src={this.state.photoUrl} alt={'Club'}/>
                        <h5>Rating: {this.state.rating}</h5>
                    </div>
                </InfoWindow>
                <InfoWindow
                    onOpen={this.windowHasOpened}
                    onClose={this.windowHasClosed}
                    visible={this.state.showingListInfoWindow}
                    position={listCoord}>
                <div>
                    <h4>{this.state.venue}</h4>
                    <img src={this.state.photoUrl} alt={'Club'}/>
                    <h5>Rating: {this.state.rating}</h5>
                </div>
                </InfoWindow>
                <div style={{background: '#2c3e50', color: '#000', width: 180,  paddingTop: '25px'}}>
                    {clubs.map((club) => (
                        <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' key={club.name}>
                            <button onClick={(e) => this.onListClick(club)} >
                            <Nav id={club.name} key={club.name} >
                                <NavIcon><SVGIcon size={20} icon={music}/></NavIcon>
                                <NavText>{club.name}</NavText>
                            </Nav>
                            </button>
                        </SideNav>
                    ))}
                </div>
            </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey : MAP_KEY
})(Container)