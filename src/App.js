import './App.css';
import React, { Component } from 'react';


class TableCharacter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      listCharacter : []
    }
  }
  componentDidMount(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.props.listChar);
      }, 1000)
    }).then(
      (data) => {
        this.setState({ listCharacter: data});
      }
    ).catch( (Error) =>{
      console.log(Error);
    })
  }
  componentDidUpdate(prevProps){ 
   if(prevProps.listChar !== this.state.listCharacter){
    this.setState({listCharacter : this.props.listChar});
   
   }
  
    console.log('Component did update!');
  }

  changeNameTable = (event) =>{
    console.log(event.target.value);
    this.setState({nameTable: event.target.value});
  }

  render() {
    return(
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
        {this.state.listCharacter.map((item, index)=>
      
          <tr key={item.id}>
            <td >{item.id}</td>
            <td><input value={item.name} onChange={this.changeNameTable} type = "text"/></td>
            <td>{item.age}</td>
            <td><button className="btn btn-default" onClick = {this.props.getCharacter} value={item.id}>O</button></td>
            <td><button className="btn btn-default" onClick = {this.props.deleteCharacter} value= {item.id}>X</button></td>
            
          </tr>
         
        )}
      </tbody>
      </table>
  );
  }
 
     
  
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      idChar : 0,
      nameChar: '',
      arrName: [],
      ageChar: 0,
      message:'',
      characters : [
        {id : 1, name : "Luffy", age : 22},
        {id: 2, name : "Naruto", age : 36},
        {id : 3, name : "Saitama", age : 27},
        {id: 4, name : "Nami", age : 22}
      ]
    }
    this.myRef = React.createRef();
  }

 

  changeId = (event)=>{
    this.setState({idChar : event.target.value})
  }

  changeAge = (event)=>{
    this.setState({ageChar : event.target.value})
  
    this.setState({message : ""})
  }
  changeName = (event)=>{
    this.setState({nameChar : event.target.value})
    this.setState({message : ""})
  } 

  addChar = (event)=>{
    event.preventDefault()
    if(this.state.nameChar !=="")
      { 
         var findObj = this.state.characters.find(item => item.name.toLowerCase() === this.state.nameChar.toLowerCase());
         if(findObj){
           this.setState({message: "Your character'name is existed"});
           console.log("same name");
         }
         else{
          var newId = this.state.characters[this.state.characters.length-1].id + 1;
          var newChar = {id: newId,name: this.state.nameChar, age: this.state.ageChar};
          var arrChar = this.state.characters;
          arrChar.push(newChar);
          this.setState({characters : arrChar});
         }
       
      }
    else{
      this.setState({message : "Please input character'name"})
    }
 
  }
  

  deleteChar = (event) =>{
   let deleteId = parseInt (event.target.value);
   var arrChar = this.state.characters;
   arrChar.splice(this.state.characters.findIndex(item => item.id === deleteId),1);
   this.setState({characters: arrChar});
  }
  
  getChar = (event) => {
    let editId = parseInt(event.target.value);
    let a = this.state.characters.find(item => (item.id === editId));
    this.setState({idChar: a.id ,nameChar: a.name, ageChar:a.age});
    
  }

  editChar = (event) =>{
    event.preventDefault();
    let editId = this.state.idChar;
    this.setState( prevState => ({ 
     characters: prevState.characters.map( item => 
      (item.id === editId ? Object.assign( item , {name : prevState.nameChar , age : prevState.ageChar }): item))
    }))
  }

  searchChar = (event) =>{
    event.preventDefault();
    this.myRef.current.focus();
    var findObj = this.state.characters.find(item => item.name.toLowerCase() === this.state.nameChar.toLowerCase());
    this.setState({listChar:[findObj]});

  }

  render(){ 
  
    return(
      <>
       <TableCharacter listChar = {this.state.characters}  getCharacter ={this.getChar} deleteCharacter = {this.deleteChar}/>
      
        <br/>
        <form >
          <div className="row">
            <div className="col-md-6">
                <p>Id:</p>
                <input type="text"  onChange={this.changeId} value={this.state.idChar}  readOnly/>
                <br/><br/>
                <p>Name:</p>
                <input type="text"  ref={this.myRef} onChange={this.changeName} value={this.state.nameChar}  placeholder="Input character'name"/>
                <p>{this.state.message}</p>
                <p>Age:</p>
                <input type="text"  onChange={this.changeAge} value={this.state.ageChar} placeholder="Input characte'age"/>
                <br/><br/>
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
