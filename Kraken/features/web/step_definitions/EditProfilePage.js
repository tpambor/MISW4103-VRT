const EditProfilePage = {
  staff: {
    linkSideMenu: "ul.gh-nav-manage li:nth-child(5)",
    userToEdit: ".author",
    inputName: "#user-name",
    userEditedName: ".apps-grid-cell:last-of-type .apps-card-app-title",
    userEdited: ".apps-grid-cell:last-of-type",
    
    inputLocation: "#user-location",
    facebook: "#user-facebook",
    twitter: "#user-twitter",
    website: "#user-website",
    inputBio: "#user-bio",

    saveBtn: ".gh-btn-blue",
    
    saveNewPassBtn: ".button-change-password",
  }
  
};

global.EditProfilePage = EditProfilePage;
