/**
 * This module uses global declared functions to communicate with the youtube api (iframe)
 * Communication to parent (implementation) modules is done with jquery trigger.
 *
 *  basic exsample:
 *  <div class="video-wrapper">
 *      <div id="unique-id-here"
 *      </div>
 *  </div>
 *
 *  <script>
 *  require([myweb/youtubePlayer], function (player) {
 *
 *      player.init(document.getElementById("unique-id-here"),{
 *          videoId : 'OdLfMqoMOqw'
 *      });
 *
 *  });
 *
 *  More details to be found at www.semantize.nl/wrappingyoutube/
 *
 */

define(['jquery'], function ($) {

  var playerAPIReady = false;
  var playerqueue = [];

  /**
   * These scoped globals will contain the global functions called by the youtube api.
   */
  window.youtubePlayer = {};
  window.youtubePlayer.onYPReady = {};
  window.youtubePlayer.onYPStateChange = {};

  /**
   * Load the youtube Iframeapi into the dom.
   */
  var tag = document.createElement('script');
  tag.src = "//www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  /**
   * Will let the module know that the youtube api is loaded an ready to go.
   */
  window.onYouTubeIframeAPIReady = function () {
    playerAPIReady = true;
    if (playerqueue.length !== 0) {
      _resolveQue();
    }
  };
  /**
   * Will resolve player requests that could not be created (Iframeapi was not ready).
   */
  var _resolveQue = function () {
    var i = 0;
    for (i; i <= playerqueue.length; i++) {
      new YoutubePlayer(
        playerqueue[0].deferred,
        playerqueue[0].elm,
        playerqueue[0].options
      );
      playerqueue.shift();
    }
  };

  /**
   * @alias module:youtube player Module
   * @class YoutubePlayer
   * @constructor
   * @param {Object} jquery elm
   * @param {Object} [options]
   */
  var YoutubePlayer =  function (deferred, elm, options) {

    var _startNewPlayer = function () {
      var playerAPI = new YT.Player(elm.id, options);
      return playerAPI;
    };


    var init = function () {
      var player = _startNewPlayer();

      // resolve the deferred with the player
      deferred.resolve(player);
    }();
  };



  /**
   * Factory method
   * @param {DOM Object} elm
   * @param {Object} [options]
   */
  var init = function (elm, options) {
    var initDeferred = $.Deferred();

    if (playerAPIReady) {
      new YoutubePlayer(initDeferred, elm, options);
    } else {
      playerqueue.push({ deferred: initDeferred, elm: elm, options: options });
    }

    // return the promise so that the consumer cannot resolve anything
    return initDeferred.promise();
  };

  /**
   * Module API
   * @public
   * @return {Object}
   */
  return {
    init: init
  }

});