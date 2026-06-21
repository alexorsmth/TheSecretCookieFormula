class AddMoreIngredientsToRecipes < ActiveRecord::Migration[8.1]
  def change
    add_column :recipes, :brown_sugar, :integer
    add_column :recipes, :baking_soda, :integer
    add_column :recipes, :chocolate_chips, :integer
    add_column :recipes, :vanilla, :integer
  end
end
