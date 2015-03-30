define(
  [
    'fluxxor',
    'video-playback/flux-app/youtube-player-actions',
    'video-playback/flux-app/youtube-player-store',
  ],
  function(
    Fluxxor,
    YoutubePlayerActions,
    YoutubePlayerStores
  ) {
    var youtubeFluxDispatcher = new Fluxxor.Flux();

    youtubeFluxDispatcher.addStore(
      'YoutubePlayerStore',
      YoutubePlayerStores
    );

    youtubeFluxDispatcher.addActions(YoutubePlayerActions);

    return youtubeFluxDispatcher;
  }
);