describe('Instagram Stories', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the story list', () => {
    cy.get('[class*="storyList"]').should('be.visible')
    cy.get('[class*="storyPreview"]').should('have.length.at.least', 1)
  })

  it('opens story viewer when clicking a story', () => {
    cy.get('[class*="storyPreview"]').first().click()
    cy.get('[class*="storyViewer"]').should('be.visible')
  })

  it('shows story progress bars', () => {
    cy.get('[class*="storyPreview"]').first().click()
    cy.get('[class*="progressBar"]').should('have.length.at.least', 1)
  })

  it('navigates between stories', () => {
    cy.get('[class*="storyPreview"]').first().click()
    
    // Wait for the first story to be visible
    cy.get('[class*="storyViewer"]').should('be.visible')
    
    // Click the right side to go to next story
    cy.get('[class*="navButton"]').last().click()
    
    // Verify navigation occurred by checking URL or story content changed
    cy.get('[class*="storyImage"]').should('have.attr', 'src').and('include', 'sig=2')
  })

  it('automatically advances to next story after 5 seconds', () => {
    cy.get('[class*="storyPreview"]').first().click()
    
    // Wait for the first story to be visible
    cy.get('[class*="storyViewer"]').should('be.visible')
    
    // Wait for 5 seconds
    cy.wait(5000)
    
    // Verify story advanced
    cy.get('[class*="storyImage"]').should('have.attr', 'src').and('include', 'sig=2')
  })
}) 