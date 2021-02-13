import React from 'react';
import Converter from '../components/converter';
import AllRecipes from '../pages/all-recipes';
import Search from '../pages/search';
import Post from '../pages/post';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect'

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'Crepes',
      recipes: [],
      title: '',
      url: '',
      recipeId: '',
      ingredients: [],
      instructions: [],
      allRecipes: false,
      post: false,
      search: false,
      show: false,
      toggleOn: false,
      toggleOff: false
    }

    this.displayRecipe = this.displayRecipe.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMetricClick = this.handleMetricClick.bind(this);
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.handlePostClick = this.handlePostClick.bind(this);
    this.handleAllRecipes = this.handleAllRecipes.bind(this);
  }

  componentDidMount() {
    fetch(`/api/recipes`)
      .then(response => response.json())
      .then(recipes => this.setState({
        recipes
      }))
      .catch(error => console.error('Fetch failed!', error));
  }

  displayRecipe() {
    this.setState({ show: true })
    const title = this.state.value
    const found = this.state.recipes.filter(recipe => recipe.recipeTitle.toLowerCase() === title.toLowerCase())
    const id = found[0].recipeId
    fetch(`/api/recipes/${id}`)
      .then(response => response.json())
      .then(details => {
        const title = details[0].recipeTitle
        const recipeId = details[0].recipeId
        const url = details[0].imageUrl
        const ing = details.map(detail => detail.ingredient)
        const ingredients = [... new Set(ing)]
        const ins = details.map(detail => detail.instruction)
        const instructions = [... new Set(ins)]
        this.setState({
          title,
          url,
          ingredients,
          instructions,
          recipeId
        })
      })
      .catch(error => console.error('Fetch failed!', error));
  }

  handleAllRecipes() {
    this.setState({
      allRecipes: true,
      search: false,
      toggleOff: false,
      toggleOn: false,
      show: false,
      post: false
    })
  }

  handleClick() {
    this.setState({
      allRecipes: false,
      search: true,
      toggleOff: false,
      toggleOn: false,
      show: false,
      post: false
    })
  }

  handleMenuClick() {
    this.setState({
      allRecipes: false,
      toggleOn: false,
      toggleOff: !this.state.toggleOff,
      search: false,
      show: false,
      post: false
    })
  }

  handleMetricClick() {
    this.setState({
      allRecipes: false,
      toggleOff: false,
      toggleOn: true,
      search: false,
      show: false,
      post: false
    })
  }

  handleHeaderClick() {
    this.setState({
      allRecipes: false,
      search: false,
      toggleOff: false,
      toggleOn: false,
      show: false,
      post: false
    })
  }

  handlePostClick() {
    this.setState({
      allRecipes: false,
      post: true,
      search: false,
      toggleOff: false,
      toggleOn: false,
      show: false,
    })
  }

  render() {
    const { user, handleSignOut } = this.context;
    if (!user) return <Redirect to="sign-in" />;

    if (user && this.state.allRecipes === true) {
      return (
        <div>
          <AllRecipes />
        </div>
      )
    }

    if (user && this.state.post === true) {
      return (
        <div>
          <Post />
          <div id='nav' className="navbar-container fas-search">
            <span onClick={this.handleHeaderClick}>
              <i className="fas fa-home"></i>
            </span>
            <span onClick={this.handleClick}>
              <i className="fas fa-search"></i>
            </span>
            <span onClick={this.handlePostClick}>
              <i className="fas fa-plus"></i>
            </span>
            <span>
              <span className='header-span' onClick={this.handleMenuClick}>
                <i className="header-fa header fa-user-circle"></i>
              </span>
              <span className="dropdown">
                <ul className="dropdown-content">
                  <li onClick={this.handleMetricClick}><a href="#metric">Metric Converter</a></li>
                  <li onClick={this.handleAllRecipes}><a href="#all-recipes">All Recipes</a></li>
                </ul>
              </span>
            </span>
          </div>
        </div>
      )
    }

    if (user && this.state.search === false && this.state.show === false && this.state.toggleOn === false && this.state.toggleOff === false) {
      return (
        <div>
          <div className='home'>
            <h2>Recipe of the day</h2>
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffullofplants.com%2Fwp-content%2Fuploads%2F2016%2F07%2Feasy-vegan-french-crepes-thumb-2.jpg&f=1&nofb=1" alt="crepes" />
            <h5 className='pointer' onClick={this.displayRecipe}>{this.state.value}</h5>
          </div>
          <div className="navbar-container">
            <span onClick={this.handleHeaderClick}>
              <i className="fas fa-home navbar-fas"></i>
            </span>
            <span onClick={this.handleClick}>
              <i className="fas fa-search navbar-fas"></i>
            </span>
            <span onClick={this.handlePostClick}>
              <i className="fas fa-plus navbar-fas"></i>
            </span>

              <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle navbar-fas"></i>
              </span>
              {/* <span className="dropdown">
                <ul className="dropdown-content">
                  <li onClick={this.handleMetricClick}><a href="#metric">Metric Converter</a></li>
                  <li onClick={this.handleAllRecipes}><a href="#all-recipes">All Recipes</a></li>
                </ul>
              </span> */}

          </div>
        </div>
      );
    }

    if (user && this.state.search === false && this.state.show === false && this.state.toggleOn === false && this.state.toggleOff === true) {
      return (
        <div>
          <div className='home'>
            <h2>Recipe of the day</h2>
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffullofplants.com%2Fwp-content%2Fuploads%2F2016%2F07%2Feasy-vegan-french-crepes-thumb-2.jpg&f=1&nofb=1" alt="crepes" />
            <h5 className='pointer' onClick={this.displayRecipe}>{this.state.value}</h5>
          </div>
          <div className="navbar-container">
            <span onClick={this.handleHeaderClick}>
              <i className="fas fa-home navbar-fas"></i>
            </span>
            <span onClick={this.handleClick}>
              <i className="fas fa-search navbar-fas"></i>
            </span>
            <span onClick={this.handlePostClick}>
              <i className="fas fa-plus navbar-fas"></i>
            </span>
            <span>
              <span className='header-span' onClick={this.handleMenuClick}>
                <i className="header-fa header fa-user-circle"></i>
              </span>
              {/* <span className="dropdown">
                <ul className="dropdown-content">
                  <li onClick={this.handleMetricClick}><a href="#metric">Metric Converter</a></li>
                  <li onClick={this.handleAllRecipes}><a href="#all-recipes">All Recipes</a></li>
                </ul>
              </span> */}
            </span>
          </div>
        </div>
      );
    }

    if (user && this.state.toggleOn === true && this.state.show === false && this.state.search === false && this.state.toggleOff === false) {
      return (
        <div>
          <Converter />
        </div>
      );
    }

    if (user && this.state.search === true && this.state.show === false) {
      return (
        <div>
          <Search />
            <div id='nav' className="navbar-container fas-search">
              <span onClick={this.handleHeaderClick}>
                <i className="fas fa-home"></i>
              </span>
              <span onClick={this.handleClick}>
                <i className="fas fa-search"></i>
              </span>
              <span onClick={this.handlePostClick}>
                <i className="fas fa-plus"></i>
              </span>
            <span>
              <span className='header-span' onClick={this.handleMenuClick}>
                <i className="header-fa header fa-user-circle"></i>
              </span>
              {/* <span className="dropdown">
                <ul className="dropdown-content">
                  <li onClick={this.handleMetricClick}><a href="#metric">Metric Converter</a></li>
                  <li onClick={this.handleAllRecipes}><a href="#all-recipes">All Recipes</a></li>
                </ul>
              </span> */}
            </span>
            </div>
        </div>
      );
    }
    if (user && this.state.search === false && this.state.show === true) {
      const { title, ingredients, instructions, url, recipeId } = this.state;
      return (
        <div>
          <div className='recipe' key={recipeId}>
            <img className='recipe-img' src={url} alt='recipe image' />
            <span className='recipe-title'>{title}</span>
            <hr />
            <h5 className='recipe-header'>INGREDIENTS</h5>
            {ingredients.map(ingredient => <p className='recipe-text'>{ingredient}</p>)
            }
            <br />
            <h5 className='recipe-header'>DIRECTIONS</h5>
            {instructions.map(step => <p className='recipe-text'> {step} </p>)}
          </div>
        </div>
      );
    }
  }
}

Home.contextType = AppContext;
