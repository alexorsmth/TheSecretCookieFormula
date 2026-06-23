class Recipe < ApplicationRecord
  validates :name, presence: true, uniqueness: {case_sensitive: false}
  before_save :analyze_cookie

    BASE_RECIPE = {
  flour: 191.0,
  sugar: 100.0,
  brown_sugar: 50.0,
  butter: 113.0,
  eggs: 1.0,
  salt: 0.5,
  baking_soda: 0.5,
  chocolate_chips: 0.75,
  vanilla: 1.0
}
  def analyze_cookie
  messages = []

  if ratio_of(:flour) > 1.2
    messages << "More flour than the base recipe: the cookie may become thicker, drier, and less spread out."
  elsif ratio_of(:flour) < 0.8
    messages << "Less flour than the base recipe: the cookie may spread more and turn out thinner."
  end

  if ratio_of(:sugar) > 1.2
    messages << "More white sugar than the base recipe: the cookie may become sweeter, crispier, and brown faster."
  elsif ratio_of(:sugar) < 0.8
    messages << "Less white sugar than the base recipe: the cookie may be less sweet and less crisp."
  end

  if ratio_of(:brown_sugar) > 1.2
    messages << "More brown sugar than the base recipe: the cookie may become softer, chewier, and more moist."
  elsif ratio_of(:brown_sugar) < 0.8
    messages << "Less brown sugar than the base recipe: the cookie may be less chewy."
  end

  if ratio_of(:butter) > 1.2
    messages << "More butter than the base recipe: the cookie may spread more and taste richer."
  elsif ratio_of(:butter) < 0.8
    messages << "Less butter than the base recipe: the cookie may be drier and less rich."
  end

  if eggs.to_f > BASE_RECIPE[:eggs]
    messages << "More egg than the base recipe: the cookie may become cakier."
  elsif eggs.to_f < BASE_RECIPE[:eggs]
    messages << "Less egg than the base recipe: the cookie may bind less and become more crumbly."
  end

  if ratio_of(:salt) > 1.5
    messages << "More salt than the base recipe: the cookie may taste saltier and have a stronger contrast."
  elsif salt.to_f == 0
    messages << "No salt: the cookie may taste flatter and less balanced."
  end

  if ratio_of(:baking_soda) > 1.5
    messages << "More baking soda than the base recipe: the cookie may spread more and could taste slightly bitter."
  elsif baking_soda.to_f == 0
    messages << "No baking soda: the cookie may spread less and brown less."
  end

  if ratio_of(:chocolate_chips) > 1.3
    messages << "More chocolate chips than the base recipe: the cookie may be chunkier and sweeter."
  elsif ratio_of(:chocolate_chips) < 0.5
    messages << "Fewer chocolate chips than the base recipe: the cookie may taste more plain."
  end

  if ratio_of(:vanilla) > 1.5
    messages << "More vanilla than the base recipe: the cookie may have a stronger vanilla aroma."
  elsif vanilla.to_f == 0
    messages << "No vanilla: the cookie may taste less aromatic."
  end

  self.result = messages.any? ? messages.join(" ") : "This is close to the original soft and chewy cookie formula."
end

def ratio_of(ingredient)
  current_value = self[ingredient].to_f
  base_value = BASE_RECIPE[ingredient]

  return 0 if base_value == 0

  current_value / base_value
end
end