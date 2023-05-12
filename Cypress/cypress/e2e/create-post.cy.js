import { faker } from '@faker-js/faker'
import PageFactory from '../pages/PageFactory';
import PageBase from '../pages/PageBase';

describe('Create post tests', () => {
  let pageFactory;

  before(() => {
    cy.request('/').then((response) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(response.body, 'text/html')
      const version = doc.querySelector('meta[name="generator"]').content
      pageFactory = new PageFactory(version)
      return version
    }).should('contain', 'Ghost')
  })

  beforeEach(() => {
    PageBase.resetStepCounter();
  })

  it('ESC01 - Create a draft post with only the title', () => {
    faker.seed(1001);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the posts page
    const createPost = nav.goToPosts()
      // And I create a new post
      .createNewPost();

    const postTitle = faker.lorem.words(2)

    createPost
      // And I fill in the title
      .fillTitle(postTitle)
      // And click on the editor but don't enter text
      .fillContent("")
      // And I go back to the list of posts
      .goToPosts()
      // Then I see the post in the list of draft posts
      .filterDraftPosts().getPostNames().contains(postTitle)
  })

  it('ESC02 - Create a draft post with title and description', () => {
    faker.seed(1002);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the posts page
    const createPost = nav.goToPosts()
      // And I create a new post
      .createNewPost();

    const postTitle = faker.lorem.words(2)

    createPost
      // And I fill in the title
      .fillTitle(postTitle)
      // And I fill in the description
      .fillContent(faker.lorem.lines(10))
      // And I go back to the list of posts
      .goToPosts()
      // Then I see the post in the list of draft posts
      .filterDraftPosts().getPostNames().contains(postTitle)
  })

  it('ESC03 - Create and publish a post with title and description', () => {
    faker.seed(1003);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the posts page
    const createPost = nav.goToPosts()
      // And I create a new post
      .createNewPost();

    const postTitle = faker.lorem.words(2)

    createPost
      // And I fill in the title
      .fillTitle(postTitle)
      // And I fill in the description
      .fillContent(faker.lorem.lines(10))
      // And I publish the post
      .publish()
      // And I go back to the list of posts
      .goToPosts()
      // Then I see the post in the list of published posts
      .filterPublishedPosts().getPostNames().contains(postTitle)
  })

  it('ESC04 - Create and publish a post with a slug', () => {
    faker.seed(1004);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the posts page
    const createPost = nav.goToPosts()
      // And I create a new post
      .createNewPost();

    const postTitle = faker.lorem.words(2)
    const postSlug = faker.lorem.slug()

    createPost
      // And I fill in the title
      .fillTitle(postTitle)
      // And I fill in the description
      .fillContent(faker.lorem.lines(10))
      // And I publish the post
      .publish()
      // And I open the settings of the post
      .openSettings()
      // And I fill in the slug
      .fillSlug(postSlug)
      // And I close the settings
      .close()

    createPost
      // And I go back to the list of posts
      .goToPosts()
      // Then I see the post in the list of published posts
      .filterPublishedPosts().getPostNames().contains(postTitle)

    // And I can navigate to the post using the slug
    cy.visit('/' + postSlug + '/')
    nav.screenshot('visitPage')
  })

  it('ESC05 - Create a draft post with a tag', () => {
    faker.seed(1005);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // And that I have a tag "Getting Started"
    nav.goToTags()
      .getTagNames().contains('Getting Started')

    // When I navigate to the posts page
    const createPost = nav.goToPosts()
      // And I create a new post
      .createNewPost();

    const postTitle = faker.lorem.words(2)

    createPost
      // And I fill in the title
      .fillTitle(postTitle)
      // And I open the settings of the post
      .openSettings()
      .selectTag('Getting Started')
      // And I close the settings
      .close()

    // And I fill in the description
    createPost.fillContent(faker.lorem.lines(10))

    // And I go back to the list of posts
    const postList = createPost.goToPosts()

    // Then I see the post in the list of draft posts
    postList.filterDraftPosts().getPostNames().contains(postTitle)
    // And I see the post in the list of posts with the tag "Getting Started"
    postList.filterByTag('Getting Started').getPostNames().contains(postTitle)
  })

  it('ESC06 - Create a post scheduled for later', () => {
    faker.seed(1006);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the posts page
    const createPost = nav.goToPosts()
      // And I create a new post
      .createNewPost();

    const postTitle = faker.lorem.words(2)

    createPost
      // And I fill in the title
      .fillTitle(postTitle)
      // And I fill in the description
      .fillContent(faker.lorem.lines(10))
      // And I choose to schedule the post for publication later
      .publishLater()
      // And I go back to the list of posts
      .goToPosts()
      // Then I see the post in the list of scheduled posts
      .filterScheduledPosts().getPostNames().contains(postTitle)
  })
})
