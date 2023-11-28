const coffeeContainer = document.querySelector(".coffee-container");
const searchInput = document.querySelector(".search");

let myCoffees = [];

const cappucino = {
  description: "Cappucino",
  title: "New Cappucino",
  image: "images/cappucino.jpg",
  ingredients: ["Coffee", "Ice"],
};

const americano = {
  description: "Cappucino",
  title: "New Americano",
  image: "images/americano.jpg",
  ingredients: ["Coffee", "Ice"],
};

const filterCoffee = () => {
  let value = searchInput.value;
  let filteredCoffees = myCoffees.filter((coffee) => {
    if (
      coffee.title.toLowerCase().includes(value) ||
      coffee.title.includes(value)
    ) {
      return coffee.title;
    }
  });
  displayDatas(filteredCoffees);
};

searchInput.addEventListener("input", filterCoffee);

const postCoffee = (obj) => {
  fetch("https://api.sampleapis.com/coffee/hot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error(error));
};

const checkCoffee = (coffee) => {
  return myCoffees.some((myCoffee) => myCoffee.title === coffee.title);
};
const getPosts = () => {
  fetch("https://api.sampleapis.com/coffee/hot")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      myCoffees.push(...data);
      displayDatas(myCoffees);
      console.log(myCoffees);

      const addCoffee = [cappucino, americano];
      addCoffee.map((coffee) => {
        if (!checkCoffee(coffee)) {
          postCoffee(coffee);
        } else {
          console.log(`${coffee.title} is already added!`);
        }
      });
    })
    .catch((error) => console.error(error));
};
getPosts();

function displayDatas(data) {
  coffeeContainer.innerHTML = "";
  data.map((coffee) => {
    let coffeeCard = document.createElement("div");
    coffeeCard.classList.add("coffee-card");
    coffeeCard.innerHTML = `
    <p class="title">${coffee.title}</p>
    <img class="img" src="${coffee.image}">
    `;
    coffeeContainer.appendChild(coffeeCard);
  });
}

const newCoffee = {
  description: "Cold brew",
  title: "Cold brew",
  image: "images/cold brew.jpg",
  ingredients: ["Coffee", "Ice"],
};

const putPosts = () => {
  fetch("https://api.sampleapis.com/coffee/hot/20", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCoffee),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

putPosts();
