import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './components/Container';
import { Navbar } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar>
          </Navbar>
        <Container />
      </div>
    );
  }
}

export default App;
