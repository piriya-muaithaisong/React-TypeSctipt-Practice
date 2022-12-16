import { useState, useEffect, ChangeEvent } from 'react';

import CardList from './components/card-lists/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';
import { getData } from './utils/data.utils';

type Monster = {
  id: string;
  name: string;
  email: string;
}

const App = () => {

  console.log('render')

  const [searchField, setsearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filterredMonsters, setFilterredMonsters] = useState(monsters);

  console.log(searchField)

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>('http://jsonplaceholder.typicode.com/users')
      setMonsters(users)
    }
    fetchUsers()
  }, []) //useEffect(()=>{},[]) run ()=>{} when [] changed

  useEffect(() => {
    console.log('fire from ilterredMonstersArray')
    const filterredMonstersArray = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField)
    });
    setFilterredMonsters(filterredMonstersArray)
  }, [monsters, searchField])

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLowerCase();
    setsearchField(searchFieldString)
  }

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Searcher</h1>
      <SearchBox className='monsters-search box' onChangeHandler={onSearchChange} placeholder="search monster" />
      <CardList monsters={filterredMonsters} />
    </div>
  );
}

export default App;
