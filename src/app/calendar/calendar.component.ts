import { Component, OnInit } from '@angular/core';
import { CalendarEvent, } from "angular-calendar";
//import {CalendarMessageService}from '../calendar-message.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreDocument,AngularFirestoreCollection} from 'angularfire2/firestore';
import { query } from '@angular/core/src/animation/dsl';
import {DataService} from '../data.service';
import { _createDefaultCookieXSRFStrategy } from '@angular/http/src/http_module';

/*export class appointment{
  event:CalendarEvent;
  userName:string;
  treatment:string;
}*/
export class appoi{
  userName: string;
  type:string;
  start:Date;
  end:Date;
}
export interface aDay{
  date:string;
  hoursEvning:string;
  hoursMorning:string;

}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  view: string = 'month'; 
   viewDate: Date = new Date();
  events:CalendarEvent[]; 

  /*treatment:string;
  userName:string; 
  apps:appointment[];*/
  myAppois:appoi[]; 
  mySpecDays:aDay[];
  myDays:aDay[];
  clickedDate: Date;  
  //appoi:appointment;
    private col:AngularFirestoreCollection<any>;
    private myAppCol:AngularFirestoreCollection<any>;
    private mySpeDays:AngularFirestoreCollection<any>;
    private mySettDays:AngularFirestoreCollection<any>;
      constructor(private afs: AngularFirestore ,private dataService:DataService) {
       //this.itemDoc =this.afs.doc("events/1"); 
       this.col=this.afs.collection("events"); 
       this.viewDate = new Date();  
       this.col.valueChanges().subscribe(res=>{
       /*  this.apps=res;
        for(var i=0;i<res.length;i++){
          this.events[i]=res[i].event;
        }*/
        this.events=res; 
       });  
       this.myAppCol=this.afs.collection("myApointments");
       this.myAppCol.valueChanges().subscribe(res=>{
        this.myAppois=res;
       });
       this.mySpeDays=this.afs.collection("specificDays");
       this.mySpeDays.valueChanges().subscribe(res=>{
        this.mySpecDays=res;
       });
       this.mySettDays=this.afs.collection("Setting Days");
       this.mySettDays.valueChanges().subscribe(res=>{
        this.myDays=res;
       });
       

     }

  dayClicked(){
  this.addEvent(this.clickedDate);
  alert(this.dataService.totalDuration)
  alert(this.dataService.selected_treatments);
  }
  
  addEvent(date){
     date=this.format(date);
     date=date+" 10:30:00";
    this.viewDate = new Date();
    let event: CalendarEvent = {
      start:new Date(date),
      // end: new Date(),
       title: "appointment",
       color: {
         primary: "#00FF00",
         secondary: "#afafaf"
       }   
     };  
    this.col.add(event).then(res => {
    })
  }

  ngOnInit() {
  }
format(curr){
  var dd = curr.getDate();
var mm = curr.getMonth()+1; 
var yyyy =curr.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = mm+'/'+dd+'/'+yyyy;
return today;
}

public iterate(){  
  var cc=document.getElementsByClassName("cal-cell");
  var cmonth=this.viewDate.getMonth();
  var cyear=this.viewDate.getFullYear();
  var daysInMonth=new Date(cyear, cmonth, 0).getDate();
  for(var i=7;i<38;i++){
    if(cc[i].getElementsByTagName("span")[1]!=null){
      if(cc[i].getElementsByTagName("span")[1].innerText=="1"){
    break;
    }
  }
    else if (cc[i].getElementsByTagName("span")[0].innerText=="1"){
    break;
    }
  }

  var dontDays=[];
  var t=i;
  var l=0;
for(i;i<=t+daysInMonth;i++){ 
   for(var j=0;j<this.mySpecDays.length;j++){
     var curr=new Date(this.mySpecDays[j].date);
     if(curr.getFullYear()==cyear&&curr.getMonth()==cmonth){
       var cday=curr.getDate().toString(); 
      if(cc[i].getElementsByTagName("span")[1]!=null){
        if(cc[i].getElementsByTagName("span")[1].innerText==cday){
      //  alert("hay!!!"+" "+cc[i].getElementsByTagName("span")[1].innerText);
        dontDays[l]=cday;
        l++;
       cc[i].className="a";
      }
     }
     else{
       if(cc[i].getElementsByTagName("span")[0].innerText==cday){
       // alert("hay!!!"+" "+cc[i].getElementsByTagName("span")[0].innerText);
        dontDays[l]=cday;
        l++;
        cc[i].className="a";
     }   
    }
   }
   }//end for mySpecDays 
   if(this.mySpecDays.length==dontDays.length){
     break;
   }
 }
 var cc=document.getElementsByClassName("cal-cell");
 var n; 
 var s=[];
 n=0;
 var m;
 for( i=0,m=0;m<daysInMonth-dontDays.length;m++,i++){
   if(cc[(i+t)].getElementsByTagName("span")[1]!=null){
    n=cc[(i+t)].getElementsByTagName("span")[1].innerText;
  }
  else{
   n=cc[(i+t)].getElementsByTagName("span")[0].innerText;
  }  
  s.push(n);
 // s.push(i+" "+n+"bb ");
  var d=new Date(cyear,cmonth,n); 
  for(var k=0;k<this.myDays.length;k++){ 
    //s.push(i+" "+k+" "+n);  
    var now=this.myDays[k].date;  
   if(this.check(d.getDay())==now){
    //console.log(this.check(d.getDay())+","+now+" "+i);
    cc[(i+t)].className="a2";
    i--;
     break;
   // alert(this.check(d.getDay())+" "+i);
   }
  }//end k
}//end cc
}
 public check(i){
  var arr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return(arr[i]);
}

/* aother:Rut */
public getDist(startTime:Date,endTime:Date):number
{
  var diff = endTime.getTime() - startTime.getTime();
//return duration in --->min<----.endTIme-startTime
return (diff / 60000);
}

public sortTime(arrayAppoi:appoi[]):appoi[]{
return null; 
}


/***********************************************************
* this function return array of the time that can make appoinmtments.

Assumption: duration in min. 
*************************************************************/

public scheduleTime(time:Date, duration:number):appoi[]
{
let valid_time_array: appoi[]=null;
//validation

    if (duration <= 0)
    {
        return valid_time_array;//true;
    }


//check if cosmetician cam work in this day..
let timeToWork: appoi[];
  //  timeToWork= this.getAvailability(time);//get array of start:end,start:end
    let startMorning=timeToWork[0].start;
    let endMorning=timeToWork[0].end;
    let startEvening=timeToWork[1].start;
    let endtEvening=timeToWork[1].end;
    let durationWorkA = this.getDist(startMorning,endMorning);
    let durationWorkB = this.getDist(startEvening,endtEvening);

    if ((duration >durationWorkA)&&
            (duration >durationWorkB))
    {
        return null;
    }

let appoi_in_time:appoi[];
let sort_appoi:appoi[];
let appointmensArray:appoi[];

    this.myAppCol=this.afs.collection("myApointments");
    this.myAppCol.valueChanges().subscribe(res=> {
        appointmensArray=res;
    });
    let j=0;
    if(appointmensArray.length == 0)
    {
      let newValidApp =new appoi();
      newValidApp.start = startMorning;
      newValidApp.end   = endMorning;
      valid_time_array.push(newValidApp);
      return valid_time_array;
    }
    for(let i=0; i<appointmensArray.length; i++)
    {
        let appoi_time =appointmensArray[i].start;
        let appoi_date_start=appointmensArray[i].start.getDay;
        let appoi_date_end=appointmensArray[i].end.getDay;
        if(  (appoi_date_end==appoi_date_start)&&
                (appoi_date_start==time.getDay)&&
                (appoi_time.getMonth==time.getMonth)&&
                (appoi_time.getFullYear==time.getFullYear))
        {
            appoi_in_time[j]=appointmensArray[i];
            j++;
        }

    }
    sort_appoi=this.sortTime(appoi_in_time);
    for(let i=1; i<sort_appoi.length; i++) { //run startB-endA>=duration->push to array of times..
        if((this.getDist(sort_appoi[i-1].end,sort_appoi[i].start) >=duration)&&
           (sort_appoi[i].start != startEvening))
         {
            let newValidApp =new appoi();
            newValidApp.start =sort_appoi[i-1].end;
            newValidApp.end =sort_appoi[i].start;
            valid_time_array.push(newValidApp);
        }

    }

    return valid_time_array;
}

public getAvailability(day:Date):string[]{
//this function gets a specific date and returns the hours the cosmetician works on that day.
  this.mySpecDays[0];
  this.myDays[0];
  let dayInTheWeek:string;
  switch(day.getDay()){
    case 0:
    dayInTheWeek="Sunday";
    break;
    case 1:
    dayInTheWeek="Monday";
    break;
    case 2:
    dayInTheWeek="Tuesday";
    break;
    case 3:
    dayInTheWeek="Wednesday";
    break;
    case 4:
    dayInTheWeek="Thursday";
    break;
    case 5:
    dayInTheWeek="Friday";
    break;
  }
  console.log(this.myDays);
  let spec_date;
  let res=[];
  for(let j=0;j<this.mySpecDays.length;j++){
    spec_date=new Date(this.mySpecDays[j].date);
    let is_same=this.compareDates(spec_date,day);
    if(is_same){
      let start=this.split_hours(this.mySpecDays[j].hoursMorning);
      let end=this.split_hours(this.mySpecDays[j].hoursEvning);
      if ((start.length==2)&&(end.length==2)){
        res.push(start);
        res.push(end);
        return res;
      }
      else{
        console.log("wrong value in DB!");
        return['0','0'];
      }
      
    }
  }
  for(let i=0;i<this.myDays.length;i++){
    if(this.myDays[i].date==dayInTheWeek){
      let start=this.split_hours(this.myDays[i].hoursMorning);
      let end=this.split_hours(this.myDays[i].hoursEvning);
      if ((start.length==2)&&(end.length==2)){
        res.push(start);
        res.push(end);
        return res;
      }
      else{
        console.log("wrong value in DB!");
        return ['0','0'];
      }
    }
  }
  return ['0','0'];
}
public split_hours(hour:string):string[]{
  let range=hour.split("-");
  if(range.length==2){
    return [range[0],range[1]];
  }
  if (range[0]=="vacation"){
    return ['0','0'];
}
return ['false'];
}
public compareDates(date1:Date, date2:Date):boolean{
  if (date1.getFullYear()!=date2.getFullYear())
    return false;
  if(date1.getMonth()!==date2.getMonth())
    return false;
  if (date1.getDate()!=date2.getDate())
    return false;
  return true;
}
}