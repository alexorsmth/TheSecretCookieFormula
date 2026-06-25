# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_06_25_205449) do
  create_table "recipes", force: :cascade do |t|
    t.float "baking_soda"
    t.integer "brown_sugar"
    t.integer "butter"
    t.float "chocolate_chips"
    t.datetime "created_at", null: false
    t.integer "eggs"
    t.integer "flour"
    t.string "name"
    t.text "result"
    t.float "salt"
    t.integer "sugar"
    t.datetime "updated_at", null: false
    t.float "vanilla"
    t.index ["name"], name: "index_recipes_on_name", unique: true
  end
end
