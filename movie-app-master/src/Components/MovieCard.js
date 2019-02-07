import React from 'react';
import PropTypes from 'prop-types';
import '../app.css';
import LikeButton from './LikeButton';


class MovieCard extends React.Component {
  constructor(props){
    super(props);
    this.viewMovie = this.viewMovie.bind(this);
  }

  viewMovie(){
    // console.log("Trying to view movie")
    // console.log(this.props.name)
    const url = `https://www.themoviedb.org/movie/${this.props.id}-${this.props.name}`
    window.location.href = url
  }
  render() {
    return (
      <div className="column is-4">
        <div className="card" >
          <div className="card-image">
            <figure className="image is-4by3">
              <img alt='Profile' src={this.props.image}></img>
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.props.name}</p>
                {this.props.genre_ids ? <p className="subtitle">{this.props.genre_ids}</p> : null}
                <div>
                  <input type="button" onClick={this.viewMovie.bind(this)} value="View"/>
                  <LikeButton />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Specifies the default values for props:
MovieCard.defaultProps = {
  name: "sss",
  image: 'http://via.placeholder.com/400x400',

};

// Checks that the correct type of props are supplied:
MovieCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  genre: PropTypes.string
};

export default MovieCard;
