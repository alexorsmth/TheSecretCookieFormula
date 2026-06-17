class RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show update destroy]

  def index
    recipes = Recipe.all.order(created_at: :desc)
    render json: recipes
  end

  def show
    render json: @recipe
  end

  def create
    recipe = Recipe.new(recipe_params)

    if recipe.save
      render json: recipe, status: :created
    else
      render json: recipe.errors, status: :unprocessable_entity
    end
  end

  def update
    if @recipe.update(recipe_params)
      render json: @recipe
    else
      render json: @recipe.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @recipe.destroy
    head :no_content
  end

  private

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  def recipe_params
    params.require(:recipe).permit(:name, :flour, :sugar, :butter, :eggs, :salt)
  end
end