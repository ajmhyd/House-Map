import React, { Component } from 'react'
import { InfoWindow } from 'google-maps-react'

class ListWindow extends Component {


  render() {
    return (
    <InfoWindow
                    onOpen={this.windowHasOpened}
                    onClose={this.windowHasClosed}
                    position={{lat: 41.887832, lng: -87.623177}}
                    visible={true}
                    >
                    <div>
                        <h1>Hello</h1>
                    </div>
                </InfoWindow>
                )
  }
}

export default ListWindow