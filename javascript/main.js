


var UI = {};
 
UI.enterPress = function() {

    document.querySelector('.input-search').addEventListener("keyup", function(e){
      
      if (e.which === 13) {
          
          var input = document.querySelector("input").value;

          SoundCloudAPI.init();
          SoundCloudAPI.getTrack(input);
      }
        
    });
}

 

UI.submitClick = function() {
  
    document.querySelector('.js-submit').addEventListener("click", function(){
    
  
       var input = document.querySelector("input").value;


     
          SoundCloudAPI.init(input);
          SoundCloudAPI.getTrack(input); // retrieves and renders tracks
         
   });  
}

// Creating a custom object to namespace our code 
var SoundCloudAPI = {};

SoundCloudAPI.init = function(input) {

  //  Soundcloud API init:
  SC.initialize({
         client_id: '195d273fb18f4a9a75ebda65c1aa2631'
     });
  }

   // get tracks from search input
   SoundCloudAPI.getTrack = function(input) {
      SC.get('/tracks', {
         q: input  
      }).then(function(tracks) { // promise
         SoundCloudAPI.renderTracks(tracks); // render tracks on page
      });
   }
  
// loop through each track and add HTML 'card' element to each   
SoundCloudAPI.renderTracks = function(tracks) {
  
     tracks.forEach(function(track) {
    
        var card = document.createElement('div');
        card.classList.add("card");
  
        var imageDIV = document.createElement("div");
        imageDIV.classList.add("image");
  
        var image_img = document.createElement('img');
        image_img.classList.add("image_img");
        // use random image if not available (null)
        image_img.src = track.artwork_url || 'http://placehold.it/200x200'; 
        imageDIV.appendChild(image_img);
     
        //content
        var content = document.createElement("div");
        content.classList.add("content");
  
        var header = document.createElement("div");
        header.classList.add("header");
        header.innerHTML = "<a href=\" +  track.permalink_url +\" target=\"_blank\">" + track.title + "</a>";
  
        //button 
        var button = document.createElement("div");
        button.classList.add("ui", "bottom", "attached", "button", "js-button");
  
        //add event to button
        button.addEventListener("click",function() {
          SoundCloudAPI.getEmbed(track.permalink_url); // passing in the url of the track to play
        });
    
        var icon = document.createElement("i");
        icon.classList.add("add", "icon");
  
        var buttonText = document.createElement("span");
        buttonText.innerHTML = "Add to playlist";

        //add event to the image
         var image_img = document.createElement('img');

  
        //appendChild  
        content.appendChild(header);
        button.appendChild(icon);
        button.appendChild(buttonText);
        card.appendChild(imageDIV);
        card.appendChild(content);
        card.appendChild(button);
  
        var searchResults = document.querySelector(".js-search-results");
        searchResults.appendChild(card);
    
     });
};

SoundCloudAPI.getEmbed = function(url) {
  
  /* embeding player:
     https://developers.soundcloud.com/docs/api/guide#playing
  */
  
   SC.oEmbed(url,{
      auto_play:true
   }).then(function(embed) {
       
      // creating a sidebar to add elements (box) for playlist
     
       var sidebar = document.querySelector(".inner");
     
       var box = document.createElement("div");
       box.innerHTML = embed.html;
       
       // inserting at the top (before current one)                                
       sideBar.insertBefore(box, sideBar.firstChild);
     
       // storing playlist in localstorage
       localStorage.setItem("key",sideBar.innerHTML);
   });
}

UI.enterPress();
UI.submitClick();

// retrieving sidebar on new browser session
var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("key");


//clearing storage


