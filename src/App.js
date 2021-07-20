import './App.css';
import React, { useState, useEffect } from 'react';

let listData = [
  { id: 1, name: "Luffy", age: 22 },
  { id: 2, name: "Naruto", age: 36 },
  { id: 3, name: "Saitama", age: 27 },
  { id: 4, name: "Nami", age: 22 }
]

const CharacterRow = (props) => {
  const [character, setCharacter] = useState({
    // id: 0,
    // name: '',
    // age: 0
  });

  useEffect(() => {
    if (props.rowChar !== character) {
      setCharacter(props.rowChar)
    }
  })

  return (
    <form >
    <div className="row">
      
      <div className="col-md-6">
        <p>Id:</p>
        <input type="text" name='id' onChange={props.onChangeValue} value={character.id ? character.id : ''} readOnly />
        <br /><br />
        <p>Name:</p>
        <input type="text" name='name' onChange={props.onChangeValue} value={character.name ? character.name : ''} placeholder="Input character'name" />
        <p>{props.messageErr}</p>
        <p>Age:</p>
        <input type="text" name='age' onChange={props.onChangeValue} value={character.age ? character.age : '' } placeholder="Input characte'age" />
        <br /><br />
        <button className="btn btn-default col-md-2" style={{margin:'5px'}} type="submit" onClick={props.searchChar} title='Search by name'>Search</button>
        <button className="btn btn-default col-md-2" style={{margin:'5px'}} type="submit" onClick={props.addChar}>Add</button>
        <button className="btn btn-default col-md-2" style={{margin:'5px'}} type="submit" onClick={props.editChar}>Edit</button>
        <button className="btn btn-default col-md-2" style={{margin:'5px'}} type="submit" onClick={props.clearChar}>Clear</button>
      </div>

    </div>

  </form>

  );
}

const App = () => {
  const [message, setMessage] = useState('');
  const [characters, setCharacters] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [resetFlag, setResetFlag] = useState(1);
  const [messageSearch, setMessageSearch ] = useState('');
  const [isSearchSucceed, setIsSearchSucceed] = useState(false);

  useEffect(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(listData)
      }, 1000)
    }).then(
      (data) => {
        setCharacters(data);
      }
    ).catch((Error) => {
      console.log(Error);
    })
  }, [resetFlag]);


  const makeCharacter = (newId) => {
    return {
      id: newId,
      name: selectedItem.name,
      age: selectedItem.age
    }
  }
  
  const changeInputValue = (event) => {
      let target = event.target;
      setSelectedItem({...selectedItem, [target.name]: target.value});
  };


  const addChar = (event) => {
    event.preventDefault()
  
    if (selectedItem.name !== "") {
      let findObj = characters.find(item => item.name.toLowerCase() === selectedItem.name.toLowerCase());
      if (findObj) {
        setMessage("Your character'name is existed");
        console.log("same name");
      }
      else {
        var newId = characters[characters.length - 1].id + 1;
        setCharacters([...characters, makeCharacter(newId)]);

      }

    }
    else {
      setMessage("Please input character'name")
    }

  }


  const deleteChar = (event) => {
    let deleteId = parseInt(event.target.value);
    let cloneChar = [...characters];
    cloneChar.splice(cloneChar.findIndex(item => item.id === deleteId), 1);
    setCharacters(cloneChar);
    setSelectedItem({});
  }

  const getChar = (event) => {
    let editId = parseInt(event.target.value);
    let a = characters.find(item => (item.id === editId));
    setSelectedItem(a);
  }

  const editChar = (event) => {
    event.preventDefault();
    let editId = selectedItem.id;
    setCharacters(characters.map(item =>
      (item.id === editId ? {...item, name: selectedItem.name, age: selectedItem.age} : item)
    ));

  }

  const searchChar = (event) =>{
    event.preventDefault();
    let selectedName = selectedItem.name;
    let selectedArr = [];
    if(selectedName === '' || selectedName === undefined)
    {
      setMessage("Please input name");
    } else{
      characters.map((item, index) => {
        if(item.name.toLowerCase() == selectedName.toLowerCase()){
          selectedArr.push(item);
        }
      });
      if(selectedArr.length == 0){
        setMessageSearch("No search results");
        setIsSearchSucceed(true);
      }
      setCharacters(selectedArr);
      
      
    }
  
  };

  const clearChar = (event) =>{
    event.preventDefault();
    setSelectedItem({});
    setIsSearchSucceed(false);
    setResetFlag(resetFlag + 1);
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((item, index) =>
               <tr key={item.id}>
                <td>{item.id}</td>
                <td><input type='text' value={item.name} onChange={changeInputValue} /></td>
                <td>{item.age}</td>
                <td><button className="btn btn-default" onClick={getChar} value={item.id}>O</button></td>
                <td><button className="btn btn-default" onClick={deleteChar} value={item.id}>X</button></td>
              </tr>
          )}
        </tbody>
      </table>
      {isSearchSucceed ? <h2>{messageSearch}</h2>:''}
      <br />
      <CharacterRow rowChar={selectedItem}
              onChangeValue={changeInputValue}
              messageErr={message}
              searchChar={searchChar}
              addChar={addChar} 
              editChar={editChar} 
              clearChar={clearChar} />

    </>
  )

}

export default App;
