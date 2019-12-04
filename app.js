const btn = document.querySelector("#addRecipe");
const recipes = document.querySelector(".recipes");
let listofRecipes = document.querySelectorAll(".grid-item");
function addRecipe(nazwa, opis, skladniki, url, url2, przepis) {
  let listOfIngredients = skladniki.split(",");
  listOfIngredients = listOfIngredients.map(ing => ing.trim());

  let recipe = document.createElement("div");
  let readmore = document.createElement("div");
  readmore.classList.add("readmore");
  let h1 = document.createElement("h1");
  h1.innerHTML = "Zobacz";
  readmore.appendChild(h1);
  let btn = document.createElement("button");
  btn.classList.add("btn-remove");
  btn.innerHTML = "X";
  btn.addEventListener("click", e => {
    e.stopPropagation();
    recipes.removeChild(recipe);
  });
  let img = document.createElement("img");
  let div = document.createElement("div");
  img.src = url;
  let h3 = document.createElement("h3");
  let p = document.createElement("p");
  h3.innerHTML = nazwa;
  p.innerHTML = opis;
  div.appendChild(h3);
  div.appendChild(p);
  recipe.classList.add("grid-item");
  recipe.appendChild(readmore);
  recipe.appendChild(img);
  recipe.appendChild(div);
  recipe.appendChild(btn);
  const ingredients = document.createElement("div");
  ingredients.classList.add("ingredients");
  const h3p = document.createElement("h3");
  const pp = document.createElement("p");
  h3p.innerHTML = "Przepis:";
  pp.innerHTML = przepis;
  ingredients.appendChild(h3p);
  ingredients.appendChild(pp);
  const h3Ing = document.createElement("h3");
  h3Ing.innerHTML = "Składniki:";
  ingredients.appendChild(h3Ing);
  const ul = document.createElement("ul");
  listOfIngredients.forEach((ing, index) => {
    const li = document.createElement("li");
    li.innerHTML = ing;
    if (index < 4) ul.appendChild(li);
  });
  ingredients.appendChild(ul);
  recipe.appendChild(ingredients);
  let p2 = document.createElement("p");
  p2.innerHTML = url2;
  p2.style.display = "none";
  recipe.appendChild(p2);

  recipe.tl2 = new TimelineMax({ paused: true, reversed: true });
  var newsrc = recipe.childNodes[5].innerText;
  recipe.tl2
	.fromTo(recipe.childNodes[1], 0.35, { y: 0 }, { y: "-100%" })
	.set(recipe.childNodes[1], {attr:{src:""+newsrc}})
	.fromTo(recipe.childNodes[1], 0.35, { y: 0 }, { y: "-20%" })
    .fromTo(recipe.childNodes[2], 0.15, { x: 0 }, { x: "-100%" })
    .fromTo(recipe.childNodes[4], 0.35, { y: 0 }, { y: "-100%" });

  recipe.addEventListener("click", () => {
    listofRecipes.forEach(rec => {
      if (rec != recipe) rec.tl2.reversed() ? null : rec.tl2.reverse();
    });
    recipe.tl2.reversed() ? recipe.tl2.play() : recipe.tl2.reverse();
  });
  listofRecipes = [...listofRecipes, recipe];
  recipes.appendChild(recipe);
}

const formularz = document.querySelector(".formularz");
const tl = new TimelineMax({ paused: true, reversed: true });

tl.fromTo(formularz, 0.5, { x: "100%" }, { opacity: 1, x: "0%" }, "-=0.1");

btn.addEventListener("click", () => {
  tl.reversed() ? tl.play() : tl.reverse();
});

const listOfButtons = document.querySelectorAll(".btn-remove");
listOfButtons.forEach(btn =>
  btn.addEventListener("click", e => {
    e.stopPropagation();
    recipes.removeChild(btn.parentNode);
  })
);

const submitBtn = document
  .querySelector("#submitBtn")
  .addEventListener("click", e => {
    e.preventDefault();
    const form = document.getElementById("form");
    const isValidForm = form.checkValidity();
    const opis = document.querySelector("#opis");
    const skladniki = document.querySelector("#skladniki");
	const przepis = document.querySelector("#przepis");
    const url = document.querySelector("#url");
	const url2 = document.querySelector("#url2");
    const nazwa = document.querySelector("#nazwa");
    document.querySelector("#error-nazwa").innerHTML = nazwa.validationMessage;
	document.querySelector("#error-przepis").innerHTML = przepis.validationMessage;
    document.querySelector("#error-opis").innerHTML = opis.validationMessage;
    document.querySelector("#error-skladniki").innerHTML =
      skladniki.validationMessage;
    document.querySelector("#error-url").innerHTML = url.validationMessage;
	document.querySelector("#error-url2").innerHTML = url2.validationMessage;

    if (!isValidForm) return;

    addRecipe(nazwa.value, opis.value, skladniki.value, url.value, url2.value, przepis.value);

    tl.reversed() ? tl.play() : tl.reverse();
    opis.value = "";
	przepis.value = "";
    skladniki.value = "";
    url.value = "";
	url2.value = "";
    nazwa.value = "";
  });

document.querySelector("#clearBTN").addEventListener("click", () => {
  const opis = document.querySelector("#opis");
  const przepis = document.querySelector("#przepis");
  const skladniki = document.querySelector("#skladniki");
  const url = document.querySelector("#url");
  const url2 = document.querySelector("#url2");
  const nazwa = document.querySelector("#nazwa");
  document.querySelector("#error-nazwa").innerHTML = "";
  document.querySelector("#error-przepis").innerHTML = "";
  document.querySelector("#error-opis").innerHTML = "";
  document.querySelector("#error-skladniki").innerHTML = "";
  document.querySelector("#error-url").innerHTML = "";
  document.querySelector("#error-url2").innerHTML = "";
  opis.value = "";
  przepis.value = "";
  skladniki.value = "";
  url.value = "";
  url2.value = "";
  nazwa.value = "";
});

listofRecipes.forEach(recipe => {
  recipe.tl2 = new TimelineMax({ paused: true, reversed: true });
  var newsrc = recipe.childNodes[9].innerText;
  recipe.tl2
	.fromTo(recipe.childNodes[3], 0.35, { y: 0 }, { y: "-100%" })
	.set(recipe.childNodes[3], {attr:{src:""+newsrc}})
	.fromTo(recipe.childNodes[3], 0.35, { y: 0 }, { y: "-20%" })
    .fromTo(recipe.childNodes[5], 0.15, { x: 0 }, { x: "-100%" })
    .fromTo(recipe.childNodes[7], 0.35, { y: 0 }, { y: "-100%" });
  recipe.addEventListener("click", () => {
    console.log(recipe.childNodes);
    listofRecipes.forEach(rec => {
      if (rec != recipe) rec.tl2.reversed() ? null : rec.tl2.reverse();
    });
    recipe.tl2.reversed() ? recipe.tl2.play() : recipe.tl2.reverse();
  });
});