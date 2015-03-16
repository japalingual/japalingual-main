// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//

define(
  [
    'jquery',
    'bootstrap',
    'libs/youtube-loader'
  ],
  function(
    $,
    bootstrap,
    youtubeLoader
  ) {
    var ytPlayer = null;

    var onPlayerReady = function() {
      console.log('Player Ready');
      ytPlayer.playVideo();
    };

    var intervalIsRunning = false;
    var onPlayerStateChange = function(event) {
      console.log('Player State Changed');
      if (!intervalIsRunning && event.data === 1) {
        window.setInterval(function() {
          $('p.video-seconds').text(ytPlayer.getCurrentTime());
          intervalIsRunning = true;
        }, 250);
      }
    };

    var eventListeners = {
      'onReady' : onPlayerReady,
      'onStateChange' : onPlayerStateChange
    };

    var ytPlayerOptions = {
      videoId: 'P-8mBmF_ZBs',
      width: 356,
      height: 200,
      // For a list of all parameters, see:
      // https://developers.google.com/youtube/player_parameters
      playerVars: {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      },
      events: eventListeners
    };

    youtubeLoader.init(
      $('div#video-container')[0],
      ytPlayerOptions
    ).done(function(player) {
        ytPlayer = player;
    });
  }
);
