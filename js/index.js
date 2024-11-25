// Selects all elements
const burgerMenu = document.querySelector("#burger-menu");
const sideBarMenu = document.querySelector("#side-bar");
const mainSection = document.querySelector("#main-section");
//
const addContactButtonList = document.querySelectorAll(".add-contact");
const arrowBack = document.getElementById("arrowBack");
//
const contactListContainer = document.getElementById("contactListContainer");
const emptyList = document.getElementById("emptyList");
const contactList = document.getElementById("contactList");
//
const contactForm = document.getElementById("contactForm");
//
const contactName = document.getElementById("contactName");
const contactFirstName = document.getElementById("contactFirstName");
const contactFonction = document.getElementById("contactFonction");
const saveContactButton = document.getElementById("saveContactButton");
//
const contacts = [];

// Callback functions
const handleAddStyle = (element, style) => {
  element.classList.add(style);
};

const handleRemoveStyle = (element, style) => {
  element.classList.remove(style);
};

const goBackHome = () => {
  handleRemoveStyle(contactListContainer, "display-none");
    handleAddStyle(contactListContainer, "display-visible");
    //
    handleRemoveStyle(contactForm, "display-visible");
    handleAddStyle(contactForm, "display-none");
    if (contacts.length >0){
      handleRemoveStyle(contactList, "display-none");
      handleAddStyle(contactList, "display-visible");
      //
      handleRemoveStyle(emptyList, "display-visible");
      handleAddStyle(emptyList, "display-none");

    } else{
      handleRemoveStyle(contactList, "display-visible");
      handleAddStyle(contactList, "display-none");
      //
      handleRemoveStyle(emptyList, "display-none");
      handleAddStyle(emptyList, "display-visible");
    }
}

// Add events

burgerMenu.addEventListener("click", (event) => {
  if (sideBarMenu.classList.contains("display-none")) {
    handleRemoveStyle(sideBarMenu, "display-none");
    handleRemoveStyle(mainSection, "w-100");
  } else {
    handleAddStyle(sideBarMenu, "display-none");
    handleAddStyle(mainSection, "w-100");
  }
});

addContactButtonList.forEach((addContactButton)=>{
  addContactButton.addEventListener("click",()=>{
    handleRemoveStyle(contactListContainer, "display-visible");
    handleAddStyle(contactListContainer, "display-none");
    //
    handleRemoveStyle(contactForm, "display-none");
    handleAddStyle(contactForm, "display-visible");

  }
  )
}
)

arrowBack.addEventListener("click",()=>{
  goBackHome();
})

saveContactButton.addEventListener("click", (event) => {
  event.preventDefault();

  const contact = {
    name: contactName.value,
    firstName:  contactFirstName.value,
    fonction: contactFonction.value,
  };
  contacts.push(contact);
  //
  contactName.value = "";
  contactFirstName.value = "";
  //
  console.log(contacts);
  goBackHome();
})
