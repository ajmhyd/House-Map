import React, { Component } from 'react';
import './App.css';
import Container from './components/Container';
import Clubs from './data/Clubs.json'
import ClubList from './components/ClubList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs : [],
      search: ''
    }
  }

  componentDidMount() {
    this.setState({
      clubs: Clubs
    })
  }

  updateSearch(e) {
    this.setState({ search: e.target.value})
  }

  render() {
    const { clubs, search } = this.state
    let filteredClubs = clubs.filter(
      (club) => {
          return club.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      }
    );

    return (
      <div className="App">
       <input type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => this.updateSearch(e)}
      />
        <ClubList clubs={filteredClubs} />
        <Container clubs={filteredClubs} />
      </div>
    );
  }
}

export default App;
