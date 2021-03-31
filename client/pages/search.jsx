import React from 'react';
import NotFound from '../pages/not-found';

export default class search extends React.Component {
  constructor() {
    super();
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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTryAgain = this.handleTryAgain.bind(this);
  }

  componentDidMount() {
    fetch('/api/recipes')
      .then(response => response.json())
      .then(recipes => this.setState({
        recipes
      }))
      .catch(error => console.error('Fetch failed!', error));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ isSubmitted: true });
    event.preventDefault();
    const recipeTitle = this.state.value;
    fetch(`/api/fuzzy/${recipeTitle}`)
      .then(response => response.json())
      .then(recipes =>
        this.setState({
          found: recipes
        })
      )
      .catch(error => console.error('Fetch failed!', error));
  }

  handleClick(e) {
    this.setState({ display: true });
    const text = e.target.textContent;
    const find = this.state.found.filter(find => {
      return find.recipeTitle === text ? find.recipeId : null;
    });
    const id = find[0].recipeId;
    fetch(`/api/recipes/${id}`)
      .then(response => response.json())
      .then(details => {
        const title = details[0].recipeTitle;
        const recipeId = details[0].recipeId;
        const url = details[0].imageUrl;
        const ing = details.map(detail => detail.ingredient);
        const ingredients = [...new Set(ing)];
        const ins = details.map(detail => detail.instruction);
        const instructions = [...new Set(ins)];
        this.setState({
          title,
          url,
          ingredients,
          instructions,
          recipeId
        });
      })
      .catch(error => console.error('Fetch failed!', error));
  }

  handleTryAgain(event) {
    event.preventDefault();
    this.setState({
      display: false,
      isSubmitted: false
    });
  }

  render() {
    if (this.state.isSubmitted === false) {
      return (
        <form className="search" onSubmit={this.handleSubmit}>
            <label htmlFor="name">
              Search Recipes
          </label>
            <input id="name" onChange={this.handleChange} type="text" placeholder='what will you like to make?' value={this.state.value} />
            <div className='quote'>
            <img src="https://3.bp.blogspot.com/-y_gsd1xXBhg/Wttse2i0k7I/AAAAAAAAi4c/tY9jpNrgKRcKD4gjSalY-oFUsPFq-xtSQCLcBGAs/s1600/Quotes%2Babout%2BGood%2BFood%2B%25284%2529.jpg" alt="quote"/>
            <img src="https://i.pinimg.com/originals/b8/e1/4a/b8e14a14af9434aa5ccc0376a47a5237.jpg" alt="lotus"/>
            <img src="https://i1.wp.com/artandhome.net/wp-content/uploads/2020/11/Cooking-Recipes-Quote.jpg?w=1080&ssl=1" alt="follow your heart not recipes"/>
            <img src="https://miro.medium.com/max/1080/1*encMABpvRZItdCmFR1sD1g.jpeg" alt="thai food"/>
            <img src="https://3.bp.blogspot.com/-PaEkSkxY4UI/WttqcHMVVMI/AAAAAAAAi2U/CK5mCl4s_Io4JWIyqmE3ahj5ZdfB0QPzgCLcBGAs/s1600/Quotes%2Babout%2BGood%2BFood%2B%25281%2529.jpg" alt="good food"/>
            </div>
        </form>
      );
    }

    if (this.state.isSubmitted === true && this.state.display === false) {
      const found = this.state.found;
      if (found.length > 0) {
        return (
          <div className='search all-recipes'>
            {found.map((recipeFound, index) => {
              return (
                <div className='card' key={index}>
                  <img className='card-img-top' src={recipeFound.imageUrl} alt={`an image of ${recipeFound.recipeTitle}`} onClick={this.handleClick} />
                  <h5 className='card-title' onClick={this.handleClick}>{recipeFound.recipeTitle}</h5>
                </div>
              );
            }
            )}
            <a className='not-found' onClick={this.handleTryAgain} href="">Search for another recipe</a>
            </div>);
      }

      if (found.length < 1) {
        return (
          <div className='not-found'>
          <NotFound />
          <a onClick={this.handleTryAgain} href="">Search for another recipe</a>
          </div>
        );
      }
    }

    if (this.state.isSubmitted === true && this.state.display === true) {
      const { title, ingredients, instructions, url, recipeId } = this.state;
      return (
        <div className='recipe' key={recipeId}>
          <img className='recipe-img' src={url} alt='recipe image'/>
          <span className='recipe-title'>{title}</span>
          <hr />
          <h5 className='recipe-header'>INGREDIENTS</h5>
          {ingredients.map((ingredient, index) => <p key=
          {index} className='recipe-text'>{ingredient}</p>)
          }
          <br/>
          <h5 className='recipe-header'>DIRECTIONS</h5>
          {instructions.map((step, index) => <p key=
            {index} className='recipe-text'> {step} </p>)}
        </div>
      );
    }
  }
}
