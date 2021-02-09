import React from 'react';
import Header from '../components/header';
import Search from '../components/search';

export default class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      value: 'Crepes',
      show: false,
      recipes: [],
      title: '',
      url: '',
      recipeId: '',
      ingredients: [],
      instructions: [],
      search: false,
    }


    this.displayRecipe = this.displayRecipe.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
  }

  componentDidMount(){
    fetch(`/api/recipes`)
      .then(response => response.json())
      .then(recipes => this.setState({
        recipes
      }))
      .catch(error => console.error('Fetch failed!', error));
  }

  displayRecipe() {
    this.state.show = true;
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
      console.log('print')
  }

  handleClick(){
    this.setState({ search: true})
  }

  handleHeaderClick() {
    this.setState({ search: false })
  }

  render() {
    if (this.state.search === false && this.state.show === false){
      return (
        <div>
          <Header />
          <div className='home'>
            <h2>Recipe of the day</h2>
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffullofplants.com%2Fwp-content%2Fuploads%2F2016%2F07%2Feasy-vegan-french-crepes-thumb-2.jpg&f=1&nofb=1" alt="crepes" />
            <h5 className='pointer' onClick={this.displayRecipe}>{this.state.value}</h5>
          </div>
          <div className="navbar-container">
            <i className="fas fa-home navbar-fas"></i>
            <span onClick={this.handleClick}>
              <i className="fas fa-search navbar-fas"></i>
            </span>
            <i className="fas fa-plus navbar-fas"></i>
            <i className="fas fa-user-circle navbar-fas"></i>
          </div>
        </div>
      );
    }
    if (this.state.search === true && this.state.show === false) {
      return (
        <div>
          <header className="mb-5">
            <nav className="navbar navbar-dark bg-dark shadow-sm">
              <div className="container">
                <span className="col px-0">
                  <a onClick={this.handleHeaderClick} href="#" className="navbar-brand header">
                    perfect pepper
              </a>
                </span>
                <span className='header-span'>
                  <i className="header fas fa-bars"></i>
                </span>
              </div>
            </nav>
          </header>
          <Search />
        </div>
      );
    }
    if (this.state.search === false && this.state.show === true) {
      const { title, ingredients, instructions, url, recipeId } = this.state;
      return (
        <div>
          <header className="mb-5">
            <nav className="navbar navbar-dark bg-dark shadow-sm">
              <div className="container">
                <span className="col px-0">
                  <a onClick={this.handleHeaderClick} href="#" className="navbar-brand header">
                    perfect pepper
              </a>
                </span>
                <span className='header-span'>
                  <i className="header fas fa-bars"></i>
                </span>
              </div>
            </nav>
          </header>
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

// export default function Home(props) {
//   return (
//     <>
//     </>
//   );
// }
