import './App.css';
import React, { useState, useEffect, useRef } from 'react';

let listData = [
  { id: 1, name: "Luffy", age: 22 },
  { id: 2, name: "Naruto", age: 36 },
  { id: 3, name: "Saitama", age: 27 },
  { id: 4, name: "Nami", age: 22 }
]

const CharacterRow = (props) => {
  const [character, setCharacter] = useState({
    id: 0,
    name: '',
    age: 0
  }
  );
  const [nameChar, setNameChar] = useState('');

  useEffect(() => {
    if (props.rowChar !== character) {
      setCharacter(props.rowChar)
    }
    console.log("update component!")
  })


  const changeName = (event) => {
    this.setState({ ...character, name: event.target.value });
  }


  const singleChar = props.rowChar;
  return (
    <tr key={singleChar.id}>
      <td>{singleChar.id}</td>
      <td><input type='text' value={singleChar.name} onChange={changeName} /></td>
      <td>{singleChar.age}</td>
      <td><button className="btn btn-default" onClick={props.getChar} value={singleChar.id}>O</button></td>
      <td><button className="btn btn-default" onClick={props.deleteChar} value={singleChar.id}>X</button></td>
    </tr>

  );
}

const App = () => {

  const [idChar, setIdChar] = useState(0);
  const [nameChar, setNameChar] = useState('');
  const [ageChar, setAgeChar] = useState(0);
  const [message, setMessage] = useState('');
  const [characters, setCharacters] = useState([]);

  const myRef = useRef();

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
  }, []);


  const makeCharacter = (newId) => {
    return {
      id: newId,
      name: nameChar,
      age: ageChar
    }
  }

  const changeId = (event) => {
    setIdChar(event.target.value)
  }

  const changeAge = (event) => {
    setAgeChar(event.target.value);
    setMessage('');
  }
  const changeName = (event) => {
    setNameChar(event.target.value);
    setMessage('');
  }

  const addChar = (event) => {
    event.preventDefault()
    myRef.current.focus();
    if (nameChar !== "") {
      let findObj = characters.find(item => item.name.toLowerCase() === nameChar.toLowerCase());
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
    setIdChar(0);
    setNameChar('');
    setAgeChar(0);
  }

  const getChar = (event) => {
    let editId = parseInt(event.target.value);
    let a = characters.find(item => (item.id === editId));
    setIdChar(a.id);
    setNameChar(a.name);
    setAgeChar(a.age);
  }

  const editChar = (event) => {
    event.preventDefault();
    let editId = idChar;
    setCharacters(characters.map(item =>
      (item.id === editId ? Object.assign(item, { name: nameChar, age: ageChar }) : item)
    ));

  }

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
            <React.Fragment key={item.id}>
              <CharacterRow rowChar={item} deleteChar={deleteChar} getChar={getChar} />
            </React.Fragment>
          )}
        </tbody>
      </table>
      <br />
      <form >
        <div className="row">
          <div className="col-md-6">
            <p>Id:</p>
            <input type="text" onChange={changeId} value={idChar} readOnly />
            <br /><br />
            <p>Name:</p>
            <input type="text" ref= {myRef} onChange={changeName} value={nameChar} placeholder="Input character'name" />
            <p>{message}</p>
            <p>Age:</p>
            <input type="text" onChange={changeAge} value={ageChar} placeholder="Input characte'age" />
            <br /><br />
            <button className="btn btn-default" type="submit" onClick={addChar}>Add character</button>
            <button className="btn btn-default" type="submit" onClick={editChar}>Edit character</button>

          </div>

        </div>

      </form>

    </>
  )

}

export default App;
