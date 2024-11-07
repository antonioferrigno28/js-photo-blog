const photosRow = document.getElementById("photos-row");

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
                <p class="card-text">${photo.title}</p>
              </div>
            </div>
          </div>
        </div>`;
    });
  });
