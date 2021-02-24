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
      toggleOff: false,
      toggleOn: false,
      show: false,
      post: false
    })
  }

  handleClick() {
    this.setState({
      search: true,
      toggleOff: false,
      toggleOn: false,
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
      search: false,
      show: false,
      post: false,
      allRecipes: false,
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

    if(user && this.state.allRecipes === true){
      return(
        <div>
          <AllRecipes />
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
            <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle"></i>
            </span>

          </div>
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
            <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle"></i>
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
            <img src={recipe.imageUrl} alt={recipe.recipeTitle} />
            <h5 className='pointer' onClick={this.displayRecipe}>{recipe.recipeTitle}</h5>
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
              <span onClick={this.handleMenuClick}>
                <i className="fas fa-user-circle navbar-fas"></i>
                <ul className="dropdown-content">
                <p onClick={this.handleMetricClick}>Metric Converter</p>
                <p onClick={this.handleAllRecipes}>All Recipes</p>
                </ul>
              </span>

          </div>
        </div>
      );
    }

    if (user && this.state.toggleOn === true) {
      return (
        <div>
          <Converter />
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
                <i className="fas fa-home"></i>
              </span>
              <span onClick={this.handleClick}>
                <i className="fas fa-search"></i>
              </span>
              <span onClick={this.handlePostClick}>
                <i className="fas fa-plus"></i>
              </span>
              <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle"></i>
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
              <i className="fas fa-home"></i>
            </span>
            <span onClick={this.handleClick}>
              <i className="fas fa-search"></i>
            </span>
            <span onClick={this.handlePostClick}>
              <i className="fas fa-plus"></i>
            </span>
            <span onClick={this.handleMenuClick}>
              <i className="fas fa-user-circle"></i>
            </span>
          </div>
        </div>
      );
    }
  }
}

Home.contextType = AppContext;
