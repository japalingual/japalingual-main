Rails.application.routes.draw do
  get 'tinypass/test'

  root to: 'visitors#index'
end
