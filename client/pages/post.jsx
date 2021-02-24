import React from 'react';

export default class Post extends React.Component{
  constructor(){
    super();
    this.state = {
      text: '',
      imageUrl: '',
      id: '',
      recipes: [],
      newRecipe: [],
      getRecipe: false,
      title: false,
      ingredientsArr: [],
      instructionsArr: [],
      ingredients: false,
      steps: false
    }

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitIns= this.handleSubmitIns.bind(this);
    this.handleSubmitIng = this.handleSubmitIng.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  componentDidMount() {
    fetch(`/api/recipes`)
      .then(response => response.json())
      .then(recipes => this.setState({
        recipes
      }))
      .catch(error => console.error('Fetch failed!', error));
  }

  handleChangeText(event) {
    this.setState({ text: event.target.value })
  }

  handleChangeImage(event) {
    this.setState({ imageUrl: event.target.value })
  }

  handleSubmit() {
    this.setState({ ingredients: true })
    const id = this.state.recipes.length + 1;
    this.setState({
      id,
      text: ''
     })

    const newRecipe = {
      recipeTitle: this.state.text,
      imageUrl: this.state.imageUrl
    }
    fetch(`/api/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecipe)
    })
      .then(response => response.json())
      .then(newRecipe => this.setState({
        newRecipe
      }))
      .catch(error => console.error('Fetch failed!', error));
  }

  handleSubmitIng() {
    event.preventDefault();
    const ingredientsArr = []
    ingredientsArr.push(this.state.text)
    this.setState({
      ingredientsArr: [...this.state.ingredientsArr, ingredientsArr],
      text: ''
    })

    const newIngredient = {
      ingredient: this.state.text,
      recipeId: this.state.id
    };

    fetch(`/api/ingredients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIngredient)
    })
      .then(response => response.json())
      .then(newIngredient => newIngredient)
      .catch(error => console.error('Fetch failed!', error));
  }

  handleDone() {
    this.setState({
      steps: true,
      ingredients: false,
    })
  }

  handleSubmitIns() {
    event.preventDefault();
    const instructionsArr = []
    instructionsArr.push(this.state.text)
    this.setState({
      instructionsArr: [...this.state.instructionsArr, instructionsArr],
      text: ''
    })

    const newInstruction = {
      step: this.state.text,
      recipeId: this.state.id
    };

    fetch(`/api/steps`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newInstruction)
    })
      .then(response => response.json())
      .then(newInstruction => newInstruction)
      .catch(error => console.error('Fetch failed!', error));
  }

  render(){
    const { title, ingredients, steps } = this.state;
    if (title === false && ingredients === false && steps === false){
      return(
        <form className='post-container' onSubmit={this.handleSubmit}>
          <div>
            <div>
              <label htmlFor="name">Name of this recipe?</label>
            </div>
            <input type="text" name='name' value={this.state.text} onChange={this.handleChangeText} />
          </div>
          <div>
            <div>
              <label htmlFor="image">And link to its image</label>
            </div>
            <input onChange={this.handleChangeImage} type="text" name='image' value={this.state.imageUrl}  />
          </div>
          <div className='post-container align'>
            <button>Submit</button>
          </div>
        </form>
      )
    }

    if (title === false && ingredients === true && steps === false) {
      const { ingredientsArr } = this.state;
      return (
        <div className='post'>
          <form onSubmit={this.handleSubmitIng}>
            <div>
              <p>Add the measurements and ingredients for the recipe.</p>
              <p>When you are done, click the 'done' button</p>
              <input type="text" value={this.state.text} onChange={this.handleChangeText} />
              <button onClick={this.handleSubmitIng}> Add </button>
              {ingredientsArr.map((ingredient, index) => <p className='recipe-text' key={index}>{ingredient}</p>)
              }
            </div>
          </form>
          <button onClick={this.handleDone}>Done</button>
        </div>
      )
    }

    if (title === false && ingredients === false && steps === true) {
      const { instructionsArr } = this.state;
      return (
        <div className='post'>
          <form onSubmit={this.handleSubmitIns}>
            <div>
              <p>Add the instructions for making the recipe.</p>
              <p>You can find your recipe using search!</p>
              <input type="text" value={this.state.text} onChange={this.handleChangeText} />
              <button onClick={this.handleSubmitIns}>Add</button>
              {instructionsArr.map((instruction, index) => <p className='recipe-text' key={index}>{instruction}</p>)
              }
            </div>
          </form>
        </div>
      )
    }
  }
}
