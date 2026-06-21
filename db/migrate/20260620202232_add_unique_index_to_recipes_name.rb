class AddUniqueIndexToRecipesName < ActiveRecord::Migration[8.1]
  def change
    add_index :recipes, :name, unique: true
  end
end