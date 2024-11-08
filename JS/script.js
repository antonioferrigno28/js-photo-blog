//RECUPERO ELEMENTI
const photosRow = document.getElementById("photos-row"); //Recupero la row dove finiranno le cards generate con il contenuto ricevuto dall'API
const backButton = document.getElementById("back-button"); //Recupero il bottone che servirà per nascondere l'overlay
const imageOverlayWindow = document.getElementById("image-overlay"); //Recupero l'intero overlay semi-trasparente
const overlayImage = imageOverlayWindow.querySelector("img"); //Recupero il tag img dove finirà l'immagine selezionata in overlay

//ELABORAZIONE FETCH
fetch("https://jsonplaceholder.typicode.com/photos?_limit=6") //Avvio della richiesta all'API (Notare key limit=6 per avere esattamente 6 foto con didascalie in questo caso)
  .then((result) => result.json()) //Conservo il risultato in un Json
  //Con le (in questo caso) foto  ricevute
  .then((photos) => {
    //Per ogni foto aggiungo una card con le varie grandezze della colonna per un layout responsive nell'html sostituendo ogni volta (in questo caso 6) il src ed il testo della card con il contenuto della chiave url e della chiave title dell'elemento corrente
    photos.forEach((photo) => {
      photosRow.innerHTML += `<div class="col-lg-4 col-md-6 col-sm-12">                                 
          <div class="card-wrap h-100">
            <span><img src="./img/pin.svg" alt="pin" /></span>
            <div class="card h-100">
              <img src=${photo.url} class="card-img-top img-fluid" alt="..." />
              <div class="card-body">
                <p class="card-text fs-4">${photo.title}</p>
              </div>
            </div>
          </div>
        </div>`;
    });

    // HIDE/SHOW OVERLAY

    const generatedCards = document.querySelectorAll(".card"); //Recupero TUTTE le card DOPO averle generate (sennò non si potrebbero recuperare)
    //Inizializzo una funzione per nascondere l'overlay con parametro event (il nome è a piacere)
    function hideOverlay(event) {
      //SE il tasto premuto è "Esc" OPPURE se il tipo di evento è un click
      if (event.key === "Escape" || event.type === "click") {
        imageOverlayWindow.classList.remove("show"); //Rimuovo la classe show dall'overlay (nascondi l'overlay)
      }
    }
    document.addEventListener("keydown", hideOverlay); //Aggiungo un event listener su tutta la pagina per un qualsiasi tasto, quando l'utente preme il tasto la funzione hideOverlay controllerà se è il tasto "Esc" ed eventualmente procederà con il suo funzionamento
    backButton.addEventListener("click", hideOverlay); //Aggiungo un event listener al pulsante "Indietro" che ha la funzione di nascondere l'overlay
    //Dopo aver recuperato tutte le card generate, per ogni card generata
    generatedCards.forEach((card) => {
      //Aggiungo un event listener sul click alla card stessa
      card.addEventListener("click", () => {
        const imageSrc = card.querySelector("img").src; //Recupero l'attributo "src" della card attuale (per ogni card)
        overlayImage.src = imageSrc; //Aggiorno l'attributo "src" dell'immagine di overlay con quello che ho appena recuperato
        imageOverlayWindow.classList.add("show"); //Mostro l'intero overlay semi-trasparente
      });
    });
  });
