import React, { Component } from 'react'
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react'
import MAP_KEY from '../config/Mapkey'
import SideNav, { Nav, NavText, NavIcon } from 'react-sidenav'
import {music} from 'react-icons-kit/fa/music'
import SVGIcon from 'react-icons-kit'

export class Container extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        showingListInfoWindow: false,
        listCoord: {lat: 0, lng: 0}
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null,
            showingListInfoWindow: false
          })
        }
    };

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      showingListInfoWindow: false
    });

    onListClick(club) {
        this.setState({
            showingListInfoWindow: true,
            showingInfoWindow: false,
            listCoord: {lat: club.lat, lng: club.lng}
        });
    }

    render () {
        const { clubs } = this.props
        const { listCoord} = this.state
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        console.log(listCoord)
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
                <InfoWindow
                    onOpen={this.windowHasOpened}
                    onClose={this.windowHasClosed}
                    visible={this.state.showingListInfoWindow}
                    position={listCoord}>
                <div>
                    <h1>Hello</h1>
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