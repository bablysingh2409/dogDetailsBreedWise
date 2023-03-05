let getImg = document.querySelector('.get-img');
let nextImg = document.querySelector('.next-img');
let select = document.querySelector('#select');
let img = document.querySelector('.img');
let value;
let breeds = [];

function events() {
  select.addEventListener('change', function (e) {
    value = e.target.value;
  });

  getImg.addEventListener('click', function () {
    getNextBreedImg(value);
  });
  nextImg.addEventListener('click', function () {
    getNextBreedImg(value);
  });
}
events();

//storing all breeds in an array and put these value as options
(async function getBreeds(value) {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      breeds = data.message;
      for (let key in breeds) {
        let option = document.createElement('option');
        option.value = key;
        option.textContent = key;
        select.appendChild(option);
      }
    });
})();

//getting image of breeds
async function getNextBreedImg(value) {
  try {
    let response = await fetch(`https://dog.ceo/api/breed/${value}/images/random`);
    let data = await response.json();
    img.setAttribute('src', data.message);
  } catch (err) {
    console.log(err);
  }
}
