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
