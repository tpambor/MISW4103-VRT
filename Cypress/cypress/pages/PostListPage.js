import CreateEditPostPage from "./CreateEditPostPage";

class PostListPage {
  createNewPost() {
    cy.contains('a', 'New post').click();

    return new CreateEditPostPage();
  }

  getPostNames() {
    return cy.get('h3.gh-content-entry-title');
  }
}
    
export default PostListPage;
