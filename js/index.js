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
const contactEntreprise = document.getElementById("contactEntreprise");
const contactEmail = document.getElementById("contactEmail");
const contactPhone = document.getElementById("contactPhone");
const saveContactButton = document.getElementById("saveContactButton");
const addContactEmailButton = document.getElementById("addContactEmailButton");
//
const emailContaint = document.getElementById("emailContaint");

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

//

// Fonction pour afficher les contacts dans le tableau
const displayContactsInTable = () => {
  const contactTableBody = document.getElementById("contactTableBody");

  // Vider le tableau avant de le mettre à jour
  contactTableBody.innerHTML = "";

  // Parcourir tous les contacts et les ajouter dans le tableau
  contacts.forEach((contact, index) => {
    const row = document.createElement("tr");

    // Créer une cellule pour chaque propriété du contact
    const nameCell = document.createElement("td");
    nameCell.textContent = `${contact.firstName} ${contact.name}`;
    row.appendChild(nameCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = contact.emails.join(", ");
    row.appendChild(emailCell);

    const phoneCell = document.createElement("td");
    phoneCell.textContent = contact.telephone;
    row.appendChild(phoneCell);

    const fonctionEntrepriseCell = document.createElement("td");
    fonctionEntrepriseCell.textContent = `${contact.fonction} , ${contact.entreprise}`;
    row.appendChild(fonctionEntrepriseCell);

    // Ajouter la ligne au corps du tableau
    contactTableBody.appendChild(row);
  });
};

//

// Fonction de réinitialisation du formulaire
const resetForm = () => {
  // Réinitialiser les champs de base
  contactName.value = "";
  contactFirstName.value = "";
  contactEntreprise.value = "";
  contactFonction.value = "";
  contactEmail.value = "";
  contactPhone.value = "";

  // Supprimer tous les autres champs email ajoutés dynamiquement
  const additionalEmails = document.querySelectorAll("input[name='contactEmail']");
  additionalEmails.forEach((input) => {
    input.value = ""; // Réinitialiser la valeur de l'input
  });

  // Supprimer les champs email supplémentaires du DOM (s'ils existent)
  const emailContainers = document.querySelectorAll("#emailContaint > div");
  emailContainers.forEach((container, index) => {
    if (index > 0) { // Garder uniquement le premier champ email
      container.remove();
    }
  });
};

//
saveContactButton.addEventListener("click", (event) => {
  event.preventDefault();

  const contact = {
    name: contactName.value,
    firstName:  contactFirstName.value,
    entreprise: contactEntreprise.value,
    fonction: contactFonction.value,
    emails: [contactEmail.value],
    telephone: contactPhone.value,

  };

   // Ajouter les autres e-mails s'ils existent
   const additionalEmails = document.querySelectorAll("input[name='contactEmail']");
   additionalEmails.forEach((input) => {
     if (input.value && !contact.emails.includes(input.value)) {
       contact.emails.push(input.value);
     }
   });

  //
  contacts.push(contact);
  
    // Afficher les contacts dans le tableau
    displayContactsInTable();
  //

  resetForm();

  //
  console.log(contacts);
  goBackHome();
});

// Evenement click addContactEmailButton
addContactEmailButton.addEventListener("click", () => {
  // 
  const newEmailContainer = document.createElement("div");
  newEmailContainer.classList.add("flex", "justify-start", "items-center");

  // 
  const newEmailInput = document.createElement("input");
  newEmailInput.classList.add("input-form");
  newEmailInput.setAttribute("type", "email");
  newEmailInput.setAttribute("name", "contactEmail");
  newEmailInput.setAttribute("placeholder", "Email");

  // 
  const emailIcon = document.createElement("span");
  emailIcon.classList.add("material-symbols-outlined", "margin-right-04rem");
  emailIcon.textContent = "mail";

  // 
  newEmailContainer.appendChild(emailIcon);
  newEmailContainer.appendChild(newEmailInput);

  // 
  emailContaint.appendChild(newEmailContainer);
});


