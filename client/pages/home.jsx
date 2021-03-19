import React from 'react';
import Converter from '../components/converter';
import AllRecipes from '../pages/allRecipes';
import Search from '../pages/search';
import Post from '../pages/post';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect'

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      recipe: [],
      ingredients: [],
      instructions: [],
      isLoading: true,
      move: false,
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
    fetch(`/api/recipes/rotd`)
      .then(response => response.json())
      .then(recipe => this.setState({
        recipe: recipe[0],
        isLoading: false
      }))
      .catch(error => console.error('Fetch failed!', error));
  }

  displayRecipe() {
    this.setState({ show: true })
    const id = this.state.recipe.recipeId
    fetch(`/api/recipes/${id}`)
      .then(response => response.json())
      .then(details => {
        const ing = details.map(detail => detail.ingredient)
        const ingredients = [... new Set(ing)]
        const ins = details.map(detail => detail.instruction)
        const instructions = [... new Set(ins)]
        this.setState({
          ingredients,
          instructions,
        })
      })
      .catch(error => console.error('Fetch failed!', error));
  }

  handleAllRecipes() {
    this.setState({
      allRecipes: true,
      search: false,
      show: false,
      post: false
    })
  }

  handleClick() {
    this.setState({
      toggleOn: false,
      search: true,
      show: false,
      post: false,
      allRecipes: false
    })
  }

  handleMenuClick() {
    this.setState({
      toggleOff: !this.state.toggleOff,
    })
  }

  handleMetricClick() {
    this.setState({
      toggleOff: false,
      toggleOn: true,
    })
  }

  handleHeaderClick() {
    this.setState({
      toggleOn: false,
      allRecipes: false,
      search: false,
      show: false,
      post: false
    })
  }

  handlePostClick() {
    this.setState({
      toggleOn: false,
      allRecipes: false,
      post: true,
      toggleOn: false,
      search: false,
      show: false
    })
  }

  render() {
    const { user, handleSignOut } = this.context;
    if (!user) return <Redirect to="sign-in" />;

    if (user && this.state.allRecipes === true && this.state.toggleOff === false && this.state.toggleOn === false){
      return(
        <div>
          <AllRecipes />
          <div id='nav' className="navbar-container fas-search">
            <span onClick={this.handleHeaderClick}>
              <i className="fas fa-home" data-title='home'></i>
            </span>
            <span onClick={this.handleClick}>
              <i className="fas fa-search" data-title='search'></i>
            </span>
            <span onClick={this.handlePostClick}>
              <i className="fas fa-plus" data-title='new post'></i>
            </span>
            <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle" data-title='menu'></i>
            </span>

          </div>
        </div>
      )
    }

    if (user && this.state.allRecipes === true && this.state.toggleOff === true && this.state.toggleOn === false) {
      return (
        <div>
          <AllRecipes />
          <div id='nav' className="navbar-container fas-search">
            <span onClick={this.handleHeaderClick}>
              <i className="fas fa-home" data-title='home'></i>
            </span>
            <span onClick={this.handleClick}>
              <i className="fas fa-search" data-title='search'></i>
            </span>
            <span onClick={this.handlePostClick}>
              <i className="fas fa-plus" data-title='new post'></i>
            </span>
            <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle" data-title='menu'></i>
              <ul className="dropdown-content">
                <p onClick={this.handleMetricClick}>Metric Converter</p>
                <p onClick={this.handleAllRecipes}>All Recipes</p>
              </ul>
            </span>
          </div>
        </div>
      )
    }

    if (user && this.state.post === true && this.state.toggleOff === false && this.state.toggleOn === false) {
      return (
        <div>
          <Post />
          <div id='nav' className="navbar-container fas-search">
            <span onClick={this.handleHeaderClick}>
              <i className="fas fa-home" data-title='home'></i>
            </span>
            <span onClick={this.handleClick}>
              <i className="fas fa-search" data-title='search'></i>
            </span>
            <span onClick={this.handlePostClick}>
              <i className="fas fa-plus" data-title='new post'></i>
            </span>
            <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle" data-title='menu'></i>
            </span>
          </div>
        </div>
      )
    }

    if (user && this.state.toggleOff === true && this.state.post === true && this.state.toggleOn === false) {
      return (
        <div>
          <Post />
          <div id='nav' className="navbar-container fas-search">
            <span onClick={this.handleHeaderClick}>
              <i className="fas fa-home" data-title='home'></i>
            </span>
            <span onClick={this.handleClick}>
              <i className="fas fa-search" data-title='search'></i>
            </span>
            <span onClick={this.handlePostClick}>
              <i className="fas fa-plus" data-title='new post'></i>
            </span>
            <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle" data-title='menu'></i>
              <ul className="dropdown-content">
                <p onClick={this.handleMetricClick}>Metric Converter</p>
                <p onClick={this.handleAllRecipes}>All Recipes</p>
              </ul>
            </span>
          </div>
        </div>
      )
    }

    if (user && this.state.search === false && this.state.show === false && this.state.toggleOn === false && this.state.toggleOff === false && this.state.isLoading === true) {
      return (
        <div className='center'>
          <img src="https://media.giphy.com/media/q15kbCtGFqwx8wYx1n/giphy.gif" alt="loading gif"/>
        </div>
      );
    }

    if (user && this.state.search === false && this.state.show === false && this.state.toggleOn === false && this.state.toggleOff === false && this.state.isLoading === false) {
      const recipe = this.state.recipe;
      return (
        <div>
          <div className='home'>
            <h2>Recipe of the day</h2>
            <img src={recipe.imageUrl} alt={recipe.recipeTitle} onClick={this.displayRecipe}/>
            <h5 className='pointer salmon' onClick={this.displayRecipe}>{recipe.recipeTitle}</h5>
          </div>
          <div className="navbar-container">
            <span onClick={this.handleHeaderClick}>
              <i className="fas fa-home navbar-fas" data-title='home'>
              </i>
            </span>
            <span onClick={this.handleClick}>
              <i className="fas fa-search navbar-fas" data-title='search'></i>
            </span>
            <span onClick={this.handlePostClick}>
              <i className="fas fa-plus navbar-fas" data-title='new post'></i>
            </span>
            <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle navbar-fas" data-title='menu'></i>
            </span>
          </div>
        </div>
      );
    }

    if (user && this.state.search === false && this.state.show === false && this.state.toggleOn === false && this.state.isLoading === false && this.state.toggleOff === true) {
      const recipe = this.state.recipe;
      return (
        <div>
          <div className='home'>
            <h2>Recipe of the day</h2>
            <img src={recipe.imageUrl} alt={recipe.recipeTitle} onClick={this.displayRecipe}/>
            <h5 className='pointer' onClick={this.displayRecipe}>{recipe.recipeTitle}</h5>
          </div>
          <div className="navbar-container">
            <span onClick={this.handleHeaderClick}>
              <i className="fas fa-home navbar-fas" data-title='home'></i>
            </span>
            <span onClick={this.handleClick}>
              <i className="fas fa-search navbar-fas" data-title='search'></i>
            </span>
            <span onClick={this.handlePostClick}>
              <i className="fas fa-plus navbar-fas" data-title='new post'></i>
            </span>
            <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle navbar-fas" data-title='menu'></i>
              <ul className="dropdown-content">
                <p onClick={this.handleMetricClick}>Metric Converter</p>
                <p onClick={this.handleAllRecipes}>All Recipes</p>
              </ul>
            </span>
          </div>
        </div>
      );
    }

    if (user && this.state.post === false && this.state.toggleOn === true) {
      return (
        <div>
          <Converter />
          <div className="navbar-container">
            <span onClick={this.handleHeaderClick}>
              <i className="fas fa-home navbar-fas" data-title='home'></i>
            </span>
            <span onClick={this.handleClick}>
              <i className="fas fa-search navbar-fas" data-title='search'></i>
            </span>
            <span onClick={this.handlePostClick}>
              <i className="fas fa-plus navbar-fas" data-title='new post'></i>
            </span>
            <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle navbar-fas" data-title='menu'></i>
            </span>
          </div>
        </div>
      );
    }

    if (user && this.state.search === true && this.state.show === false) {
      return (
        <div>
          <Search />
            <div id='nav' className="navbar-container fas-search">
              <span onClick={this.handleHeaderClick}>
              <i className="fas fa-home" data-title='home'></i>
              </span>
              <span onClick={this.handleClick}>
              <i className="fas fa-search" data-title='search'></i>
              </span>
              <span onClick={this.handlePostClick}>
              <i className="fas fa-plus" data-title='new post'></i>
              </span>
              <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle" data-title='menu'></i>
              </span>
            </div>
        </div>
      );
    }
    if (user && this.state.search === false && this.state.show === true) {
      const { ingredients, instructions } = this.state;
      const recipe = this.state.recipe;
      return (
        <div>
          <div className='recipe' key={recipe.recipeId}>
            <img className='recipe-img' src={recipe.imageUrl} alt='recipe image' />
            <span className='recipe-title'>{recipe.recipeTitle}</span>
            <hr />
            <h5 className='recipe-header'>INGREDIENTS</h5>
            {ingredients.map((ingredient, index) => <p className='recipe-text' key={index}>{ingredient}</p>)
            }
            <br />
            <h5 className='recipe-header'>DIRECTIONS</h5>
            {instructions.map((step, index) => <p className='recipe-text' key={index}> {step} </p>)}
          </div>
          <div id='nav' className="navbar-container fas-search">
            <span onClick={this.handleHeaderClick}>
              <i className="fas fa-home" data-title='home'></i>
            </span>
            <span onClick={this.handleClick}>
              <i className="fas fa-search" data-title='search'></i>
            </span>
            <span onClick={this.handlePostClick}>
              <i className="fas fa-plus" data-title='new post'></i>
            </span>
            <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle" data-title='menu'></i>
            </span>
          </div>
        </div>
      );
    }
  }
}

Home.contextType = AppContext;
