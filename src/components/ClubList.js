import React, { Component } from 'react'
import SideNav, { Nav, NavText, NavIcon } from 'react-sidenav'
import {music} from 'react-icons-kit/fa/music'
import SVGIcon from 'react-icons-kit'
import { InfoWindow, Marker, Map } from 'google-maps-react'
class ClubList extends Component {
state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    markLat: 0,
    markLng: 0
}
 onListClick(club){
  console.log(club)
  }


  render() {
    const { clubs } = this.props
    const { markLat, markLng, markKey, markName } = this.state
    return (
      <div style={{background: '#2c3e50', color: '#000', width: 180,  paddingTop: '25px'}}>
      {clubs.map((club) => (
          <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' >
          <button onClick={(e) => this.onListClick(club)} >
            <Nav id={club.name} key={club.name} >
              <NavIcon><SVGIcon size={20} icon={music}/></NavIcon>
              <NavText>{club.name}</NavText>
            </Nav>
            </button>
          </SideNav>
        ))}
      </div>
    )
  }
}

export default ClubList