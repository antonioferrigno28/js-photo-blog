const photosRow = document.getElementById("photos-row");
const backButton = document.getElementById("back-button");

fetch("https://jsonplaceholder.typicode.com/photos?_limit=6")
  .then((result) => result.json())
  .then((photos) => {
    photos.forEach((photo) => {
      photosRow.innerHTML += `<div class="col-lg-4 col-md-6 col-sm-12">
          <div class="card-wrap h-100">
            <span><img src="./img/pin.svg" alt="pin" /></span>
            <div class="card h-100">
              <img src=${photo.url} class="card-img-top" alt="..." />
              <div class="card-body">
                <p class="card-text fs-4">${photo.title}</p>
              </div>
            </div>
          </div>
        </div>`;
    });

    const generatedCards = document.querySelectorAll(".card");
    const imageOverlay = document.getElementById("image-overlay");
    const overlayImage = imageOverlay.querySelector("img").src;

    generatedCards.forEach((card) => {
      card.addEventListener("click", () => {
        const imageSrc = card.querySelector("img").src;
        overlayImage = imageSrc;
        imageOverlay.classList.add("Show");
      });
    });
    backButton.addEventListener("click", () => {
      imageOverlay.classList.remove("show");
    });
  });
