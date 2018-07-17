import React, { Component } from 'react';
import './App.css';
import Container from './components/Container';
import { Navbar } from 'react-bootstrap'
import Clubs from './data/Clubs.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs : []
    }
  }
  componentDidMount() {
    this.setState({
      clubs: Clubs
    })

  }
  render() {
    console.log(this.state.clubs)
    const { clubs } = this.state
    return (
      <div className="App">
        <Navbar>
          </Navbar>
        <Container clubs={clubs} />
      </div>
    );
  }
}

export default App;
