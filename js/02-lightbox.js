import { galleryItems } from './gallery-items.js';
// Change code below this line
/*
Зроби таку саму галерею використовуючи бібліотеку SimpleLightbox,
яка візьме на себе обробку кліків по зображеннях,
відкриття і закриття модального вікна, а також гортання зображень за допомогою клавіатури.

Додай підписи до зображень з атрибута alt.
Нехай підпис буде знизу і з'являється через 250 мілісекунд після відкриття зображення.
*/
console.log(galleryItems);

//find gallery element
const galleryContainer = document.querySelector(".gallery");

//render gallery content
galleryContainer.insertAdjacentHTML(
	"beforeend",
	createGalleryMarkup(galleryItems)
);

//initialize SimpleLightBox
var lightbox = new SimpleLightbox(".gallery a", {
  	/* options for source of caption and caption delay ms */
	captionsData: "alt",
	captionDelay: 250,
});

//function to create markup for gallery content from galleryItems array and given template
function createGalleryMarkup(galleryItems) {
	return galleryItems
		.map(
			//Gallery item markup
			({ preview, original, description }) =>
				`<a class="gallery__item" href="${original}">
						<img
							class="gallery__image"
							src="${preview}"
							alt="${description}"
						/>
					</a>`
		)
		.join("");
}
