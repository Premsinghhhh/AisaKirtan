function audioPlayer() {
  var currentSong = 0;
  $("#audioPlayer")[0].src = $("#playlist li a")[0];
  $("#audioPlayer")[0].play();
  $("#playlist li a").click(function(e) {
    e.preventDefault();
    $("#audioPlayer")[0].src = this;
    $("#audioPlayer")[0].play();
    $("#playlist li").removeClass("current-song");
    currentSong = $(this).parent().index();
    $(this).parent().addClass("current-song");
    /* console.log(currentSong) */
    const ulElement = document.getElementById("playlist")
    const theTrackPlaying = ulElement.getElementsByTagName("li")[currentSong].innerText
    
    const header = document.getElementsByClassName("main-title m-5")[0]
    const h2 = header.getElementsByTagName('h2') //there should only be 1 h2 in Header. No More //there should only be 1 h2 in Header. No More
    if(h2.length === 0){
      const h2ForTrackName = document.createElement('h2');
      h2ForTrackName.innerText = theTrackPlaying
      header.appendChild(h2ForTrackName)
    }else{
      h2[0].innerText = theTrackPlaying
    }
  });

  $("#audioPlayer")[0].addEventListener("ended", function() {
    currentSong++;
    if (currentSong == $("#playlist li a").length)
      currentSong = 0;
    $("#playlist li").removeClass("current-song");
    $("#playlist li:eq(" + currentSong + ")").addClass("current-song");
    $("#audioPlayer")[0].src = $("#playlist li a")[currentSong].href;
    $("#audioPlayer")[0].play();
  });
  const audio = document.querySelector('#audioPlayer');
  audio.controls = true;
}
