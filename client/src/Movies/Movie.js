import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
    console.log(props);
  }


  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }
  
  routeToItem = event => {
    event.preventDefault();
    this.props.history.push(`/update-item/${this.props.match.params.id}`);
  }

  deleteMovie = (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
      .then(response => {
        console.log(response);
        this.props.history.replace("/")
      })
      .catch(response => console.log(response))
  }
  
  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
  
    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button type="submit" onClick={this.routeToItem}>Update</button>
        <button type="submit" onClick={this.deleteMovie}>Delete</button>
      </div>
    );
  }
}
