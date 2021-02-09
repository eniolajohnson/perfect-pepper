import React from 'react';

export default class Converter extends React.Component {
  constructor() {
    super();
    this.state = {
      isSubmit: false,
      valueMl: '',
      valueOz: '',
      valueCup: '',
      valueGr: '',
      valueKg: '',
      name: ''
    }

    this.handleChangeMl = this.handleChangeMl.bind(this);
    this.handleChangeOz = this.handleChangeOz.bind(this);
    this.handleChangeCup = this.handleChangeCup.bind(this);
    this.handleChangeGr = this.handleChangeGr.bind(this);
    this.handleChangeKg = this.handleChangeKg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeMl(event) {
    this.setState({
      valueMl: event.target.value,
      name: event.target.name
    })
  }

  handleChangeOz(event) {
    this.setState({
      valueOz: event.target.value,
      name: event.target.name
    })
  }

  handleChangeCup(event) {
    this.setState({
      valueCup: event.target.value,
      name: event.target.name
    })
  }

  handleChangeGr(event) {
    this.setState({
      valueGr: event.target.value,
      name: event.target.name
    })
  }

  handleChangeKg(event) {
    this.setState({
      valueKg: event.target.value,
      name: event.target.name
    })
  }

  handleSubmit() {
    this.setState({ isSubmit: true })
  }

  handleClick() {
    this.setState({
      isSubmit: false,
      valueGr: '',
      valueKg: '',
      valueCup: '',
      valueOz: '',
      valueMl: '',
      name: '',
    })
  }

  render() {
    if (this.state.isSubmit === false) {
      return (
        <div className='converter'>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="ml">Millilitre To Oz</label>
            </div>
            <input type="text" name='ml' value={this.state.valueMl} onChange={this.handleChangeMl} />
            <button onSubmit={this.handleSubmit}>Calculate</button>
          </form>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="oz">Oz To Cup</label>
            </div>
            <input type="text" name='oz' value={this.state.valueOz} onChange={this.handleChangeOz} />
            <button onSubmit={this.handleSubmit}>Calculate</button>
          </form>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="cup">Cup to Litre</label>
            </div>
            <input type="text" name='cup' value={this.state.valueCup} onChange={this.handleChangeCup} />
            <button onSubmit={this.handleSubmit}>Calculate</button>
          </form>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="grams">Grams to Litre/Kg</label>
            </div>
            <input type="text" name='grams' value={this.state.valueGr} onChange={this.handleChangeGr} />
            <button onSubmit={this.handleSubmit}>Calculate</button>
          </form>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="kg">Kilograms to Pounds</label>
            </div>
            <input type="text" name='kg' value={this.state.valueKg} onChange={this.handleChangeKg} />
            <button onSubmit={this.handleSubmit}>Calculate</button>
          </form>
        </div>
      )
    }

    if (this.state.name === 'ml') {
      return (
        <div className='converter plus'>
          <p>{`There is ${mlToOz(this.state.valueMl)} oz in ${this.state.valueMl} ml `}</p>
          <button onClick={this.handleClick}>clear</button>
        </div>
      )
    }
    if (this.state.name === 'oz') {
      return (
        <div className='converter plus'>
          <p>{`There is ${ozToCup(this.state.valueOz)} cup(s) in ${this.state.valueOz} oz `}</p>
          <button onClick={this.handleClick}>clear</button>
        </div>
      )
    }
    if (this.state.name === 'cup') {
      return (
        <div className='converter plus'>
          <p>{`There is ${cupToLtr(this.state.valueCup)} litre(s) in ${this.state.valueCup} cup(s) `}</p>
          <button onClick={this.handleClick}>clear</button>
        </div>
      )
    }
    if (this.state.name === 'grams') {
      return (
        <div className='converter plus'>
          <p>{`There is ${grToKg(this.state.valueGr)} litre(s)/Kg in ${this.state.valueGr} gram(s) `}</p>
          <button onClick={this.handleClick}>clear</button>
        </div>
      )
    }
    if (this.state.name === 'kg') {
      return (
        <div className='converter plus'>
          <p>{`There is ${kgToPounds(this.state.valueKg)} pounds(s) in ${this.state.valueKg} kilogram(s) `}</p>
          <button onClick={this.handleClick}>clear</button>
        </div>
      )
    }

  }
}


function mlToOz(value) {
  const result = value / 29.57353
  return result.toFixed(2);
}

function ozToCup(value) {
  const result = value / 8
  return result.toFixed(2);
}

function cupToLtr(value) {
  const result = value / 0.23659
  return result.toFixed(2);
}

function grToKg(value) {
  const result = value / 1000
  return result.toFixed(2);
}

function kgToPounds(value) {
  const result = value * 2.204623
  return result.toFixed(2);
}
