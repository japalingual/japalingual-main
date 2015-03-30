define(
  [
    'video-playback/flux-app/youtube-constants'
  ],
  function(
    youtubeConstants
  ) {
    var youtubePlayerActions = {
      youtubePlayer: {
        reportCurrentTick: function(currentTick) {
          this.dispatch(
            youtubeConstants.youtubePlayer.YOUTUBE_TICK_UPDATE,
            {
              currentTick: currentTick
            }
          );
        }
      }
    };

    return youtubePlayerActions;
  }
)