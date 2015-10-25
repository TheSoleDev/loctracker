document.addEventListener('deviceready', function () {
    // Android customization
    cordova.plugins.backgroundMode.setDefaults({ text:'I will run in background to wake you.'});
    // Enable background mode
    cordova.plugins.backgroundMode.enable();

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {
        setTimeout(function () {
            // Modify the currently displayed notification
            cordova.plugins.backgroundMode.configure({
                text:'Running in background now.'
            });
        }, 5000);
    }
}, false);


$( document ).on( "pagebeforeshow", "#map-screen", function() {
      
    if(localStorage.getItem("setting-radius") === null)
    {  
        localStorage.setItem("setting-radius", '100'); 
        localStorage.setItem("setting-vibrate", '5'); 
    }

    getCurrentLoc();
    $('.stopTrack').hide();

});

$('#map-screen').on('click','.startTrack',function(e) { 

     timer = setInterval(function(){
                    getCurrentLoc();
                    //console.log(localStorage.getItem("currentLong"));
            },1000);

    $('.startTrack').hide();
    $('.stopTrack').show();
});

$('#map-screen').on('click','.stopTrack',function(e) { 
    $('.startTrack').show();

    clearInterval(timer);
    $('.stopTrack').hide();
});



$('#map-screen').on('click','.showAll',function(e) { 
    localStorage.removeItem('selected-branch');
    window.location = "map.html";
});

$('#map-screen').on('click','.btn-back',function(e) { 
    
    var backLink = 'index.html';
    if(localStorage.getItem("reference-page") != null)
    {    
        backLink = localStorage.getItem("reference-page");
        localStorage.removeItem('reference-page');
    }
    window.location = backLink;
});
