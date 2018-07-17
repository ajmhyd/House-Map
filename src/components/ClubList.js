import React, { Component } from 'react'
import SideNav, { Nav, NavText } from 'react-sidenav'

class ClubList extends Component {

  render() {
    const { clubs } = this.props
    return (
      <div style={{background: '#2c3e50', color: '#FFF', width: 220}}>
        <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4'>
        {clubs.map((club) => (
          <Nav id={club.name}>
            <NavText> {club.name} </NavText>
              </Nav>
        ))}
        </SideNav>
    </div>
    )
  }
}

export default ClubList