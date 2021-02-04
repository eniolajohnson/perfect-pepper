import React from 'react';
import Header from '../components/header';
import NavBar from '../components/navbar';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className='home'>
          <h2>Recipe of the day</h2>
          <img src="https://lh4.ggpht.com/7Q0Ej4tYj-ut2K8rV0ckoVqXOrsmoliCdWIfyni1FWOLWxAq-W2PLSHHgOtJXgKzL1N8OF_tDEKOQPvUPP3dRK0=s640-c-rw-v1-e365" alt="chicken tacos"/>
          <h5>Chicken Tacos</h5>
        </div>
        <NavBar />
      </div>

    );
  }
}

// export default function Home(props) {
//   return (
//     <>
//     </>
//   );
// }
