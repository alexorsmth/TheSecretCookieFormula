class AddMoreIngredientsToRecipes < ActiveRecord::Migration[8.1]
  def change
    add_column :recipes, :brown_sugar, :float
    add_column :recipes, :baking_soda, :float
    add_column :recipes, :chocolate_chips, :float
    add_column :recipes, :vanilla, :float
  end
end
