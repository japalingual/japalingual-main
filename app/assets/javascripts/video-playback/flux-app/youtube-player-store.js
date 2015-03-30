define(
  [
    'fluxxor',
    'baseLoader',
    'video-playback/flux-app/youtube-constants'
  ],
  function(
    Fluxxor,
    initializationData,
    youtubeConstants
  ) {
    var YoutubePlayerStore = Fluxxor.createStore({
      initialize: function() {
        // number of elapsed milliseconds in the youtube video
        this.currentTick = 0;

        // the lines data
        this.linesData = initializationData.linesData;

        this.bindActions(
          youtubeConstants.youtubePlayer.YOUTUBE_TICK_UPDATE, this.youtubeTickUpdate
        );
      },

      youtubeTickUpdate: function(payload) {
        this.currentTick = payload.currentTick;
        this.emit("change");
      },

      getState: function() {
        return {
          currentTick: this.currentTick,
          linesData: this.linesData
        };
      }
    });

    // singleton for now
    return new YoutubePlayerStore();
  }
);