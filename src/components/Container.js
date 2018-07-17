import React, { Component } from 'react'
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react'
import MAP_KEY from '../config/Mapkey'


export class Container extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

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
            width: '100vw',
            height: '100vh'
        }
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
                <Marker
                    name={'Primary'}
                    position={{lat: 41.903670, lng: -87.628941}}
                    onClick={this.onMarkerClick} />
                <Marker
                    name={'The Mid'}
                    position={{lat: 41.887083, lng: -87.647720}}
                    onClick={this.onMarkerClick} />
                <Marker
                    name={'Spybar'}
                    position={{lat: 41.893647, lng: -87.635909}}
                    onClick={this.onMarkerClick} />
                <Marker
                    name={'Sound Bar'}
                    position={{lat: 41.893414, lng: -87.635315}}
                    onClick={this.onMarkerClick} />
                <Marker
                    name={'Prysm'}
                    position={{lat: 41.909330, lng: -87.652520}}
                    onClick={this.onMarkerClick} />
                <Marker
                    name={'Studio Paris'}
                    position={{lat: 41.889786, lng: -87.630296}}
                    onClick={this.onMarkerClick} />
                <Marker
                    name={'Berlin'}
                    position={{lat: 41.940024, lng: -87.653873}}
                    onClick={this.onMarkerClick} />
                <Marker
                    name={'Smartbar'}
                    position={{lat: 41.949772, lng: -87.658822}}
                    onClick={this.onMarkerClick} />
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