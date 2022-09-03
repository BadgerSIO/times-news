const loadData = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data.news_category);
};
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
  const catagoryName = document.getElementById("catagory-name");
  catagoryName.innerText = catagory_name;
  const caturl = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
  const displayNews = async () => {
    const res = await fetch(caturl);
    const data = await res.json();
    showData(data.data);
  };
  const showData = (data) => {
    const showCount = document.getElementById("item-count");
    showCount.innerText = data.length;
  };
  displayNews();
}
loadData();
//showing news
const getNews = async () => {
  const url = `https://openapi.programming-hero.com/api/news/category/01`;
  const res = await fetch(url);
  const data = await res.json();
  showNews(data.data);
};

const showNews = (data) => {
  const newsContainer = document.getElementById("newsContainer");
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
        <div class="thumbnail">
              <img src="${news.thumbnail_url}" alt="" />
            </div>
            <div
              class="newsinfo flex-1 space-y-5 py-2 flex flex-col justify-between"
            >
              <div class="news">
                <h1 class="font-bold text-2xl news-title">
                  ${news.title}
                </h1>
                <p class="text-base text-gray-500 py-5 news-description">
                  ${news.details}
                </p>
              </div>
              <div class="others grid grid-cols-3 ">
                <div class="author_info flex items-center space-x-3">
                  <div class="author_img">
                    <img src="${news.author.img}" alt="" class="w-12" />
                  </div>
                  <div class="authorname text-sm">
                    <h5 class="font-bold capitalize">${news.author.name}</h5>
                    <h6>${news.author.published_date}</h6>
                  </div>
                </div>
                <div class="viewcount flex items-center justify-center">
                  <h5 class="flex justify-center items-center self-center">
                    <span class="pr-2"
                      ><img src="images/eye.svg" alt=""
                    /></span>
                    <span id="total_views">${news.total_view}</span>
                  </h5>
                </div>
                <div class="flex justify-end items-center">
                  <img
                    src="images/seemore.svg"
                    alt=""
                    class="cursor-pointer"
                    title="See details"
                    id="showNewsDetails"
                    onclick="showNewsDetail(${news._id})"
                  />
                </div>
              </div>
            </div>
        `;
    newsContainer.appendChild(singleNews);
  });
};
getNews();
