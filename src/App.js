import React,{Component} from "react";


import Calendar from "./Components/calendar";


class App extends Component{
   constructor(props){
   super(props);
   this.state={}
   }
   onDayClick=(e,day)=>{
      alert(day);
   }

render(){
       return(
           
                <Calendar onDayClick={(e,day)=>this.onDayClick(e,day)}/>
           
           
       )
   }
  
}

  export default App;