import React, { Component } from 'react'
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react'
import MAP_KEY from '../config/Mapkey'

export class Container extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    }

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
    };

    render () {
        const style = {
            zIndex: 0,
            top: 0
        }
        const { clubs } = this.props
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <Map
                google={this.props.google}
                style={style}
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
        )
    }
}

export default GoogleApiWrapper({
    apiKey : MAP_KEY
})(Container)