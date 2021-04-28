import './App.css';
import React, { Component } from 'react';

let character = [
  {id : 1, name : "Luffy", age : 22},
  {id: 2, name : "Naruto", age : 36},
  {id : 3, name : "Saitama", age : 27},
  {id: 4, name : "Nami", age : 22}
]

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      idChar : 0,
      nameChar: '',
      ageChar: 0,
      message:'',
      listChar: []
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
         var findObj = character.find(item => item.name.toLowerCase() === this.state.nameChar.toLowerCase());
         if(findObj){
           this.setState({message: "Your character'name is existed"});
           console.log("same name");
         }
         else{
          var newId = character[character.length-1].id + 1;
          var newChar = {id: newId,name: this.state.nameChar, age: this.state.ageChar};
          character.push(newChar);
          this.forceUpdate()
         }
       
      }
    else{
      this.setState({message : "Please input character'name"})
    }
 
  }
  

  deleteChar = (event) =>{
   let deleteId = parseInt (event.target.value);
   
   character.splice(character.findIndex(item => item.id === deleteId),1);
   this.forceUpdate();
 
  }
  
  getChar = (event) => {
    let editId = parseInt(event.target.value);
    let a = character.find(item => (item.id === editId));
   
    this.setState({idChar: a.id ,nameChar: a.name, ageChar:a.age});
    
  }

  editChar = (event) =>{
    event.preventDefault();
    let editId = this.state.idChar;
    let indexOdject = character.findIndex( item => item.id === editId);
    character[indexOdject].name = this.state.nameChar;
    character[indexOdject].age = parseInt(this.state.ageChar);
    console.log(character[indexOdject]);
    console.log(this.state.age);
    this.forceUpdate();
  }

  searchChar = (event) =>{
    event.preventDefault();
    this.myRef.current.focus();
    var findObj = character.find(item => item.name.toLowerCase() === this.state.nameChar.toLowerCase());
    this.setState({listChar:[findObj]});
        

  }

  render(){ 
  
    return(
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
           {character.map((item)=>
             <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td><button className="btn btn-default" onClick = {this.getChar} value={item.id}>O</button></td>
              <td><button className="btn btn-default" onClick = {this.deleteChar} value= {item.id}>X</button></td>
              
            </tr>
           )}
         </tbody>
        </table>
        <br/>
        <form >
          <div className="row">
            <div className="col-md-6">
                <p>Id:</p>
                <input type="text" name="nameChar" onChange={this.changeId} value={this.state.idChar}  readOnly/>
                <br/><br/>
                <p>Name:</p>
                <input type="text" name="nameChar" ref={this.myRef} onChange={this.changeName} value={this.state.nameChar} placeholder="Input character'name"/>
                <p>{this.state.message}</p>
                <p>Age:</p>
                <input type="text" name="ageChar" onChange={this.changeAge} value={this.state.ageChar} placeholder="Input characte'age"/>
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
