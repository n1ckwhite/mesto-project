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
const profileCloseButton = document.querySelector(
  ".popup-profile__close-button"
);
const profileMestoCloseButton = document.querySelector(
  ".popup-mesto__button-close"
);
const profileAddButton = document.querySelector(".profile__add-button");
const profileNameInput = document.querySelector("#name");
const profileDescrInput = document.querySelector("#descr");
const ProfileSaveButton = document.querySelector("#saveProfile");
const mestoName = document.querySelector("#mesto");
const mestoLink = document.querySelector("#link");
const mestoCreateButton = document.querySelector("#createButton");

profileEditButton.addEventListener("click", function () {
  openPopup(document.querySelector(".popup-profile"));
});

profileAddButton.addEventListener("click", function () {
  openPopup(document.querySelector(".popup-mesto"));
});

profileMestoCloseButton.addEventListener("click", function () {
  closePopup(document.querySelector(".popup-mesto"));
});

profileCloseButton.addEventListener("click", function () {
  closePopup(document.querySelector(".popup-profile"));
});

ProfileSaveButton.addEventListener("click", function (e) {
  e.preventDefault();
  editProfile(document.querySelector(".popup-profile"));
  closePopup(document.querySelector(".popup-profile"));
});

mestoCreateButton.addEventListener("click", function (e) {
  e.preventDefault();
  createCard(mestoLink.value, mestoName.value);
  mestoLink.value = "";
  mestoName.value = "";
  closePopup(document.querySelector(".popup-mesto"));
});

function editProfile() {
  const profileName = document.querySelector(".profile__name");
  const profileDescr = document.querySelector(".profile__descr");
  profileName.textContent = profileNameInput.value;
  profileDescr.textContent = profileDescrInput.value;
}

function createCard(link, name) {
  const card = template.cloneNode(true);
  card.querySelector(".photo__img").src = link;
  card.querySelector(".photo__img").alt = name;
  card.querySelector(".photo__text").textContent = name;
  card.querySelector(".photo__btn").addEventListener("click", cardLikes);
  card.querySelector(".photo__img").addEventListener("click", function () {
    openPhoto(this.alt, this.src);
    openPopup(document.querySelector(".image-block"));
  });
  card
    .querySelector(".photo__btn-delete")
    .addEventListener("click", deleteCardItem);
  return cardsContainer.prepend(card);
}

function cardLikes() {
  return this.classList.toggle("photo__btn_active");
}

function openPhoto(alt, src) {
  const photoItem = document.querySelector(".image-block__photo");
  const photoDescr = document.querySelector(".image-block__descr");
  const photoCloseButton = document.querySelector(".image-block__button-close");
  photoItem.src = src;
  photoItem.alt = alt;
  photoDescr.textContent = alt;
  photoCloseButton.addEventListener("click", function () {
    closePopup(document.querySelector(".image-block"));
  });
}

function deleteCardItem() {
  return cardsContainer.removeChild(this.closest(".photo__item"));
}

function openPopup(block) {
  return block.classList.add("popup_opened");
}

function closePopup(block) {
  return block.classList.remove("popup_opened");
}

initialCards.forEach(function (i) {
  return createCard(i.link, i.name);
});
