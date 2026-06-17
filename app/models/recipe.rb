class Recipe < ApplicationRecord
  before_save :analyze_cookie

  def analyze_cookie
    messages = []

    if flour < 100
      messages << "Too little flour: the cookie may spread too much and turn out thin."
    elsif flour > 300
      messages << "Too much flour: the cookie may turn out dry or dense."
    end

    if sugar > 200
      messages << "High sugar: the cookie may be sweeter, crispier, and brown faster."
    elsif sugar < 50
      messages << "Low sugar: the cookie may be less sweet and less tender."
    end

    if butter > 200
      messages << "High butter: the cookie may spread more and taste richer."
    elsif butter < 50
      messages << "Low butter: the cookie may be drier and less rich."
    end

    if eggs > 2
      messages << "More eggs: the cookie may become cakier."
    elsif eggs == 0
      messages << "No eggs: the cookie may not bind together as well."
    end

    if salt > 10
      messages << "Too much salt: the cookie may taste overly salty."
    end

    self.result = messages.any? ? messages.join(" ") : "This looks like a balanced cookie formula."
  end
end