class ingredient {
    constructor() {
        this.data = [];
    }

    addIngredient(name, type, calori) {
        this.data.push({name, type, calori});
    }

    getIngredient(index) {
        return this.data[index];
    }
}

class recipe {
    constructor() {
        this.data = [];
    }

    addRecipe(recipes) { // recipes is a list of { ingredient, amount }
        this.data.push(recipes);
    }

    getRecipe(index) {
        return this.data[index];
    }

    getRecipes() {
        return this.data;
    }
}

class allegen {
    constructor() {
        this.data = [];
    }

    addAllegens(allegens) { // allegens is a list of ingredient
        this.data.push(allegens);
    }

    getAllegens() {
        return this.data;
    }
}

const ingredientData = new ingredient();
const recipeData = new recipe();
const allegenData = new allegen()

function initialData() {
    // initial should be go
}

function hasAllegens(ingredientIndex) {
    const currentRecipe = recipeData.getRecipe(ingredientIndex);
    const allegens = allegenData.getAllegens();

    for (let i = 0; i < allegens.length; i++) {
        let cnt = 0;
        for (let j = 0; j < allegens[i]; j++) {
            for (let k = 0; k < currentRecipe.length; k++) {
                if(currentRecipe[k].ingredient.name === allegens[i][j].name) {
                    cnt++;
                }
            }
        }
        if (cnt > 1) {
            return true;
        }
    }
    return false;
}

function hasFoodTypes(ingredientIndex, foodType) {
    const currentRecipe = recipeData.getRecipe(ingredientIndex);

    for (let i = 0; i < currentRecipe.length; i++) {
        if (currentRecipe[i].ingredient.type === foodType) {
            return true;
        }
    }
    return false;
}

function removeAllegens(ingredientIndex) {
    let currentRecipe = recipeData.getRecipe(ingredientIndex);
    const allegens = allegenData.getAllegens();

    for (let i = 0; i < allegens.length; i++) {
        let cnt = 0;
        for (let j = 0; j < allegens[i]; j++) {
            for (let k = 0; k < currentRecipe.length; k++) {
                if(currentRecipe[k].ingredient.name === allegens[i][j].name) {
                    cnt++;
                }
            }
        }
        if (cnt > 1) {
            const newRecipe = [];
            for (let j = 0; j < allegens[i]; j++) {
                for (let k = 0; k < currentRecipe.length; k++) {
                    if(currentRecipe[k].ingredient.name !== allegens[i][j].name) {
                        newRecipe.push(currentRecipe[k])
                    }
                }
            }
            currentRecipe = newRecipe;
        }
    }
    return currentRecipe;
}

function removeFoodTypes(ingredientIndex, foodType) {
    let currentRecipe = recipeData.getRecipe(ingredientIndex);
    const newRecipe = [];

    for (let i = 0; i < currentRecipe.length; i++) {
        if (currentRecipe[i].ingredient.type !== foodType) {
            newRecipe.push(currentRecipe[i]);
        }
    }
    return newRecipe;
}

function removeIngredients(ingredientIndex, ingredients) {
    let currentRecipe = recipeData.getRecipe(ingredientIndex);
    const newRecipe = [];

    for (let i = 0; i < currentRecipe.length; i++) {
        if (!ingredients.includes(currentRecipe[i].ingredient.name)) {
            newRecipe.push(currentRecipe[i]);
        }
    }
    return newRecipe;
}

function doubleIngredients(ingredientIndex, ingredients) {
    let currentRecipe = recipeData.getRecipe(ingredientIndex);
    const newRecipe = [];

    for (let i = 0; i < currentRecipe.length; i++) {
        if (!ingredients.includes(currentRecipe[i].ingredient.name)) {
            const newIngredient = currentRecipe[i];
            newIngredient.amount = newIngredient.amount * 2;
            newRecipe.push(newIngredient);
        }
    }
    return newRecipe;
}

function getCalories(ingredientIndex) {
    let currentRecipe = recipeData.getRecipe(ingredientIndex);
    let sum = 0;
    
    for (let i = 0; i < currentRecipe.length; i++) {
        sum += currentRecipe[i].ingredient.calori;
    }

    return sum;
}