import { galleryItems } from "./gallery-items.js";
// Change code below this line

/*
Створи галерею з можливістю кліку по її елементах і
перегляду повного зображення у модальному вікні.
Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js.
Додай закриття модального вікна після натискання клавіші Escape(опціонально).
*/

//find gallery element
const galleryContainer = document.querySelector(".gallery");

//render gallery content 
galleryContainer.insertAdjacentHTML(
	"beforeend",
	createGalleryMarkup(galleryItems)
);

//delegate handling clicks on gallery items to gallery container
galleryContainer.addEventListener("click", onGalleryClick);

//function to create markup for gallery content from galleryItems array and given template
function createGalleryMarkup(galleryItems) {
	return galleryItems
		.map(
			//Gallery item markup
			({ preview, original, description }) => `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
    /></a></div>`
		)
		.join("");
}

//function to handle click on gallery item and open modal window
function onGalleryClick(e) {
  //check if click target is image
  if (e.target.nodeName !== "IMG") {
    return;
  }

  //get URL of original image
  const selectedImgURL = e.target.dataset.source;

  //create modal window
  const modal = basicLightbox.create(
		`<img width="1280" src="${selectedImgURL}">`,
		{
      //on modal show, add eventlistener for ESC key to close modal window
			onShow: (instance) => {
				window.addEventListener("keydown", onKeyDown);
      },
      //on modal close, remove keyboard eventlistener
			onClose: (instance) => {
				window.removeEventListener("keydown", onKeyDown);
			},
		}
	);

  //show original image
  modal.show();

  //prevent default behaivior on link click (it was photo download?? TODO: find out why)
  e.preventDefault();

  //function to handle keyboard event for closing modal window on ESC key
  function onKeyDown(e) {
		if (e.key === "Escape") {
			modal.close();
		}
	}
}

