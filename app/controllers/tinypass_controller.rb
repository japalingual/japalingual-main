require 'tinypass'

# these are sandbox values by default
Tinypass.sandbox = true
Tinypass.aid = 'yQcKjJ3iYv'
Tinypass.private_key = 'jawYr8uPtQKpPfo4wFVchKEPgAuFnVw57VcUpwXA'

class TinypassController < ApplicationController
  def test
    rid = "MEMBERSHIP"
    store = Tinypass::AccessTokenStore.new
    store.load_tokens_from_cookie(cookies)

    details = Tinypass.fetch_access_details(Hash.new)

    puts details
    if store.get_access_token(rid).access_granted?
      puts 'Access Granted!'
    else
      # Forward the user to a buy page (or a way to call the buyNow javascript method below)
      resource = Tinypass::Resource.new(rid, 'Site wide premium content access')

      po1 = Tinypass::PriceOption.new('.50', '24 hours')
      po2 = Tinypass::PriceOption.new('.99', '1 week')
      offer = Tinypass::Offer.new(resource, po1, po2)

      purchase_request = Tinypass::PurchaseRequest.new(offer)
      button_html = purchase_request.generate_tag
      puts 'something'
    end
  end
end
