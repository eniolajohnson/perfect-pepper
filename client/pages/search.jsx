import React from 'react';

export default class search extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      recipes: [],
      instructions: [],
      ingredients: [],
      found: [],
      recipeId: '',
      url: '',
      title: '',
      isSubmitted: false,
      display: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTryAgain = this.handleTryAgain.bind(this);
  }

  componentDidMount(){
    fetch(`/api/recipes`)
      .then(response => response.json())
      .then(recipes => this.setState({
        recipes
      }))
      .catch(error => console.error('Fetch failed!', error));
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    this.setState({ isSubmitted: true})
    event.preventDefault();
    const title = this.state.value
    const found = this.state.recipes.filter(recipe => recipe.recipeTitle.toLowerCase() === title.toLowerCase())
    this.setState({ found })
  }

  handleClick(){
    this.setState({ display:true })
    const id = this.state.found[0].recipeId
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

  handleTryAgain(event){
    event.preventDefault()
    this.setState({
      display: false,
      isSubmitted: false
    })
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
      const found = this.state.found;
      if (found.length > 0){
        return (
          <div className='search'>
            <div key={found[0].recipeId}>
              <div className='search-title' onClick={this.handleClick}>
                <h5 key={found[0].recipeId}>{found[0].recipeTitle}</h5>
              </div>
              <img className='search-img' src={found[0].imageUrl} alt="recipe image" />
            </div>
          </div>
        )}
      if (found.length < 1) {
        return (
          <div className='not-found'>
          <h5>Uh-oh! Recipe not found</h5>
          <a onClick={this.handleTryAgain} href="">Try again</a>
          </div>
        )
      }
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