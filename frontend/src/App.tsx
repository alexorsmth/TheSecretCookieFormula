import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "./App.css";

type Recipe = {
  id: number;
  name: string;
  flour: number;
  sugar: number;
  brown_sugar: number;
  butter: number;
  eggs: number;
  salt: number;
  baking_soda: number;
  chocolate_chips: number;
  vanilla: number;
  result: string;
};

type RecipeForm = {
  name: string;
  flour: string;
  sugar: string;
  brown_sugar: string;
  butter: string;
  eggs: string;
  salt: string;
  baking_soda: string;
  chocolate_chips: string;
  vanilla: string;
};

const BASE_RECIPE: RecipeForm = {
  name: "Soft and Chewy Cookies",
  flour: "191",
  sugar: "100",
  brown_sugar: "50",
  butter: "113",
  eggs: "1",
  salt: "0.5",
  baking_soda: "0.5",
  chocolate_chips: "0.75",
  vanilla: "1",
};

const ingredientSliders = [
  { key: "flour", label: "Flour", unit: "g", min: 140, max: 250, step: 1 },
  { key: "sugar", label: "White Sugar", unit: "g", min: 50, max: 160, step: 1 },
  { key: "brown_sugar", label: "Brown Sugar", unit: "g", min: 25, max: 120, step: 1 },
  { key: "butter", label: "Butter", unit: "g", min: 70, max: 170, step: 1 },
  { key: "eggs", label: "Eggs", unit: "", min: 0, max: 3, step: 1 },
  { key: "salt", label: "Salt", unit: "tsp", min: 0, max: 2, step: 0.25 },
  { key: "baking_soda", label: "Baking Soda", unit: "tsp", min: 0, max: 2, step: 0.25 },
  { key: "chocolate_chips", label: "Chocolate Chips", unit: "cups", min: 0, max: 2, step: 0.25 },
  { key: "vanilla", label: "Vanilla", unit: "tsp", min: 0, max: 3, step: 0.25 },
] as const;

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [form, setForm] = useState<RecipeForm>(BASE_RECIPE);

  useEffect(() => {
    fetchRecipes();
  }, []);

  function fetchRecipes() {
    fetch("http://localhost:3000/recipes")
      .then((res) => res.json())
      .then((data: Recipe[]) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }

  function deleteRecipe(id: number) {
    const confirmDelete = window.confirm("Delete this recipe?");

    if (!confirmDelete) {
      return;
    }

    fetch(`http://localhost:3000/recipes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          alert("Something went wrong while deleting the recipe");
          return;
        }

        fetchRecipes();
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
        alert("Could not connect to the backend");
      });
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      name: event.target.value,
    });
  }

  function handleSliderChange(name: keyof RecipeForm, value: number) {
    setForm({
      ...form,
      [name]: String(value),
    });
  }

  function loadRecipeIntoForm(recipe: Recipe) {
    setForm({
      name: recipe.name,
      flour: String(recipe.flour ?? ""),
      sugar: String(recipe.sugar ?? ""),
      brown_sugar: String(recipe.brown_sugar ?? ""),
      butter: String(recipe.butter ?? ""),
      eggs: String(recipe.eggs ?? ""),
      salt: String(recipe.salt ?? ""),
      baking_soda: String(recipe.baking_soda ?? ""),
      chocolate_chips: String(recipe.chocolate_chips ?? ""),
      vanilla: String(recipe.vanilla ?? ""),
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const recipeData = {
      name: form.name,
      flour: Number(form.flour),
      sugar: Number(form.sugar),
      brown_sugar: Number(form.brown_sugar),
      butter: Number(form.butter),
      eggs: Number(form.eggs),
      salt: Number(form.salt),
      baking_soda: Number(form.baking_soda),
      chocolate_chips: Number(form.chocolate_chips),
      vanilla: Number(form.vanilla),
    };

    fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe: recipeData }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          if (data.name) {
            alert("Recipe already created");
          } else {
            alert("Something went wrong while saving the recipe");
          }

          return;
        }

        setForm(BASE_RECIPE);
        fetchRecipes();
      })
      .catch((error) => {
        console.error("Error saving recipe:", error);
        alert("Could not connect to the backend");
      });
  }

  return (
    <main className="page">
      <Typography variant="h2" component="h1" sx={{ fontFamily: "KiwiSoda, Courier New, monospace", mb: 3, color: "black", backgroundColor: "brown", border: "3px solid black", borderRadius: "12px", display: "inline-block", boxShadow: "0 6px 14px rgba(0, 0, 0, 0.25)" }}>
        Cookie Formula Lab
      </Typography>

      <form onSubmit={handleSubmit}>
        <Card className="card">
          <CardContent>
            <Stack spacing={3}>
              <Typography variant="h5" sx={{ fontFamily: "KiwiSoda, Courier New, monospace" }}>
                Adjust the soft and chewy recipe for a dozen cookies!
              </Typography>

              <TextField
                name="name"
                label="Recipe name"
                value={form.name}
                onChange={handleNameChange}
                fullWidth
                sx={{
                  "& .MuiInputBase-input": {
                    fontFamily: "KiwiSoda, Courier New, monospace",
                    fontSize: "1.2rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontFamily: "KiwiSoda, Courier New, monospace",
                  },
                }}
              />

              {ingredientSliders.map((ingredient) => (
                <div key={ingredient.key}>
                  <Typography sx={{
                    fontFamily: "KiwiSoda, Arial, sans-serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                  }}>
                    {ingredient.label}: {form[ingredient.key]} {ingredient.unit}
                  </Typography>

                  <Slider
                    value={Number(form[ingredient.key])}
                    min={ingredient.min}
                    max={ingredient.max}
                    step={ingredient.step}
                    onChange={(_, value) =>
                      handleSliderChange(ingredient.key, value as number)
                    }
                  />
                </div>
              ))}

              <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                <Button type="submit" variant="contained" sx={{
                  fontFamily: "KiwiSoda, Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}>
                  Analyze Cookie
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => setForm(BASE_RECIPE)}
                  sx={{
                    fontFamily: "KiwiSoda, Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  Reset to Base Recipe
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </form>

      <section>
        <Typography variant="h4" component="h2" sx={{ fontFamily: "KiwiSoda, Courier New, monospace", mb: 3, color: "black", backgroundColor: "brown", border: "3px solid black", borderRadius: "12px", display: "inline-block", boxShadow: "0 6px 14px rgba(0, 0, 0, 0.25)", fontSize: 100 }}>
          Saved Recipes
        </Typography>
        <div className="recipt-grid">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="receipt-card">
              <CardContent>
                <div className="receipt-header">
                  <Typography
                    variant="h5"
                    sx={{ fontFamily: "VCR" }}
                    className="receipt-title"
                  >
                    {recipe.name}
                  </Typography>

                  <Typography

                    sx={{ fontFamily: "VCR" }}
                  >
                    Bakery Experiment Receipt
                  </Typography>

                  <Typography

                    sx={{ fontFamily: "VCR, Courier New, monospace" }}
                  >
                    **************************************************************
                  </Typography>
                </div>

                <div className="receipt-line" />


                <div className="receipt-line" />

                <div className="receipt-row">
                  <span>Flour </span>
                  <span>{recipe.flour}g</span>
                </div>

                <div className="receipt-row">
                  <span>White Sugar </span>
                  <span>{recipe.sugar}g</span>
                </div>

                <div className="receipt-row">
                  <span>Brown Sugar </span>
                  <span>{recipe.brown_sugar}g</span>
                </div>

                <div className="receipt-row">
                  <span>Butter </span>
                  <span>{recipe.butter}g</span>
                </div>

                <div className="receipt-row">
                  <span>Eggs </span>
                  <span>{recipe.eggs}</span>
                </div>

                <div className="receipt-row">
                  <span>Salt </span>
                  <span>{recipe.salt} tsp</span>
                </div>

                <div className="receipt-row">
                  <span>Baking Soda </span>
                  <span>{recipe.baking_soda} tsp</span>
                </div>

                <div className="receipt-row">
                  <span>Chocolate Chips </span>
                  <span>{recipe.chocolate_chips} cups</span>
                </div>

                <div className="receipt-row">
                  <span>Vanilla </span>
                  <span>{recipe.vanilla} tsp</span>
                </div>

                <div className="receipt-line" />

                <div className="receipt-result">
                  <strong>Prediction</strong>
                  <p>{recipe.result}</p>
                </div>

                <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                  <Button
                    sx={{ fontFamily: "KiwiSoda" }}
                    type="button"
                    variant="outlined"
                    onClick={() => loadRecipeIntoForm(recipe)}
                  >
                    Use this formula
                  </Button>

                  <Button
                    sx={{ fontFamily: "KiwiSoda" }}
                    type="button"
                    variant="contained"
                    color="error"
                    onClick={() => deleteRecipe(recipe.id)}
                  >
                    Delete
                  </Button>
                </Stack>


              </CardContent>
            </Card>

          ))}
        </div>
      </section>
    </main>
  );
}

export default App;