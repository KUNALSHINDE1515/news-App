// const apiKey = "9dbb369197404fe9aadef870e0760ade"; 1 st on video

const apikey = "9dbb369197404fe9aadef870e0760ade"

const blogContainer = document.getElementById("blog-container")

const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${apikey}`

        const response = await fetch(apiUrl)
        const data = await response.json()
        // console.log(data);
        return data.articles;
    } catch (error) {
        console.error(" Error fetching any news" , error);
        return []
    }
}

searchButton.addEventListener("click" , async () => {
    const query = searchField.value.trim()
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        } catch (error) {
            console.log("Error fetching new by query", error);
        }
    }
})
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`

        const response = await fetch(apiUrl)
        const data = await response.json()
        // console.log(data);
        return data.articles;
    } catch (error) {
        console.error(" Error fetching any news" , error);
        return []
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = ""
    articles.forEach((article) => {
        const blogCard = document.createElement("div")
        blogCard.classList.add('blog-card')
        const img = document.createElement('img')
        img.src = article.urlToImage
        img.alt = article.title
        const title = document.createElement("h2")
        const htitle = article.title.length > 30
        ?article.title.slice(0, 30) + "..."
        :article.title;
        title.textContent = htitle;
        const description = document.createElement('p')
        const hdiscreption = article.description.length > 120
        ?article.description.slice(0, 120) + "..."
        :article.description;
        description.textContent = hdiscreption;

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener('click',() => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard)
    });
}

(async () => {
    try {
       const articles =  await fetchRandomNews();
       displayBlogs(articles)
    } catch (error) {
        console.error(" Error fetching any news" , error);
        return []
    }
})();