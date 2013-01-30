//
// Global state
//
// map     - the map object
// usermark- marks the user's position on the map
// markers - list of markers on the current map (not including the user position)
// 
//

//
// First time run: request current location, with callback to Start
//
var commit = 0;
var indiv = 0;
var opin = 0;
var cand = 0;
var cycleSEL = 0;

if (navigator.geolocation)  {
    navigator.geolocation.getCurrentPosition(Start);
}


function UpdateMapById(id, tag) {

    var target = document.getElementById(id);
    var data = target.innerHTML;

    var rows  = data.split("\n");
   
    for (i in rows) {
	var cols = rows[i].split("\t");
	var lat = cols[0];
	var long = cols[1];

	markers.push(new google.maps.Marker({ map:map,
						    position: new google.maps.LatLng(lat,long),
						    title: tag+"\n"+cols.join("\n")}));
	
    }
}

function ClearMarkers()
{
    // clear the markers
    while (markers.length>0) { 
	markers.pop().setMap(null);
    }
}


function UpdateMap()
{
    var color = document.getElementById("color");
    
    color.innerHTML="<b><blink>Updating Display...</blink></b>";
    color.style.backgroundColor='white';

    ClearMarkers();
      
  if (cycleSEL == 1){  
    if (commit != 0){
      UpdateMapById("committee_data","COMMITTEE");
    }
    if (cand != 0){
      UpdateMapById("candidate_data","CANDIDATE");
    }
    if (indiv != 0){
      UpdateMapById("individual_data", "INDIVIDUAL");
    }
  }
    if (opin != 0){
      UpdateMapById("opinion_data","OPINION");
    }


    color.innerHTML="Ready";
    
    if (Math.random()>0.5) { 
	color.style.backgroundColor='blue';
    } else {
	color.style.backgroundColor='red';
    }

}

function NewData(data)
{
  var target = document.getElementById("data");
  
  target.innerHTML = data;

  UpdateMap();

}

function ViewShift()
{
    var bounds = map.getBounds();

    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();

    var color = document.getElementById("color");

    color.innerHTML="<b><blink>Querying...("+ne.lat()+","+ne.lng()+") to ("+sw.lat()+","+sw.lng()+")</blink></b>";
    color.style.backgroundColor='white';

    var what = checkBoxWhat();
    var cycleList = cycleCheckBox();
    // debug status flows through by cookie
    $.get("rwb.pl?act=near&latne="+ne.lat()+"&longne="+ne.lng()+"&latsw="+sw.lat()+"&longsw="+sw.lng()+"&format=raw&what="+what+"&cycle="+cycleList, NewData);
}


function Reposition(pos)
{
    var lat=pos.coords.latitude;
    var long=pos.coords.longitude;
    
      var div = document.getElementById("lat");
      var inputs = "<input type='text' name='lat' value='50'>";
      if (div){
	  div.innerHTML = div.innerHTML + inputs;
      }

    map.setCenter(new google.maps.LatLng(lat,long));
    usermark.setPosition(new google.maps.LatLng(lat,long));
}


function Start(location) 
{
  var lat = location.coords.latitude;
  var long = location.coords.longitude;
  var acc = location.coords.accuracy;
  


  var mapc = $( "#map");

  map = new google.maps.Map(mapc[0], 
			    { zoom:16, 
				center:new google.maps.LatLng(lat,long),
				mapTypeId: google.maps.MapTypeId.HYBRID
				} );

  usermark = new google.maps.Marker({ map:map,
					    position: new google.maps.LatLng(lat,long),
					    title: "You are here"});

  markers = new Array;

  var color = document.getElementById("color");
  color.style.backgroundColor='white';
  color.innerHTML="<b><blink>Waiting for first position</blink></b>";
  google.maps.event.addListener(map,"bounds_changed",ViewShift);
  google.maps.event.addListener(map,"center_changed",ViewShift);
  google.maps.event.addListener(map,"zoom_changed",ViewShift);

  navigator.geolocation.watchPosition(Reposition);

}



//checks to see what checkboxs of types of organizations gave money are checked
function checkBoxWhat(){
  var what = null;
  if(document.getElementById("commit").checked){
    what = document.getElementById("commit").value;
    commit = 1;
  }
  else{ commit = 0;
  }
  
  if(document.getElementById("cand").checked){
    cand = 1;
    if (what != null){
	what = what.concat(",",document.getElementById("cand").value);
    }
    else{
	what = document.getElementById("cand").value;
    }
  }
  else{ cand = 0;
  }
  
  if(document.getElementById("indiv").checked){
    indiv = 1;
    if (what != null){
	what = what.concat(",",document.getElementById("indiv").value);
    }
    else{
	what = document.getElementById("indiv").value;
    }
  }
  else{ indiv = 0;
  }

  if(document.getElementById("opin").checked){
    opin = 1;
    if (what != null){
	what = what.concat(",",document.getElementById("opin").value);
    }
    else{
	what = document.getElementById("opin").value;
    }
  }
  else{ opin = 0;
  }

  return what;
}


function cycleCheckBox(){
  var cycleList = null;
  var cycles = document.getElementsByClassName("cycle")
  for(var i = 0; i < cycles.length; i++){
    if(cycles[i].checked){
      if (cycleList != null){
	cycleList = cycleList.concat(",",cycles[i].value);
      }
      else{
	  cycleList = cycles[i].value;
      }
    cycleSEL = 1;
    }
  }
  if (cycleList == null){
    cycleSEL = 0;
  }
  return cycleList;
}