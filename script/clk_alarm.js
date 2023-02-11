var sound = new Audio("../sound/alarm-clock-short-6402.mp3");
		sound.loop = true;

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}
 

var time = document.getElementById("time");
var date = document.getElementById("date");
var set = document.getElementById("set");
var clr = document.getElementById("clr");
var snz = document.getElementById("snz");
var calender= document.getElementById("calender");

function retriveData(){
  var retrievedObject = JSON.parse(localStorage.getItem('alarm'));
  if(retrievedObject){
    document.getElementById("hour").value=parseInt(retrievedObject.substring(0,2));
    document.getElementById("minute").value=parseInt(retrievedObject.substring(3,5));
    document.getElementById("second").value=parseInt(retrievedObject.substring(6,8));
    document.getElementById("zone").value=retrievedObject.substring(9,11).toLowerCase();
    if(retrievedObject.substring(11,12)==="1"){
      document.getElementById("hour").disabled = true;
      document.getElementById("minute").disabled = true;
      document.getElementById("second").disabled = true;
      document.getElementById("zone").disabled = true;    
    }
  }

}

retriveData();


setInterval(function(){
  var d = new Date();
  time.innerHTML = d.toLocaleTimeString();
  date.innerHTML = d.toLocaleDateString();
  calender.innerHTML=d.toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"});
  var retrievedObject = JSON.parse(localStorage.getItem('alarm'));
  var AmOrPm = d.getHours() >= 12 ? 'PM' : 'AM';
  var hours = pad((d.getHours() % 12) || 12);
  var minutes = pad(d.getMinutes());
  var seconds = pad(d.getSeconds());


    if(hours===(retrievedObject.substring(0,2)) && (minutes===(retrievedObject.substring(3,5))) && (seconds===(retrievedObject.substring(6,8))) && (AmOrPm===(retrievedObject.substring(9,11)))){
      console.log("alarm");
      sound.play();
    }

  

},1000);



set.addEventListener("click",function(){
  var h = pad(document.getElementById("hour").value);
  var m = pad(document.getElementById("minute").value);
  var s = pad(document.getElementById("second").value);
  var z = (document.getElementById("zone").value).toUpperCase();
  document.getElementById("hour").disabled = true;
  document.getElementById("minute").disabled = true;
  document.getElementById("second").disabled = true;
  document.getElementById("zone").disabled = true;
  var alarmTime = h+":"+m+":"+s+" "+z+"1";
  localStorage.setItem("alarm",JSON.stringify(alarmTime));
});

clr.addEventListener("click",function(){
  document.getElementById("hour").value=0;
  document.getElementById("minute").value=0;
  document.getElementById("second").value=0;
  document.getElementById("zone").option="AM";
  document.getElementById("hour").disabled = false;
  document.getElementById("minute").disabled = false;
  document.getElementById("second").disabled = false;
  document.getElementById("zone").disabled = false;
  var alarmTime = "00"+":"+"00"+":"+"00"+" "+"AM"+"0";
  localStorage.setItem("alarm",JSON.stringify(alarmTime));
  sound.pause();
});

snz.addEventListener("click",function(){
  var retrievedObject = JSON.parse(localStorage.getItem('alarm'));
  document.getElementById("hour").value=parseInt(retrievedObject.substring(0,2));
  document.getElementById("minute").value=parseInt(retrievedObject.substring(3,5))+5;
  document.getElementById("second").value=parseInt(retrievedObject.substring(6,8));
  document.getElementById("zone").value=retrievedObject.substring(9,11).toLowerCase();

  document.getElementById("hour").disabled = true;
  document.getElementById("minute").disabled = true;
  document.getElementById("second").disabled = true;
  document.getElementById("zone").disabled = true;


  retrievedObject=retrievedObject.replace(retrievedObject.substring(3,5),pad(parseInt(retrievedObject.substring(3,5))+5));

  localStorage.setItem("alarm",JSON.stringify(retrievedObject));
  sound.pause();
});













