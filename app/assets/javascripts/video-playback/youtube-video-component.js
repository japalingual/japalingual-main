/** @jsx React.DOM */
define(
  [
    'react',
    'fluxxor',
    'libs/youtube-loader'
  ],
  function(
    React,
    Fluxxor,
    youtubeLoader
  ) {

    // attach a youtube player to a div
    function attachYoutubePlayer(youtubeContainer, videoId, actionReporter) {
      var ytPlayer = null;

      var onPlayerReady = function() {
        ytPlayer.playVideo();

        // report the current time every 250ms
        window.setInterval(function() {
          actionReporter.reportCurrentTick(
            ytPlayer.getCurrentTime()
          );
        }, 250);
      };

      var onPlayerStateChange = function() {
        console.log('Player State Changed');
      };

      var eventListeners = {
        'onReady' : onPlayerReady,
        'onStateChange' : onPlayerStateChange
      };

      var ytPlayerOptions = {
        videoId: videoId,
        width: '480',
        height: '270',
        // For a list of all parameters, see:
        // https://developers.google.com/youtube/player_parameters
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          fs: 0
        },
        events: eventListeners
      };

      youtubeLoader.init(
        youtubeContainer,
        ytPlayerOptions
      ).done(function(player) {
        ytPlayer = player;
      });
    }

    var ReactPropTypes = React.PropTypes;
    var FluxMixin = Fluxxor.FluxMixin(React);

    var youtubeVideoComponentCount = 0;
    var YoutubeVideoComponent = React.createClass({
      mixins: [FluxMixin],

      propTypes: {
        videoId: ReactPropTypes.string
      },

      getInitialState: function() {
        return {
          id: youtubeVideoComponentCount++
        };
      },

      render: function() {
        return (
          <div
            id={ 'youtube-video-container-' + this.state.id }
            ref='youtubeVideoContainer'
          >
          </div>
        );
      },

      componentDidMount: function() {
        var youtubeContainer = this.refs.youtubeVideoContainer.getDOMNode();

        attachYoutubePlayer(
          youtubeContainer,
          this.props.videoId,
          this.getFlux().actions.youtubePlayer
        );
      },

      componentWillUnmount: function() {
        // TODO: cleanup youtube stuff. Should
        // not really be necessary since this application
        // should take up the whole page.
      }
    });

    return YoutubeVideoComponent;
  }
)