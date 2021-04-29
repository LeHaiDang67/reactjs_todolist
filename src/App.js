import './App.css';
import React, { Component } from 'react';

let listData = [
  {id : 1, name : "Luffy", age : 22},
  {id: 2, name : "Naruto", age : 36},
  {id : 3, name : "Saitama", age : 27},
  {id: 4, name : "Nami", age : 22}
]

function TableCharacter (props){
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
        {props.listChar.map((item)=>
      
          <tr key={item.id}>
            <td >{item.id}</td>
            <td><input defaultValue={item.name} onChange={props.changeName}  type = "text"/></td>
            <td>{item.age}</td>
            <td><button className="btn btn-default" onClick = {props.getCharacter} value={item.id}>O</button></td>
            <td><button className="btn btn-default" onClick = {props.deleteCharacter} value= {item.id}>X</button></td>
            
          </tr>
         
        )}
      </tbody>
      </table>
  );
     
  
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      idChar : 0,
      nameChar: '',
      ageChar: 0,
      message:'',
      characters : []
    }
    this.myRef = React.createRef();
  }

  componentDidMount(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(listData)
      }, 1000)
    }).then(
      (data) => {
        this.setState({ characters: data});
        console.log(data)
      }
    ).catch( (Error) =>{
      console.log(Error);
    })
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
          this.state.characters.push(newChar);
          this.forceUpdate()
         }
       
      }
    else{
      this.setState({message : "Please input character'name"})
    }
 
  }
  

  deleteChar = (event) =>{
   let deleteId = parseInt (event.target.value);
   this.state.characters.splice(this.state.characters.findIndex(item => item.id === deleteId),1);
   this.forceUpdate();
 
  }
  
  getChar = (event) => {
    let editId = parseInt(event.target.value);
    let a = this.state.characters.find(item => (item.id === editId));
    this.setState({idChar: a.id ,nameChar: a.name, ageChar:a.age});
    
  }

  editChar = (event) =>{
    event.preventDefault();
    let editId = parseInt(event.target.value);
    let indexOdject = this.state.characters.findIndex( item => item.id === editId);
    console.log(editId);
    console.log(indexOdject);
    this.state.characters[indexOdject].name = this.state.nameChar;
    // this.state.characters[indexOdject].age = parseInt(this.state.ageChar);
    console.log(this.state.characters[indexOdject]);
  
    this.forceUpdate();
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
       <TableCharacter listChar = {this.state.characters} changeName ={this.changeName} getCharacter ={this.editChar} deleteCharacter = {this.deleteChar}/>
      
        <br/>
        <form >
          <div className="row">
            <div className="col-md-6">
                <p>Id:</p>
                <input type="text"  onChange={this.changeId} value={this.state.idChar}  readOnly/>
                <br/><br/>
                <p>Name:</p>
                <input type="text"  ref={this.myRef} onChange={this.changeName}  placeholder="Input character'name"/>
                <p>{this.state.message}</p>
                <p>Age:</p>
                <input type="text"  onChange={this.changeAge} value={this.state.ageChar} placeholder="Input characte'age"/>
                <br/><br/>
                <button className="btn btn-default" type="submit" onClick={this.addChar}>Add character</button>
             
               
            </div>
           
          </div>
            
        </form>
      
      </>
    )
  }
}

export default App;
