/** @jsx React.DOM */
define(
  [
    'react',
    'fluxxor',
    'underscore'
  ],
  function(
    React,
    Fluxxor,
    _
  ) {

    var FluxMixin = Fluxxor.FluxMixin(React);
    var StoreWatchMixin = Fluxxor.StoreWatchMixin;

    var YoutubeLineDisplayComponent = React.createClass({
      mixins: [FluxMixin, StoreWatchMixin('YoutubePlayerStore')],

      getInitialState: function() {
        return { };
      },

      getStateFromFlux: function() {
        var flux = this.getFlux();

        return flux.store('YoutubePlayerStore').getState();
      },

      getParagraphFromLineData: function(lineData, index) {
        // determine if we should highlight the current line. Only
        // do so if the currentTick is between the start and end timestamps
        var currentTick = this.state.currentTick;
        var highlightCurrentLine = lineData.start <= currentTick && lineData.end > currentTick;
        return (
          <p
            key={ index }
            style={
              highlightCurrentLine ? {color: 'red'} : {}
            }
          >
            { lineData.text }
          </p>
        );
      },

      render: function() {
        var self = this;
        return (
          <div>
            <h3>
              { 'Time: ' + this.state.currentTick + ' seconds' }
            </h3>
            {
              _.map(this.state.linesData, function(lineData, index) {
                return self.getParagraphFromLineData(lineData, index);
              })
            }
          </div>
        );
      }
    });

    return YoutubeLineDisplayComponent;
  }
)
