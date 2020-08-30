import React,{Component} from "react";
import moment from "moment";  //moment library take care of all the date  manupulation

class Calendar extends Component{
    constructor(props){
    super(props);
    
    this.state={
        dateType:moment(),
        today:moment(),
        showMonthPopup:false,
       
    }
    }
/*============weekdays variables======*/
    weekdays=moment.weekdays();//(sunday to satday)
    weekdaysShort=moment.weekdaysShort();//[sun,mon,tue,wed,thu,fri,sat]

 /*======months=====*/
  months=moment.months();
 
 

  /*=====functions is used to build calendar =====*/

  year=()=>{
      return this.state.dateType.format("Y");
  }
 month=()=>{
     return this.state.dateType.format("MMMM");
 }
 daysInMonth=()=>{
     return this.state.dateType.daysInMonth();
 }
 //currentDate=()=>{
 //    return this.state.dateType.get("date");
 //}
 currentDay=()=>{
     return this.state.dateType.format("D")
 }

 firstDayOfMonth=()=>{
     let dateType=this.state.dateType;
     let firstDay=moment(dateType).startOf('month').format('d');//days of week index  0 to 6 this will help how many black will give in firstday of month
     return firstDay;
 }


 
setMonth=(month)=>{
    let monthNo=this.months.indexOf(month);
    let dateType=Object.assign({},this.state.dateType);
    dateType=moment(dateType).set("month",monthNo);
    this.setState({
        dateType:dateType
    });
}



onSelectChange=(e,data)=>{
    this.setMonth(data);
}

 //selectlist is a function component,//every month should be clickble so using <a> tag,data is nothing but a month
 //popup variable iis nothing but a collection of div that contains month
 SelectList=(props)=>{
     let popup=props.data.map((data)=>{
         return(
             <div key={data}>
                 <a href="#" onClick={(e)=>{this.onSelectChange(e,data)}}>
                     {data}
                 </a>
             </div>
         );
     });
     //we have to return from selectlist before its render
     return(
         <div className="popup">{popup}</div>
     );
 }

 onChangeMonth=(e,month)=>{
     this.setState({showMonthPopup:!this.state.showMonthPopup});
 }

 /*====monthsnav====*/
MonthNav=()=>{
    return(
        <span className="month" onClick={(e)=>{this.onChangeMonth(e,this.month())}}>
            {this.month()}    {/*this is comming from function block state*/}{/*when showmonthpopup is true then display selectlist*/}
            {this.state.showMonthPopup && 
            <this.SelectList data={this.months}/>
              }
        </span>
    )
}

/*======year nav=====*/

showYearEditor=()=>{
    this.setState({
        showYearNav:true
    })
}
setYear=(year)=>{
    let dateType=Object.assign({},this.state.dateType);
    dateType=moment(dateType).set("year",year);
    this.setState({
        dateType:dateType
    })
}

onYearChange=(e)=>{
    this.setYear(e.target.value);
   
}

YearNav=()=>{
    return(
        this.state.showYearNav?
        <input 
           defaultValue={this.year()}
           className="edityear"
           onChange={(e)=>this.onYearChange(e)}
           type="number"
           placeholder="year"/>
           :
        <span className="year"
            onClick={(e)=>{this.showYearEditor()}}>
            {this.year()}
        </span>
    )
}



 render(){

    //map the weekdays i.e sun,mon,tue,wed,tus,fri,sat as <td>

    let weekdays=this.weekdaysShort.map((day)=>{
        return(
            <td key={day} className="week-day">{day}</td>
        )
    })

    ///creating list of empty cells before firstday of month

    let blanks=[];
    for (let i=0; i<this.firstDayOfMonth(); i++){
        blanks.push(
        <td key={i*80} className="emptyslot">
            {""}
            </td>
            );
    }

    console.log("blanks:",blanks);

    //daysin months

    let daysInMonth=[];
    for(let d=1; d<=this.daysInMonth(); d++){
        let className=(d===this.currentDay()?"day current-day":"day");
        daysInMonth.push(
            <td key={d} className={className}>
                <span>{d}</span>
            </td>
        )
    }
 console.log("days:",daysInMonth);

 //merge blocks array and daysinmonth array

 var totalSlots=[...blanks,...daysInMonth]
 let rows=[];
 let cells=[];
 totalSlots.forEach((row,index)=>{
     if((index% 7 )!==0){
         cells.push(row);
     }else{
         let insertRow=cells.slice();//slice is use for end of an row
         rows.push(insertRow);//new row
         cells=[];//again cell empty
         cells.push(row);
     }
     if(index===totalSlots.length-1){
         let insertRow=cells.slice();
         rows.push(insertRow);;//end of arr last arr
     }
 });

 let trElements=rows.map((d,i)=>{
     return(
         <tr key={i*100}>
             {d}
         </tr>
     )
 })


     return(
         <div className="calendar">
             <table className="table">
                 <thead>
                     <tr className="trheader">
                         <td colSpan="5">
                             <this.MonthNav/>

                             <this.YearNav/>
                         </td>
                     </tr>
                 </thead>
                 <tbody>
                     <tr>
                     {weekdays}
                     </tr>
                       {trElements}
                 </tbody>
             </table>
         </div>
      
        ) 
     }
   
 
}
   export default Calendar;