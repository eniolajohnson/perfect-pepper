import React from 'react';

export default class search extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      recipes: [],
      instructions: [],
      ingredients: [],
      recipeId: '',
      url: '',
      title: '',
      isSubmitted: false,
      display: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    this.setState({ isSubmitted: true})
    event.preventDefault();
    fetch(`/api/recipes`)
      .then(response => response.json())
      .then(recipes => this.setState({
        recipes
      }))
      .catch(error => console.error('Fetch failed!', error));
  }

  handleClick(){
    this.setState({ display:true })
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

  render(){
    if (this.state.isSubmitted === false){
      return (
        <form onSubmit={this.handleSubmit}>
          <input className="search" onChange={this.handleChange} type="text" placeholder='what will you like to cook?' value={this.state.value} />
        </form>
      );
    }

    if (this.state.isSubmitted === true && this.state.display === false) {
      return (
        <div className='search-box'>
          { this.state.recipes.map(
            recipe => {
              if (recipe.recipeTitle.toLowerCase() === this.state.value.toLowerCase()) {
                return (
                  <div key={recipe.recipeId}>
                    <div className='search-title' onClick={this.handleClick}>
                      <a key={recipe.recipeId}>{recipe.recipeTitle}</a>
                    </div>
                    <img className='search-img' src={recipe.imageUrl} alt="recipe image"/>
                  </div>
              )
              }
            }
          )}
        </div>
      );
    }

    if (this.state.isSubmitted === true && this.state.display === true) {
      const { title, ingredients, instructions, url, recipeId} = this.state;
      return (
        <div className='recipe' key={recipeId}>
          <img className='recipe-img' src={url} alt='recipe image'/>
          <span className='recipe-title'>{title}</span>
          <hr />
          <h5 className='recipe-header'>INGREDIENTS</h5>
          {ingredients.map(ingredient => <p className='recipe-text'>{ingredient}</p>)
          }
          <br/>
          <h5 className='recipe-header'>DIRECTIONS</h5>
          {instructions.map(step => <p className='recipe-text'> {step} </p>)}
        </div>
      );
    }
  }
}
