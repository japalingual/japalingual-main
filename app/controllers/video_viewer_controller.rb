class VideoViewerController < ApplicationController
  def view
    @video_id = params[:id]
    files = Dir.glob("#{Rails.root}/app/views/video_viewer/lessons/**/*")

    @linesData = File.read(files[0]).gsub("\n", '').squeeze(' ')
  end
end
