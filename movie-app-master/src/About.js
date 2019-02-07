import React from 'react';
import MovieCard from './Components/MovieCard';
import DropDown from './Components/DropDown';
import ToggleButton from './Components/ToggleButton';
import LabelledInput from './Components/LabelledInput';



class About extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      genreSelected: 'all',
      releaseSelected: 'all',
      releaseValues: [],
      sort: 'Newest-Oldest',
      searchText: '',
      contrastMode: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    //Get a number of users from the API and store their information in state
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=2a87a5e8d10dae30c27e0dd8fadeebba')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {


      const movies = data.results.map(movie => {
        return {key: movie.id,
          id:movie.id,
          title: movie.title,
          image: movie.poster_path,
          release: movie.release_date,
          genre: movie.genre_ids.name};
      });
      this.setState({movies: movies});
      console.log(movies);
      // console.log(this.state);

      // sort and remove duplicate nationalities
      // store the result in state to be used for the dropdown menu options
      const release_date = movies.map(movie => {
        return movie.release;
      });
      const deduped = [...new Set(release_date)];
      deduped.sort();
      this.setState({releaseValues: deduped});
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChange(event) {
    // handle both of the <select> UI elements
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClick(event) {
    // handle the toggle <button>
    const movie = event.target.name;
    this.setState(prevState => ({
       [movie]: !prevState[movie]
    }));
  }

  render() {
    console.log(this.state);
    // if results are to be sorted, create a copy of the user data and sort it,
    // otherwise just use the original data from the state
    const data = this.state.sort === 'no' ? this.state.movies : [].concat(this.state.movies)
    .sort((a, b) => {
      if(a.movies < b.movie) return -1;
      if(a.movie > b.movie) return 1;
      return 0;
    });

    console.log(this.state);
    // Generate unique user cards for each user
    // Each card needs a unique key, for our purposes we're using
    // name + image URL (not guaranteed to be unique, but sufficient for this)
    // Check the state of the inputs and skip cards not matching the
    // required nationality & gender & search text
    let movieList = data.map(movie => {
      const releaseMatch = (this.state.releaseSelected === movie.release || this.state.releaseSelected === 'all');
      const titleMatch = movie.title.toLocaleLowerCase().startsWith(this.state.searchText);
      return (releaseMatch && titleMatch) ? (
          <MovieCard key={movie.key} id={movie.key} name={movie.title} image={`https://image.tmdb.org/t/p/w500${movie.image}`} release_date={movie.release} />
      ) : null;
    });

    return (
      <section className="section">
        <div className={this.state.contrastMode ? "notification is-success" : "notification"}>
          <div className="header">

          <DropDown options={['all'].concat(this.state.releaseValues)} name="releaseSelected" handleChange={this.handleChange} label="Filter by release date" selected={this.state.releaseSelected} class ="label"/>


          <LabelledInput name="searchText" label="Search by title" value={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. alberto"} />

          <ToggleButton name="contrastMode" handleClick={this.handleClick} toggle={this.state.contrastMode} labelOn="Switch to low contrast" labelOff="Switch to high contrast" />
        </div>
    			<div className="columns is-multiline">
            {movieList}
    			</div>
        </div>

      </section>
    );
  }
}

export default About;
