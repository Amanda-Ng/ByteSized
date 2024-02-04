console.log("Script running");

// Helper function - gets a random integer up to (but not including) the maximum
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Capture the two major foci of user interaction in variables.
const submitButton = document.querySelector("#submit");
const queryField = document.querySelector("#search");
const imageHolderDiv = document.querySelector(".imageholder");

submitButton.addEventListener("click", async (e) => {
  if (imageHolderDiv.innerHTML.indexOf("img") !== -1) {
    imageHolderDiv.innerHTML = "";
  }
  let topic = queryField.value;
  let myQuery = `https://api.edamam.com/api/recipes/v2?type=public&q=${topic}&app_id=dda70c0e&app_key=bc8fa0f829a685b2ddf0ad53ca5ab598`;
  for (let j = 0; j < 5; j++) {
    const response = await fetch(myQuery);
    const myjson = await response.json();
    let i = getRandomInt(myjson.hits.length);

    const recipeLink = myjson.hits[i].recipe.url;
    const recipeName = myjson.hits[i].recipe.label;
    const recipeImage = myjson.hits[i].recipe.image;
    const recipeSource = myjson.hits[i].recipe.source;
    imageHolderDiv.innerHTML =
      "<pre>" +
      `<img src="${recipeImage}"/>` +
      "<br />" +
      `<a href="${recipeLink}"/>${recipeName}</a>` +
      "</pre>" +
      "<br />" +
      "<br />" +
      imageHolderDiv.innerHTML;

    document.getElementsByClassName("imageholder")[0].style.display = "flex";
  }
});

queryField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    submitButton.click();
  }
});
