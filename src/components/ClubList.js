import React, { Component } from 'react'
import SideNav, { Nav, NavText, NavIcon } from 'react-sidenav'
import {music} from 'react-icons-kit/fa/music'
import SVGIcon from 'react-icons-kit'

class ClubList extends Component {

  render() {
    const { clubs } = this.props
    return (
      <div style={{background: '#2c3e50', color: '#000', width: 180, height: '100vh', paddingTop: '30px'}}>
        <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4'>
        {clubs.map((club) => (
          <Nav id={club.name} key={club.name}>
            <NavIcon><SVGIcon size={20} icon={music}/></NavIcon>
            <NavText>{club.name}</NavText>
          </Nav>
        ))}
        </SideNav>
    </div>
    )
  }
}

export default ClubList