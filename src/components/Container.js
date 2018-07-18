import React, { Component } from 'react'
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react'
import MAP_KEY from '../config/Mapkey'
import ClubList from './ClubList'
import SideNav, { Nav, NavText, NavIcon } from 'react-sidenav'
import {music} from 'react-icons-kit/fa/music'
import SVGIcon from 'react-icons-kit'

export class Container extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        showMarkers: true
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
    };

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onListClick(club){
        console.log(club)
        this.setState
        }

    render () {
        const { clubs } = this.props
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
                onClick={this.onMapClicked}>
                {clubs.map((club) => (
                    <Marker
                        key={club.name}
                        name={club.name}
                        position={{lat: club.lat, lng: club.lng}}
                        onClick={this.onMarkerClick} />
                ))}
                <InfoWindow
                    onOpen={this.windowHasOpened}
                    onClose={this.windowHasClosed}
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey : MAP_KEY
})(Container)