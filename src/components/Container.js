import React, { Component } from 'react'
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react'


export class Container extends Component {
    render () {
        const style = {
            width: '100vw',
            height: '100vh'
        }
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <div style={style}>
            <Map google={this.props.google} >
            </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey : 'AIzaSyDpYRfldUDBo9uduk6kDJcmj1uy5JnAODo'
})(Container)