const loadData = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};
//creating news catagories dynamicaly
const displayData = (data) => {
  const ul = document.getElementById("categories");
  data.map((catagory) => {
    const li = document.createElement("li");
    li.classList.add(
      "hover:bg-violet-100",
      "hover:text-violet-600",
      "hover:cursor-pointer",
      "py-2",
      "px-3",
      "rounded",
      "capitalize",
      "active:bg-violet-300"
    );
    li.innerHTML = `
      ${catagory.category_name}
      `;
    li.setAttribute(
      "onclick",
      `displayall(${catagory.category_id},${JSON.stringify(
        catagory.category_name
      )})`
    );
    ul.appendChild(li);
  });
};
function displayall(category_id, catagory_name) {
  startspin(true);
  const caturl = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
  const displayNews = async () => {
    try {
      const res = await fetch(caturl);
      const data = await res.json();
      showData(data.data);
      showNews(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const showData = (data) => {
    const catagoryName = document.getElementById("catagory-name");
    catagoryName.innerText = catagory_name;
    const showCount = document.getElementById("item-count");
    showCount.innerText = data.length;
  };
  displayNews();
}
loadData();
//create news cards
const showNews = (data) => {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = ``;
  data.forEach((news) => {
    const singleNews = document.createElement("div");
    singleNews.classList.add(
      "singleNews",
      "bg-white",
      "p-4",
      "rounded",
      "flex",
      "space-x-4",
      "mb-5"
    );
    singleNews.innerHTML = `
        <div class="thumbnail ">
              <img src="${
                news.thumbnail_url
              }" alt="" class="h-full object-cover rounded-lg"/>
            </div>
            <div
              class="newsinfo flex-1 space-y-5 py-2 flex flex-col justify-between"
            >
              <div class="news cursor-pointer" onclick="showNewsDetail('${
                news._id
              }')" >
                <h1 class="font-semibold text-2xl news-title text-slate-800" >
                  ${news.title}
                </h1>
                <p class="text-base text-gray-500 py-5 news-description">
                  ${
                    news.details
                      ? news.details.slice(0, 350) + `...See More`
                      : "no data found"
                  }
                </p>
              </div>
              <div class="others grid grid-cols-3 ">
                <div class="author_info flex items-center space-x-3">
                  <div class="author_img ">
                    <img src="${
                      news.author.img ? news.author.img : "no author image"
                    }" alt="" class="w-12 rounded-full" />
                  </div>
                  <div class="authorname text-sm">
                    <h5 class="font-bold capitalize">${
                      news.author.name ? news.author.name : "anonymous"
                    }</h5>
                    <h6>${
                      news.author.published_date
                        ? news.author.published_date
                        : "data not available"
                    }</h6>
                  </div>
                </div>
                <div class="viewcount flex items-center justify-center">
                  <h5 class="flex justify-center items-center self-center">
                    <span class="pr-2"
                      ><img src="images/eye.svg" alt=""
                    /></span>
                    <span id="total_views">${
                      news.total_view > 0 ? news.total_view : "no views"
                    }</span>
                  </h5>
                </div>
                <div class="flex justify-end items-center">
                  <img
                    src="images/seemore.svg"
                    alt=""
                    class="cursor-pointer"
                    title="See details"
                    id="showNewsDetails"
                    onclick="showNewsDetail('${news._id}')"
                  />
                </div>
              </div>
            </div>
        `;
    newsContainer.appendChild(singleNews);
    startspin(false);
  });
};
//show news details
const defaultModal = document.getElementById("defaultModal");
const showNewsDetail = (id) => {
  defaultModal.classList.remove("hidden");
  defaultModal.classList.add("flex");
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  const insideModalData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      modalData(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  //show modal data
  const modalData = (news) => {
    defaultModal.innerHTML = `
  <div class="relative p-4 w-full max-w-4xl h-[100vh] md:h-[95vh]  ">
              <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow md:max-h-[95vh] overflow-y-scroll">
                <!-- Modal header -->
                <div
                  class=" fixed rounded md:-translate-x-10 "
                >
                <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    onclick="closeModal()"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-4">
                  <img src="${
                    news.image_url ? news.image_url : "no image found"
                  }" alt="" class="w-full" />
                  <div class="flex space-x-5 ">
                    <div>
                        <img src="${
                          news.author.img ? news.author.img : "no image found"
                        }" alt="" class="w-10 rounded-full">
                    </div>
                    <div class="grow">
                        <h1 class="text-sm">${
                          news.author.name ? news.author.name : "tumi k?"
                        }</h1>
                        <h2 class="text-sm">${
                          news.author.published_date
                            ? news.author.published_date
                            : "jani na vai"
                        }</h2>
                    </div>
                  </div>
                  <h1 class="text-xl font-semibold text-gray-800 news-inner-title">
                    ${news.title ? news.title : "no title found"}
                  </h1>
                  <p class="text-base leading-relaxed text-gray-500 text-justify">
                    ${news.details ? news.details : "no new details"}
                  </p>
                  
                </div>
                <!-- Modal footer -->
                <div
                  class="flex items-center p-3 space-x-2 rounded-b border-t border-gray-200"
                >
                  <button
                    onclick="closeModal()"
                    type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
  `;
  };
  insideModalData();
};
//modal close
const closeModal = () => {
  defaultModal.classList.remove("flex");
  defaultModal.classList.add("hidden");
};
displayall(1, "Breaking News");
// spinner functions
function startspin(yn) {
  const spinnerid = document.getElementById("spinnerid");
  if (yn) {
    spinnerid.classList.remove("hidden");
    return;
  } else {
    spinnerid.classList.add("hidden");
  }
}
