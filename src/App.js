import { useState, useEffect } from 'react';

import CardList from './components/card-lists/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import logo from './logo.svg';
import './App.css';



const App = () => {

  console.log('render')

  const [ searchField, setsearchField ] = useState(''); // [value, setValue]
  const [ monsters, setMonsters ] = useState([]);
  const [ filterredMonsters, setFilterredMonsters ] = useState([monsters]); 
  
  console.log(searchField)

  useEffect(()=>{
    //console.log('fire')
    fetch('http://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  },[]) //useEffect(()=>{},[]) run ()=>{} when [] changed

  useEffect(()=>{
  console.log('fire from ilterredMonstersArray')
    const filterredMonstersArray = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField)
    });
    setFilterredMonsters(filterredMonstersArray)
  },[monsters,searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setsearchField(searchFieldString)
  }

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Searcher</h1>
      <SearchBox className='monsters-search box' onChangeHandler = { onSearchChange } placeholder="search monster"/>
      <CardList monsters={filterredMonsters}/>
    </div>
  );
}

// class App extends Component {

//   constructor() {
//     super();

//     console.log('constructor')
//     this.state = {
//       monsters : [],
//       searchField: ''
//     };
//   }

//   // This life cycle run when the first time coponent reder on the page
//   componentDidMount() {

//     console.log('componentDidMount')

//     fetch('http://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => this.setState(
//         ()=>{
//           return {monsters: users}
//         },
//         () => {
//           console.log(this.state)
//         }
//       ))
//   }

  // onSearchChange = (event) => {
  //   const  searchField = event.target.value.toLowerCase();
  //   this.setState(()=> {
  //     return { searchField }
  //   });
  // }

//   render() {
//     console.log('render')
    
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this

//     const filterredMonsters = monsters.filter((monster) => {
//       return monster.name.toLowerCase().includes(searchField)
//     });

    

//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Searcher</h1>
//         <SearchBox className='monsters-search box' onChangeHandler = { onSearchChange } placeholder="search monster"/>
//         <CardList monsters={filterredMonsters}/>
//       </div>
//     );
//   }
// }

export default App;
