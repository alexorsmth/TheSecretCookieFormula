class CreateRecipes < ActiveRecord::Migration[8.1]
  def change
    create_table :recipes do |t|
      t.string :name
      t.integer :flour
      t.integer :sugar
      t.integer :butter
      t.integer :eggs
      t.integer :salt
      t.text :result

      t.timestamps
    end
  end
end
