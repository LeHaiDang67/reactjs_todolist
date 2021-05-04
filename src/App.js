import './App.css';
import React, { Component } from 'react';


class CharacterRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      character: {
        id: 0,
        name: "",
        age: 0
      }
    }
  }
  componentDidMount() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.props.rowChar);
      }, 1000)
    }).then(
      (data) => {
        this.setState({ character: data });
      }
    ).catch((Error) => {
      console.log(Error);
    })
  }
  // componentDidUpdate() will when the props update if it changed. We use componentDidMount() because componentDidMount() is already called - call only onetime
  componentDidUpdate(prevProps) {
    if (prevProps.rowChar.name !== this.state.character.name) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.props.rowChar);
        }, 1000)
      }).then(
        (data) => {
          console.log('Component did update!');
          this.setState({ character: data });
          
        }
      ).catch((Error) => {
        console.log(Error);
      })
      
    }
   
   
  }

  changeName = (event) => {
    this.setState({ ...this.state.character, name: event.target.value });
  }

  render() {
    return (
      <input value={this.state.character.name} onChange={this.changeName} type="text" />
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idChar: 0,
      nameChar: '',
      ageChar: 0,
      message: '',
      characters: [
        { id: 1, name: "Luffy", age: 22 },
        { id: 2, name: "Naruto", age: 36 },
        { id: 3, name: "Saitama", age: 27 },
        { id: 4, name: "Nami", age: 22 }
      ]
    }
    this.myRef = React.createRef();
  }

  makeCharacter = (newId) => {
    return {
      id: newId,
      name: this.state.nameChar,
      age: this.state.ageChar
    }
  }

  changeId = (event) => {
    this.setState({ idChar: event.target.value })
  }

  changeAge = (event) => {
    this.setState({ ageChar: event.target.value, message: "" })
  }
  changeName = (event) => {
    this.setState({ nameChar: event.target.value, message: "" })
  }

  addChar = (event) => {
    event.preventDefault()
    if (this.state.nameChar !== "") {
      let cloneObj = [...this.state.characters];
      let findObj = cloneObj.find(item => item.name.toLowerCase() === this.state.nameChar.toLowerCase());
      if (findObj) {
        this.setState({ message: "Your character'name is existed" });
        console.log("same name");
      }
      else {
        var newId = this.state.characters[this.state.characters.length - 1].id + 1;
        this.setState({ characters: [...this.state.characters, this.makeCharacter(newId)] });

      }

    }
    else {
      this.setState({ message: "Please input character'name" })
    }

  }


  deleteChar = (event) => {
    let deleteId = parseInt(event.target.value);
    let cloneChar = [...this.state.characters];
    cloneChar.splice(cloneChar.findIndex(item => item.id === deleteId), 1);
    this.setState({ characters: cloneChar, idChar: 0, nameChar: '', ageChar: 0 });
  }

  getChar = (event) => {
    let editId = parseInt(event.target.value);
    let cloneChar = [...this.state.characters];
    let a = cloneChar.find(item => (item.id === editId));
    this.setState({ idChar: a.id, nameChar: a.name, ageChar: a.age });

  }

  editChar = (event) => {
    event.preventDefault();
    let editId = this.state.idChar;
    this.setState(prevState => ({
      characters: prevState.characters.map(item =>
        (item.id === editId ? Object.assign(item, { name: prevState.nameChar, age: prevState.ageChar }) : item))
    }))
  }

  // searchChar = (event) =>{
  //   event.preventDefault();
  //   this.myRef.current.focus();
  //   var findObj = this.state.characters.find(item => item.name.toLowerCase() === this.state.nameChar.toLowerCase());
  //   this.setState({listChar:[findObj]});

  // }

  render() {

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
            {this.state.characters.map((item, index) =>

              <tr key={item.id}>
                <td >{item.id}</td>
                <td><CharacterRow rowChar={item} /></td>
                <td>{item.age}</td>
                <td><button className="btn btn-default" onClick={this.getChar} value={item.id}>O</button></td>
                <td><button className="btn btn-default" onClick={this.deleteChar} value={item.id}>X</button></td>

              </tr>

            )}
          </tbody>
        </table>
        <br />
        <form >
          <div className="row">
            <div className="col-md-6">
              <p>Id:</p>
              <input type="text" onChange={this.changeId} value={this.state.idChar} readOnly />
              <br /><br />
              <p>Name:</p>
              <input type="text" ref={this.myRef} onChange={this.changeName} value={this.state.nameChar} placeholder="Input character'name" />
              <p>{this.state.message}</p>
              <p>Age:</p>
              <input type="text" onChange={this.changeAge} value={this.state.ageChar} placeholder="Input characte'age" />
              <br /><br />
              <button className="btn btn-default" type="submit" onClick={this.addChar}>Add character</button>
              <button className="btn btn-default" type="submit" onClick={this.editChar}>Edit character</button>

            </div>

          </div>

        </form>

      </>
    )
  }
}

export default App;
