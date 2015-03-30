Rails.application.routes.draw do
  get 'videoviewer/view/:id', to: 'video_viewer#view'

  root to: 'visitors#index'
end
