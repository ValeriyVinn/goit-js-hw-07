import { galleryItems } from "./gallery-items.js";

const galleryReference = document.querySelector(".gallery");

function createGallery(items) {
  items.map((item) => {
    const markup = `<div class="gallery__item">
                      <a class="gallery__link" href="${item.original}">
                        <img
                          class="gallery__image"
                          src="${item.preview}"
                          data-source="${item.original}"
                          alt="${item.description}"
                        />
                      </a>
                    </div>`;

    galleryReference.insertAdjacentHTML("beforeend", markup);
  });
}
createGallery(galleryItems);

galleryReference.addEventListener("click", selectImage);

function selectImage(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const largeImage = event.target.dataset.source;
  const instance = basicLightbox.create(
    `<img width="1280" height="854" src="${largeImage}">`,
    {
      onShow: () => {
        window.addEventListener("keydown", closeModal);
      },
      onClose: () => {
        window.removeEventListener("keydown", closeModal);
      },
    }
  );
  function closeModal(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
  instance.show();
}
