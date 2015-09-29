DM.init({apiKey: '62117ad7fd0879e818d43e2579dd8d3b71c6ab84'});
mainGlobalVideoPlayer = null;
currentSoundcloudSong = null;
var myVar = null;
//mainGlobalVideoPlayer.addEventListener('play', onMainPlayerStart, false);

// var widgetIframe = document.getElementById('putTheWidgetHere'),
//     widget       = SC.Widget(widgetIframe);

// widget.bind(SC.Widget.Events.READY, function() {
//   widget.bind(SC.Widget.Events.PLAY, function() {
//     // get information about currently playing sound
//     widget.getCurrentSound(function(currentSound) {
//       console.log('sound ' + currentSound.get('') + 'began to play');
//     });
//   });
//   // get current level of volume
//   widget.getVolume(function(volume) {
//     console.log('current volume value is ' + volume);
//   });
//   // set new volume level
//   widget.setVolume(50);
//   // get the value of the current position
// });

function onMainPlayerStart() {
	if (currentSoundcloudSong != null) {
		currentSoundcloudSong.pause();
	}
}

function openNewWindow()
{
	window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
	return false;
}