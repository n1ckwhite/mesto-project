const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const photoBlock = document.querySelector(".photo__grid");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseButton = document.querySelector(".popup__form-close");
const popopAddButton = document.querySelector(".popup__form-btn");

const template = document.querySelector("#photo__template").content;

initialCards.forEach(function (item) {
  const items = template.querySelector(".photo__item").cloneNode(true);
  items.querySelector(".photo__img").src = item.link;
  items.querySelector(".photo__img").alt = item.name;
  items.querySelector(".photo__text").textContent = item.name;
  photoBlock.prepend(items);
});

function togglePopup() {
  const popup = document.querySelector(".popup");
  return popup.classList.toggle("popup_opened");
}

function editForm() {
  const profileName = document.querySelector(".profile__name");
  const profileDescr = document.querySelector(".profile__descr");
  const name = document.querySelector("#name");
  const descr = document.querySelector("#descr");
  profileName.textContent = name.value;
  profileDescr.textContent = descr.value;
}

function likesCard() {
  const photoLikeButton = document.querySelectorAll(".photo__btn");

  photoLikeButton.forEach(function (i) {
    i.addEventListener("click", function (e) {
      e.preventDefault();
      e.target.classList.toggle("photo__btn_active");
    });
  });
  return photoLikeButton;
}

popopAddButton.addEventListener("click", function (e) {
  e.preventDefault();
  editForm();
  togglePopup();
});

function openPhotoToggle() {
  const imageBlockContainer = document.querySelector(".image-block");
  return imageBlockContainer.classList.toggle("image-block_opened");
}

const openPhotoButton = document.querySelector(".image-block__close");
openPhotoButton.addEventListener("click", openPhotoToggle);

function openPhoto(name, link) {
  const image = document.querySelector(".image-block__photo");
  image.src = link;
  image.alt = link;
  const descr = document.querySelector(".image-block__descr");
  descr.textContent = name;
  openPhotoToggle();
}

profileEditButton.addEventListener("click", togglePopup);
popupCloseButton.addEventListener("click", togglePopup);

function deleteCards() {
  const photoDeleteButton = document.querySelectorAll(".photo__btn-delete");
  photoDeleteButton.forEach(function (button, item) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      delete initialCards[item];
      photoBlock.removeChild(button.closest(".photo__item"));
    });
  });
}

function openPopupImage() {
  const cardImage = document.querySelectorAll(".photo__img");
  cardImage.forEach(function (i) {
    i.addEventListener("click", function () {
      const cardDescr = i.parentNode.children[2].children[0].textContent;
      openPhoto(cardDescr, i.src);
    });
  });
}

function popupMestoRender() {
  const mesto = document.querySelector("#mesto");
  const link = document.querySelector("#link");
  initialCards.push({
    name: mesto.value,
    link: link.value,
  });
  const item = template.querySelector(".photo__item").cloneNode(true);
  item.querySelector(".photo__img").src = link.value;
  item.querySelector(".photo__text").textContent = mesto.value;
  mesto.value = "";
  link.value = "";
  togglePopupMesto();
  photoBlock.prepend(item);
  likesCard();
  openPopupImage();
  deleteCards();
}

function togglePopupMesto() {
  const popupMesto = document.querySelector(".popup-mesto");
  popupMesto.classList.toggle("popup_opened");
}

const popupMestoCloseButton = document.querySelector(".popup-mesto-close");
const popupMestoAddButton = document.querySelector(".popup-mesto__form-btn");

profileAddButton.addEventListener("click", togglePopupMesto);
popupMestoCloseButton.addEventListener("click", togglePopupMesto);

popupMestoAddButton.addEventListener("click", function (e) {
  e.preventDefault();
  popupMestoRender();
});

likesCard();
openPopupImage();
deleteCards();
