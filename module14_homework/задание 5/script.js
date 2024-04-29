let output = document.querySelector(".output");
let button = document.querySelector(".btn-go");

function showLastOutput() {
  let lastData = localStorage.getItem("images");
  if (lastData) {
    output.innerHTML += lastData;
  }
}

button.addEventListener("click", () => {
  let pageNumber = +document.querySelector(".page-number").value;
  let limit = +document.querySelector(".limit").value;

  output.innerHTML = "";

  if(isNaN(pageNumber) || isNaN(limit)) {
    output.innerHTML = "Нужны числа";
  } else if ((pageNumber < 1 || pageNumber > 10) && (limit < 1  || limit > 10)) {
    output.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
  } else if (pageNumber < 1 || pageNumber > 10) {
    output.innerHTML = "Номер страницы вне диапазона от 1 до 10";
  } else if (limit < 1  || limit > 10) {
    output.innerHTML = "Лимит вне диапазона от 1 до 10";
  } else {
    let url = `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=${limit}`;
    useRequest(url);
  }
});

function useRequest(url) {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.forEach(obj => {
        output.innerHTML += `<img src="${obj.url}" alt="${obj.author}" style="padding:10px;width:100px;height:100px"/>`;
      });
      saveToLocalStorage(output.innerHTML);
    })
}

function saveToLocalStorage(data) {
  localStorage.clear();
  localStorage.setItem("images", data);
}

showLastOutput()