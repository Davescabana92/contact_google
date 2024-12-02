// Selects all elements
const burgerMenu = document.querySelector("#burger-menu");
const sideBarMenu = document.querySelector("#side-bar");
const mainSection = document.querySelector("#main-section");
//
const addContactButtonList = document.querySelectorAll(".addContactButton");
const arrowBack = document.getElementById("arrowBack");
//
const contactListContainer = document.getElementById("contactListContainer");
const emptyContactList = document.getElementById("emptyContactList");
const contactList = document.getElementById("contactList");
const contactListTable = document.getElementById("contactListTable");
//
const contactFormContainer = document.getElementById("contactFormContainer");
const contactFirstName = document.getElementById("contactFirstName");
const contactName = document.getElementById("contactName");
const contactFonction = document.getElementById("contactFonction");
const contactEntreprise = document.getElementById("contactEntreprise");
const contactEmail = document.getElementById("contactEmail");
const contactPhone = document.getElementById("contactPhone");
const labelContactSelect = document.getElementById("labelContactSelect");
const saveContact = document.getElementById("saveContact");
const addContactEmailButton = document.getElementById("addContactEmailButton");
const emailContaint = document.getElementById("emailContaint");
//
const labelPopup = document.getElementById("labelPopup");
const newLabelInput = document.getElementById("newLabel");
const closeLabelPopupButton = document.getElementById("closeLabelPopupButton");
const saveLabelPopupButton = document.getElementById("saveLabelPopupButton");
const addLabelContactButton = document.getElementById('addLabelContactButton')
//
const contacts = [];
const labels = [];
let tempContactIndex = null;

// Callback functions
const handleAddStyle = (element, style) => {
  element.classList.add(style);
};

const handleRemoveStyle = (element, style) => {
  element.classList.remove(style);
};

const hideElement = (element) => {
  handleRemoveStyle(element, "display-visible");
  handleAddStyle(element, "display-none");
};

const displayElement = (element) => {
  handleRemoveStyle(element, "display-none");
  handleAddStyle(element, "display-visible");
};

const createDeleteButton = () => {
  const buttonDeleteTaskItem = document.createElement("button");
  const buttonDeleteText = document.createTextNode("Supprimer");
  buttonDeleteTaskItem.appendChild(buttonDeleteText);
  buttonDeleteTaskItem.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.parentElement.remove();
  });
  return buttonDeleteTaskItem;
};

const goBackToContactList = () => {
  hideElement(contactFormContainer);
  displayElement(contactListContainer);
  if (contacts.length > 0) {
    hideElement(emptyContactList);
    displayElement(contactList);
  } else {
    hideElement(contactList);
    displayElement(emptyContactList);
  }
};

// Fonction pour afficher un libellé dans le conteneur
const displayLabelInContainer = (label) => {
  const labelContainer = document.createElement('div');
  labelContainer.classList.add('label-container'); // Vous pouvez ajouter des styles CSS ici

  const labelText = document.createElement('p');
  labelText.textContent = label;
  
  // Ajoutez le texte du libellé au conteneur
  labelContainer.appendChild(labelText);

  // Ajoutez le conteneur à la div où vous voulez afficher les libellés
  const labelContactListContainer = document.getElementById('labelContactListContainer');
  labelContactListContainer.appendChild(labelContainer);
};

// Afficher les groupes dans la liste déroulante
function updateLabelOptions() {
  labelContactSelect.innerHTML = '';
  labels.forEach(label => {
      const option = document.createElement('option');
      option.value = label;
      option.textContent = label;
      labelContactSelect.appendChild(option);
  });
}

const createContactRow = (contact, contactId) => {
  const contactBadge = contact.contactName[0].toUpperCase();
  return `
                  <td class="padding-top-bottom-1rem">
                    <div class="flex items-center gap-1rem">
                      <p class="text-badge">${contactBadge}</p>
                      <p>${contact.contactName} ${contact.contactFirstName}</p>
                    </div>
                  </td>
                  <td class="padding-top-bottom-1rem">${contact.emails.join(", ")}</td>
                  <td class="padding-top-bottom-1rem">${contact.telephone}</td>
                  <td class="padding-top-bottom-1rem">${contact.fonction} , ${contact.entreprise}</td>
                  <td class="padding-top-bottom-1rem">${contact.labelContact}</td>
                  <td class="padding-top-bottom-1rem">
                    <div class="flex gap-1rem">
                      <button id="${contactId}-update-button" class="btn btn-info addContactButton button-radius-07 flex items-center" type="button">
                        Modifier
                      </button>
                      <button id="${contactId}-delete-button" class="btn btn-danger addContactButton button-radius-07 flex items-center" type="button">
                        Supprimer
                      </button>
                    </div>
                  </td>
  `;
};

const addContactsToContactTable = () => {
  contactListTable.innerHTML = ""; // Clear the table before adding new rows

  contacts.forEach((contact, index) => {
    const contactId = contact.contactName + contact.contactFirstName + index;
    const contactRow = document.createElement("tr");
    contactRow.setAttribute("id", contactId);
    contactRow.innerHTML = createContactRow(contact, contactId);
    contactListTable.appendChild(contactRow);

    const deleteContact = document.getElementById(contactId + "-delete-button");
    if (deleteContact) {  // Check if the delete button exists
      deleteContact.addEventListener("click", () => {
        const contactItem = document.getElementById(contactId);  // Get the contact row again
        if (contactItem) {
          contactItem.remove();
          contacts.splice(index, 1);
          if (contacts.length === 0) {
            hideElement(contactList);
            displayElement(emptyContactList);
          }
          console.log("contacts : ", contacts);
        }
      });

    }

    const updateContact = document.getElementById(contactId + "-update-button");
if (updateContact) {
  updateContact.addEventListener("click", () => {
    // Remplir les champs de base
    contactFirstName.value = contact.contactFirstName;
    contactName.value = contact.contactName;
    contactFonction.value = contact.fonction;
    contactEntreprise.value = contact.entreprise;
    contactPhone.value = contact.telephone;
    labelContactSelect.value = contact.labelContact;

    // Remplir le premier champ email
    contactEmail.value = contact.emails[0] || ''; // Remplir avec le premier email s'il existe

    // Supprimer les champs email existants (si plusieurs)
    const additionalEmails = document.querySelectorAll("input[name='contactEmail']");
    additionalEmails.forEach((input, index) => {
      if (index > 0) { // Ne garder que les emails supplémentaires
        input.parentElement.remove(); // Supprimer le conteneur
      }
    });

    // Ajouter les autres emails
    contact.emails.slice(1).forEach((email) => {
      const newEmailContainer = document.createElement("div");
      newEmailContainer.classList.add("flex", "justify-start", "items-center");

      const newEmailInput = document.createElement("input");
      newEmailInput.classList.add("input-form");
      newEmailInput.setAttribute("type", "email");
      newEmailInput.setAttribute("name", "contactEmail");
      newEmailInput.setAttribute("placeholder", "Email");
      newEmailInput.value = email; // Ajouter l'email supplémentaire

      const emailIcon = document.createElement("span");
      emailIcon.classList.add("material-symbols-outlined", "margin-right-04rem");
      emailIcon.textContent = "mail";

      newEmailContainer.appendChild(emailIcon);
      newEmailContainer.appendChild(newEmailInput);
      emailContaint.appendChild(newEmailContainer);
    });

    tempContactIndex = index;  // Enregistrer l'index pour modification
    hideElement(contactListContainer);
    displayElement(contactFormContainer);
  });
}

  });

};

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

// Fonction de réinitialisation du formulaire
const resetForm = () => {
  // Réinitialiser les champs de base
  contactName.value = "";
  contactFirstName.value = "";
  contactEntreprise.value = "";
  contactFonction.value = "";
  contactEmail.value = "";
  contactPhone.value = "";
  labelContactSelect.value = "";

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

addContactButtonList.forEach((addContactButton) => {
  addContactButton.addEventListener("click", () => {
    tempContactIndex = null;
    hideElement(contactListContainer);
    displayElement(contactFormContainer);
  });
});

arrowBack.addEventListener("click", () => {
  goBackToContactList();
});

// Gestion du popup pour ajouter un groupe
addLabelContactButton.addEventListener("click", () => {
  displayElement(labelPopup);
  labelPopup.style.display="flex";
});

saveLabelPopupButton.addEventListener("click", () => {
  const newLabel = newLabelInput.value.trim();
  if (newLabel && !labels.includes(newLabel)) {
      labels.push(newLabel);
      // Affiche le libellé dans le conteneur
      displayLabelInContainer(newLabel);
      updateLabelOptions();
      console.log("Ajout d'un nouveau Label :", newLabel);
      console.log(labels);
  }
  newLabelInput.value = "";
  hideElement(labelPopup);
  labelPopup.style.display="none";
});

closeLabelPopupButton.addEventListener('click', () => {
  hideElement(labelPopup);
  labelPopup.style.display="none";
});

//
saveContact.addEventListener("click", (event) => {
  event.preventDefault();
  const contact = {
    contactFirstName: contactFirstName.value,
    contactName: contactName.value,
    entreprise: contactEntreprise.value,
    fonction: contactFonction.value,
    emails: [contactEmail.value],
    telephone: contactPhone.value,
    labelContact: labelContactSelect.value,
  };

   // Ajouter les autres e-mails s'ils existent
   const additionalEmails = document.querySelectorAll("input[name='contactEmail']");
   additionalEmails.forEach((input) => {
     if (input.value && !contact.emails.includes(input.value)) {
       contact.emails.push(input.value);
     }
   });

  if (tempContactIndex !== null) {
    // Mise à jour logique du contact dans le tableau `contacts`
    contacts[tempContactIndex] = contact;

    // Mise à jour visuelle : supprimer la ligne existante
    const contactId = contact.contactName + contact.contactFirstName + tempContactIndex;
    const contactRow = document.getElementById(contactId);
    if (contactRow) {
      contactRow.remove();  // Supprimer l'ancienne ligne
    }

    // Ajouter la nouvelle ligne avec les informations mises à jour
    updateLabelOptions();
    addContactsToContactTable();

  } else {
    // Ajout d'un nouveau contact
    contacts.push(contact);
    addContactsToContactTable();
  }

  // Réinitialisation des champs du formulaire
  resetForm();
  console.log("contacts : ", contacts);

  goBackToContactList();
});


