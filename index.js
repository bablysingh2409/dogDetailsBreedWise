let getImg = document.querySelector('.get-img');
let select = document.querySelector('#select');
let imgContainer = document.querySelector('.img-container');
let subBreedContainer = document.querySelector('.sub-breed-container');
let value;
let breeds = [];

//events
function events() {
  select.addEventListener('change', function (e) {
    value = e.target.value;
  });
  getImg.addEventListener('click', function () {
    getNextBreedImg(value);
  });
}
events();

//storing all breeds in an array and put these value as options
(async function getBreeds() {
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

// getting images breed wise
async function getNextBreedImg(value) {
  imgContainer.textContent = '';
  try {
    let response = await fetch(`https://dog.ceo/api/breed/${value}/images/random/15`);
    let data = await response.json();
    for (let i of data.message) {
      let img = document.createElement('img');
      img.setAttribute('src', i);
      img.classList.add('breed-img');
      imgContainer.append(img);
    }
    isSubBreedsExist(value);
  } catch (err) {
    console.log('error');
  }
}

//check if breed has there subBreeds or not
async function isSubBreedsExist(value) {
  subBreedContainer.innerHTML = '';
  try {
    let res = await fetch('https://dog.ceo/api/breeds/list/all');
    let data = await res.json();
    let subBreeds = data.message[value];
    if (subBreeds.length === 0) {
      console.log('yes it is zero');
    } else {
      dropDownForSubBreeds(subBreeds);
    }
  } catch (err) {
    alert('image does not exist');
  }
}

//if subBreeds exist then creating select for subBreeds
function dropDownForSubBreeds(subBreeds) {
  subBreedContainer.innerHTML = '';
  let selectSubBreed = document.createElement('select');
  for (let breed of subBreeds) {
    let option = document.createElement('option');
    option.value = breed;
    option.textContent = breed;
    selectSubBreed.append(option);
  }
  selectSubBreed.classList.add('select-subBreed');
  subBreedContainer.append(selectSubBreed);
  selectSubBreed.addEventListener('change', function (e) {
    let selectedValue = e.target.value;
    showAllSubBreeds(selectedValue);
  });
}

// all images of subBreeds;
async function showAllSubBreeds(selectedValue) {
  imgContainer.textContent = '';
  try {
    let res = await fetch(`https://dog.ceo/api/breed/hound/${selectedValue}/images/random/10`);
    let data = await res.json();
    let subBreeds = data.message;
    if (Array.isArray(subBreeds)) {
      for (let breed of subBreeds) {
        let img = document.createElement('img');
        img.setAttribute('src', breed);
        img.classList.add('breed-img');
        imgContainer.append(img);
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    alert('image does not exist');
  }
}
