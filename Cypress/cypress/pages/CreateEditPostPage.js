import PostListPage from "./PostListPage";

class CreateEditPostPage {
  fillTitle(value) {
    cy.get('textarea.gh-editor-title').clear({force: true}).type(value);

    return this;
  }

  fillContent(value) {
    let editor = cy.get('div.koenig-editor__editor');
    editor.click();
    if (value != "")
      editor.clear({force: true}).type(value);

    return this;
  }

  goToPosts() {
    cy.get('a').contains('Posts').click()

    return new PostListPage();
  }
}

export default CreateEditPostPage;
