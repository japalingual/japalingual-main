/** @jsx React.DOM */

define(
  [
    'react',
    'fluxxor',
    'baseLoader',
    'jsx!video-playback/youtube-video-component',
    'jsx!video-playback/youtube-line-display-component'
  ],
  function(
    React,
    Fluxxor,
    initializationData,
    YoutubeVideoComponent,
    YoutubeLineDisplayComponent
  ) {

    var ReactPropTypes = React.PropTypes;

    var FluxMixin = Fluxxor.FluxMixin(React);
    var VideoPlaybackApplication = React.createClass({
      mixins: [FluxMixin],

      propTypes: {
        flux: ReactPropTypes.object
      },

      render: function () {
        return (
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-6'>
                <h2>The Youtube Video</h2>
                <YoutubeVideoComponent
                  videoId={ initializationData.videoId }
                />
              </div>
              <div className='col-md-6'>
                <YoutubeLineDisplayComponent />
              </div>
            </div>
          </div>
        );
      }
    });

    return VideoPlaybackApplication;
  }
)