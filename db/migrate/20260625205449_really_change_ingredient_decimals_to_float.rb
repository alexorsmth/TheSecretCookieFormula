class ReallyChangeIngredientDecimalsToFloat < ActiveRecord::Migration[8.1]
  def change
    change_column :recipes, :salt, :float
    change_column :recipes, :baking_soda, :float
    change_column :recipes, :chocolate_chips, :float
    change_column :recipes, :vanilla, :float
  end
end