import React from 'react';

export default class AllRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      display: false,
      title: '',
      url: '',
      ingredients: [],
      instructions: [],
      recipeId: ''
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/recipes`)
      .then(response => response.json())
      .then(recipes => this.setState({
        recipes
      }))
      .catch(error => console.error('Fetch failed!', error));
  }

  handleClick(event) {
    this.setState({ display: true })
    const value = event.target.textContent;
    const found = this.state.recipes.filter(recipe => recipe.recipeTitle === value)
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

  render() {
    if (this.state.display === false) {
      return (
        <div>
          {this.state.recipes.map(recipe => {
            return (
              <span key={recipe.recipeId} className='all-recipes'>
                <div className='card'>
                  <img className='card-img-top' src={recipe.imageUrl} alt={`an image of ${recipe.recipeTitle}`} />
                  <div className='card-body'>
                    <h5 className='card-title' onClick={this.handleClick}>{recipe.recipeTitle}</h5>
                  </div>
                </div>
              </span>
            )
          })}
        </div>
      )
    }

    if (this.state.display === true) {
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
