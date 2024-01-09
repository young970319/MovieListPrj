const search_btn = document.querySelector("#search_btn");
const container = document.querySelector("#container");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGFhNDdjNWFmMmZiZTI5ZTQ0N2JlNDUwOTZjZjM5NSIsInN1YiI6IjY1OWE2NTZhN2Q1NTA0MDIwMzBiMWY4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VZs4CBydjbnWA492WyXRqTF4GJrfSUF4W6JAXo_LNlU",
  },
};

const dbUrl =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

// 카드 형성
const fetchData = async (dbUrl) => {
  const response = await fetch(dbUrl, options);
  const data = await response.json();
  return data;
};

fetchData(dbUrl)
  .then((dataArray) => {
    const movie_poster = "https://image.tmdb.org/t/p/original";
    const obj = [dataArray["results"]];
    const movieSquare = [];

    for (let i = 0; i < obj.length; i++) {
      let movieCard = obj[i].map((movie) => {
        const div = document.createElement("div");
        div.className = "movieCards";
        div.id = movie["id"];
        div.style.width = "400px";
        div.style.padding = "20px";
        div.style.margin = "20px";

        div.style.display = i === 1 ? "none" : ""; // 두 번째 객체일 때는 display를 'none'으로 설정
        div.innerHTML = `
                        <img src="${movie_poster}${movie["poster_path"]}" alt="이미지없음"></img>
                        <h4 class="title">${movie["original_title"]}</h4>
                        <p>${movie["overview"]}</p>
                        <p>영화 평점 :${movie["vote_average"]}</p>
                    `;

        return div;
      });

      movieSquare.push(...movieCard);

      movieSquare.forEach((div) => container.append(div));

      // 클릭 시 id 띄우기

      const movieCards = document.querySelectorAll(".movieCards");

      container.addEventListener("click", (e) =>
        alert("영화 ID :" + e.target.closest(".movieCards").id)
      );

      // // 영화 검색하기

      const search_input = document.querySelector("#search_input");
      search_btn.addEventListener("click", (e) => {
        e.preventDefault();
        container.innerHTML = "";
        const search_value = search_input.value.toUpperCase();

        const foundtitle = movieSquare.map(function (movie) {
          return movie
            .querySelector(".title")
            .textContent.toUpperCase()
            .split(search_value).length > 1
            ? movie
            : "";
        });

        foundtitle.forEach((div) => container.append(div));
      });
    }
  })

  .catch((err) => console.log(err));
