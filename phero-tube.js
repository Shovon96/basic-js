const handleCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json();
    categoriesContainer(data)
    // console.log(data.data)
}
// dynamic add catogories button
const categoriesContainer = (data) => {
    const getCategoriesContainer = document.getElementById('categories-container');
    data.data.forEach((category) => {
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <a onclick="handleCardCategories('${category.category_id}')" class="btn text-black font-bold">${category.category}</a>
        `
        // console.log(category.category_id) 
        getCategoriesContainer.appendChild(createDiv)
    });
}

// Handle card
const handleCardCategories = async (itemsId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${itemsId}`);
    const data = await response.json();
    
    // get card container
    const getCardContainer = document.getElementById('card-container');
    // clear cards
    getCardContainer.textContent = '';
    // No data/card available
    const noCardContainer = document.getElementById('no-card-container')
    noCardContainer.textContent = ''
    if (data.data.length <= 0) {
        const noCardCreateDiv = document.createElement('div');
        noCardCreateDiv.innerHTML = `<img class="ml-[45%]" src="./Icon.png" alt="">
        <p class="text-4xl font-bold text-black mt-4 text-center">Oops!! Sorry, There is no <br> Content here</p>
        `
        noCardContainer.classList.remove("hidden");
        noCardContainer.appendChild(noCardCreateDiv);
    }else{
        noCardContainer.classList.add('hidden')
    }

    data.data.forEach((item) => {
        // console.log(item)

        // convert to posted date hour and minute
        const totalSeconds = `${item.others.posted_date}`;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        // Create a div and this div innerHTML and appended
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
            <div class="card bg-base-100 shadow-xl item">
                <figure>
                    <img class="p-4 rounded-lg h-60 w-80 relative" src="${item?.thumbnail}" alt="">
                    <p class="bg-black text-white text-sm ml-32 mt-44 px-2 rounded-lg absolute">${item.others?.posted_date ? `${hours} hrs ${minutes} min ago` : ''}</p>
                    </figure>
                <div class="card-body">
                    <div class="flex gap-5">
                        <img class="w-12 h-12 rounded-full" src="${item?.authors[0]?.profile_picture}" alt="">
                        <h2 class="text-base font-bold">${item?.title}</h2>
                    </div>
                    <div class="ml-20 text-slate-500">
                        <p class="flex gap-2 my-2">${item?.authors[0]?.profile_name}
                        <span>${item?.authors[0]?.verified ? '<img src="./verified_icon.svg" alt="">' : ''}</span>
                        </p>
                        <p class="views">${item.others.views} views</p>
                    </div>
                </div>
            </div>
        `

        getCardContainer.appendChild(createDiv)
    });
}

// Handle Blog Button
const getBlogBtn = document.getElementById('btn-blog').addEventListener('click', () => {
    window.location.href = "blog.html"
})

// Sort by views function
function sortByViewCard() {
  const cardContainer = document.getElementById("card-container");
  const cardItems = Array.from(cardContainer.querySelectorAll("div.item"));
  cardItems.sort((a, b) => {
    const viewsCardA = parseInt(
      a.querySelector(".views").textContent.replace(/[^\d]/g, "")
    );
    const viewsCardB = parseInt(
      b.querySelector(".views").textContent.replace(/[^\d]/g, "")
    );
    return viewsCardB - viewsCardA;
  });
  const sortByViewBtn = document.getElementById("sort-by-view-btn");
  sortByViewBtn.addEventListener("click", () => {
    sortByViewCard();
  });

  cardContainer.innerHTML = "";
  cardItems.forEach((cardItem) => {
    cardContainer.appendChild(cardItem);
  });
}


handleCategories()
handleCardCategories('1000')
sortByViewCard()
