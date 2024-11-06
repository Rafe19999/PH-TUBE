
console.log('the page is connected with the html file');
// fetching categories API

function fetchCategories() {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

//fetching videos API
function fetchVideos() {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
}

// displaying categories API

function displayCategories(data) {
  data.forEach(item => {
    console.log(item);

    // creating button
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = `<button id="btn-${item.category_id}" onclick = "loadCategoriesVideos(${item.category_id})" class= "btn category-btn"> ${item.category} </button> `;
    document.getElementById('categories').append(buttonContainer);
  })
}

function removeActiveClass(){
  const activeButtons = document.getElementsByClassName('category-btn')
  for(let button of activeButtons){
    button.classList.remove('active');
  }
}

function loadCategoriesVideos(link) {
  //alert(link);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${link}`)
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      const activeBtn = document.getElementById(`btn-${link}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
}

// time convertors from the object
function timeConvertor(time) {
  let result = '';

  const years = Math.floor(time / (3600 * 24 * 365));
  time %= 3600 * 24 * 365;
  if (years > 0) result += `${years} years `;

  const months = Math.floor(time / (3600 * 24 * 30));
  time %= 3600 * 24 * 30;
  if (months > 0) result += `${months} months `;

  const days = Math.floor(time / (3600 * 24));
  time %= 3600 * 24;
  if (days > 0) result += `${days} days `;

  const hours = Math.floor(time / 3600);
  time %= 3600;
  if (hours > 0) result += `${hours} hours `;

  const minutes = Math.floor(time / 60);
  if (minutes > 0) result += `${minutes} minutes `;

  const seconds = time % 60;
  if (seconds > 0) result += `${seconds} seconds `;

  return result.trim() + " ago";
}

// displaying categories API

function displayVideos(data) {
  const videoContainer = document.getElementById('videos');
  videoContainer.classList.remove('grid');
  videoContainer.innerHTML = "";
  if (data.length === 0) {
    videoContainer.innerHTML = `
  <div class="flex flex-col items-center gap-3 mt-[150px]">
    <img src="ph-tube-resources-main/Icon.png">
    <p>OPPS! SORRY THERE IS NO CONTENT HERE.</p>
  </div>
`;

 return;
  }
  else{
    videoContainer.classList.add('grid');
  }

    data.forEach(item => {
      console.log(item);
      const cart = document.createElement('div');
      cart.classList = 'card card-compact';
      cart.innerHTML = `
    <figure class ="relative">
    <img class="w-full h-[200px] rounded-lg object-cover"
      src= ${item.thumbnail};
      alt="Content Images" />
      ${item.others.posted_date?.length === 0 ? "" : `<span class = "absolute right-2 bottom-2 text-white bg-gray-950 text-xs font-medium p-1 rounded-lg">${timeConvertor(item.others.posted_date)}  </span>`
        }
      
  </figure>
  <div class="px-0 py-2 flex items-center">
    <div>
       <img class="h-[40px] w-[40px] rounded-[20px]" src = ${item.authors[0].profile_picture}>
    </div>
    <div>
    <h2 class="font-bold text-[16px] text[#161616] ml-4 mt-[1px] "> ${item.title}</h2>
    <div class="flex gap-1 items-center">
    <p class="text[14px] text-gray-500 ml-4" >  ${item.authors[0].profile_name} </p>
        ${item.authors[0].verified === true ? `<img class="h-[20px] w-[20px]" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"></img>` : ""}    
     </div>
    <p class=" ml-4 text[14px] text-gray-500" > ${item.others.views} views  </p>
    </div>
  </div>
    `
      videoContainer.append(cart);
    })
  }




fetchCategories();
fetchVideos();

