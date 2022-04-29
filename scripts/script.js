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

const cardsContainer = document.querySelector(".photo__grid");
const template = document.querySelector("#card").content;
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileNameInput = document.querySelector("#name");
const profileDescrInput = document.querySelector("#descr");
const profileSaveButton = document.querySelector("#saveProfile");
const mestoName = document.querySelector("#mesto");
const mestoLink = document.querySelector("#link");
const mestoCreateButton = document.querySelector("#createButton");
const popupProfile = document.querySelector(".popup-profile");
const cardPopup = document.querySelector(".popup-mesto");
const imagePopup = document.querySelector(".image-block");
const profileName = document.querySelector(".profile__name");
const profileDescr = document.querySelector(".profile__descr");
const popupProfileCloseButton = document.querySelector(
  ".popup-profile__close-button"
);
const imagePopupCloseButton = document.querySelector(
  ".image-block__button-close"
);
const cardPopupCloseButton = document.querySelector(
  ".popup-mesto__button-close"
);

profileEditButton.addEventListener("click", function () {
  openPopup(popupProfile);
});

popupProfileCloseButton.addEventListener("click", function () {
  closePopup(popupProfile);
});

profileAddButton.addEventListener("click", function () {
  profileName.textContent = profileNameInput.value;
  profileDescr.textContent = profileDescr.value;
  openPopup(cardPopup);
});

cardPopupCloseButton.addEventListener("click", function () {
  closePopup(cardPopup);
});

imagePopup.addEventListener("click", function () {
  closePopup(imagePopup);
});

profileSaveButton.addEventListener("click", function (e) {
  e.preventDefault();
  editProfile();
  closePopup(popupProfile);
});

mestoCreateButton.addEventListener("click", function (e) {
  e.preventDefault();
  cardsContainer.prepend(createCard(mestoLink.value, mestoName.value));
  closePopup(cardPopup);
  mestoLink.value = null;
  mestoName.value = null;
});

function editProfile() {
  profileName.textContent = profileNameInput.value;
  profileDescr.textContent = profileDescrInput.value;
}

function createCard(link, name) {
  const card = template.cloneNode(true);
  const cardImg = card.querySelector(".photo__img");
  cardImg.src = link;
  cardImg.alt = name;
  card.querySelector(".photo__text").textContent = name;
  card.querySelector(".photo__btn").addEventListener("click", cardLikes);
  cardImg.addEventListener("click", function () {
    openPhoto(this.alt, this.src);
  });
  card
    .querySelector(".photo__btn-delete")
    .addEventListener("click", function (e) {
      e.target.closest(".photo__item").remove();
    });
  return card;
}

function cardLikes() {
  return this.classList.toggle("photo__btn_active");
}

function openPhoto(alt, src) {
  const photoItem = document.querySelector(".image-block__photo");
  const photoDescr = document.querySelector(".image-block__descr");
  photoItem.src = src;
  photoItem.alt = alt;
  photoDescr.textContent = alt;
  openPopup(imagePopup);
}

function openPopup(block) {
  block.classList.add("popup_opened");
}

function closePopup(block) {
  block.classList.remove("popup_opened");
}

initialCards.forEach(function (i) {
  cardsContainer.prepend(createCard(i.link, i.name));
});
