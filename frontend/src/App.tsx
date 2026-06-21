import { useEffect, useState } from "react";
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

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [form, setForm] = useState<RecipeForm>({
    name: "",
    flour: "",
    sugar: "",
    brown_sugar: "",
    butter: "",
    eggs: "",
    salt: "",
    baking_soda: "",
    chocolate_chips: "",
    vanilla: "",
  });
  const presetRecipes: RecipeForm[] = [
    {
      name: "Crispy Cookie",
      flour: "75",
      sugar: "62.5",
      brown_sugar: "13g",
      butter: "56.75",
      eggs: "1/4",
      salt: "1/4",
      baking_soda: "1/4",
      chocolate_chips: "1/2",
      vanilla: "1/3",
    },
    {
      name: "Soft and Chewy Cookies",
      flour: "191",
      sugar: "100",
      brown_sugar: "50",
      butter: "113",
      eggs: "1",
      salt: "1/2",
      baking_soda: "1/2",
      chocolate_chips: "3/4",
      vanilla: "1",
    },
  ];

  useEffect(() => {
    fetchRecipes();
  }, []);

  function loadRecipeIntoForm(recipe: Recipe) {
    setForm({
      name: recipe.name,
      flour: String(recipe.flour),
      brown_sugar: String(recipe.brown_sugar),
      sugar: String(recipe.sugar),
      butter: String(recipe.butter),
      eggs: String(recipe.eggs),
      salt: String(recipe.salt),
      baking_soda: String(recipe.baking_soda),
      chocolate_chips: String(recipe.chocolate_chips),
      vanilla: String(recipe.vanilla),
    });
  }
  function loadPresetIntoForm(preset: RecipeForm) {
    setForm(preset);
  }
  function fetchRecipes() {
    fetch("http://localhost:3000/recipes")
      .then((res) => res.json())
      .then((data: Recipe[]) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const recipeData = {
      name: form.name,
      flour: Number(form.flour),
      sugar: Number(form.sugar),
      butter: Number(form.butter),
      eggs: Number(form.eggs),
      salt: Number(form.salt),
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

        setForm({
          name: "",
          flour: "",
          sugar: "",
          brown_sugar: "",
          butter: "",
          eggs: "",
          salt: "",
          baking_soda: "",
          chocolate_chips: "",
          vanilla: "",
        });

        fetchRecipes();
      })
      .catch((error) => {
        console.error("Error saving recipe:", error);
        alert("Could not connect to the backend");
      });
  }

  return (
    <main className="page">
      <h1>🍪 Cookie Formula Lab</h1>

      <form onSubmit={handleSubmit} className="card">
        <h2>New Cookie Formula</h2>

        <input name="name" placeholder="Recipe name" value={form.name} onChange={handleChange} />
        <input name="flour" placeholder="Flour (g)" value={form.flour} onChange={handleChange} />
        <input name="sugar" placeholder="White Sugar (g)" value={form.sugar} onChange={handleChange} />
        <input name="brown_sugar" placeholder="Brown Sugar (g)" value={form.brown_sugar} onChange={handleChange} />
        <input name="butter" placeholder="Butter (g)" value={form.butter} onChange={handleChange} />
        <input name="eggs" placeholder="Eggs" value={form.eggs} onChange={handleChange} />
        <input name="salt" placeholder="Salt (tsp)" value={form.salt} onChange={handleChange} />
       <input name="baking_soda" placeholder="Baking Soda(tsp)" value={form.baking_soda} onChange={handleChange} />
        <input name="chocolate_chips" placeholder="Chocolate Chips(g)" value={form.chocolate_chips} onChange={handleChange} />
         <input name="vanilla" placeholder=" Vanilla(tsp)" value={form.vanilla} onChange={handleChange} />
        <button type="submit">Analyze Cookie</button>
      </form>

      <section className="card">
        <h2>Start from a preset</h2>

        {presetRecipes.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => loadPresetIntoForm(preset)}
          >
            {preset.name}
          </button>
        ))}
      </section>

      <section>
        <h2>Saved Recipes</h2>



        {recipes.map((recipe) => (
          <div key={recipe.id} className="card">
            <h3>{recipe.name}</h3>

            <p>
              Flour: {recipe.flour}g | Sugar: {recipe.sugar}g | Butter:{" "}
              {recipe.butter}g | Eggs: {recipe.eggs} | Salt: {recipe.salt}g
            </p>

            <div className="result">
              <strong>Prediction:</strong>
              <p>{recipe.result}</p>
            </div>
            <button type="button" onClick={() => loadRecipeIntoForm(recipe)}>
              Use this formula
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;