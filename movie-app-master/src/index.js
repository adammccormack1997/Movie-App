import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";
import App from './App'
import About from './About'

class RouteMovies extends React.Component{
  render(){
    return(
      <BrowserRouter>
         <div>
           <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
             <div id="navbarBasicExample" className="navbar-brand">
               <Link className="navbar-item" to="/">View Popular Movies</Link>
               <Link className="navbar-item" to="/about">View Most Rated Movies</Link>
             </div>
           </nav>

           <Route exact path="/" component={App} />
           <Route path="/about" component={About} />
         </div>
       </BrowserRouter>
    );
  }

}

ReactDOM.render(
  <RouteMovies />,
  document.getElementById('root')
);
