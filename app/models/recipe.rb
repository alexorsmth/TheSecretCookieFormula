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
    messages << "WAY TOO MUCH FLOUR: The cookie will dry out and it'll stay more firm.."
  elsif ratio_of(:flour) < 0.8
    messages << "REDUCED FLOUR: Cookie might spread out more and itll hold up less."
  end

  if ratio_of(:sugar) > 1.2
    messages << "MORE WHITE SUGAR THAN NORMAL: The cookie will get sweeter, and crispier."
  elsif ratio_of(:sugar) < 0.8
    messages << "LESS WHITE SUGAR THAN NORMAL: the cookie may be less sweet and less crisp."
  end

  if ratio_of(:brown_sugar) > 1.2
    messages << "MORE BROWN SUGAR: the cookie may become softer, chewier, and more moist."
  elsif ratio_of(:brown_sugar) < 0.8
    messages << "REDUCED BROWN SUGAR: the cookie may be less chewy."
  end

  if ratio_of(:butter) > 1.2
    messages << "LOTSA BUTTER: the cookie may spread out more and be way more rich."
  elsif ratio_of(:butter) < 0.8
    messages << "REDUCED BUTTER: Cookie is gonna be way drier and spread less."
  end

  if eggs.to_f > BASE_RECIPE[:eggs]
    messages << "HELLA EGGS: Cookie is gonna morph into a cake."
  elsif eggs.to_f < BASE_RECIPE[:eggs]
    messages << "LESS EGGS THAN NORMAL: the structure of the cookie is gonna start crumbling."
  end

  if ratio_of(:salt) > 1.5
    messages << "EXCESS SALT: Believe it or not its gonna get saltier."
  elsif salt.to_f == 0
    messages << "NO SALT: The cookie wont taste like much/you need more salt."
  end

  if ratio_of(:baking_soda) > 1.5
    messages << "EXTRA BAKING SODA: Could taste more bitter but itll spread out a bit more."
  elsif baking_soda.to_f == 0
    messages << "NO BAKING SODA: Cookies gonna spread way less."
  end

  if ratio_of(:chocolate_chips) > 1.3
    messages << "LOTSA CHOCOLATE CHIPS: BIGGER COOKIES."
  elsif ratio_of(:chocolate_chips) < 0.5
      messages << "LESS CHOCOCHIPS: boring cookie..."
  end

  if ratio_of(:vanilla) > 1.5
    messages << "LOTSA VANILLA: the cookie may have a stronger vanilla aroma."
  elsif vanilla.to_f == 0
    messages << "NO VANILLA: the cookie may taste less aromatic."
  end

  self.result = messages.any? ? messages.join(" ") : "you didn't really change much."
end

def ratio_of(ingredient)
  current_value = self[ingredient].to_f
  base_value = BASE_RECIPE[ingredient]

  return 0 if base_value == 0

  current_value / base_value
end
end