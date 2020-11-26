describe("Todo list e2e tests", () => {
  describe("when there are no items", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });

    describe("when you try to add an empty item", () => {
      beforeEach(() => {
        cy.get("[data-cy=add-btn]").click();
      });

      it("should not add anything to the list", () => {
        cy.get("[data-cy=item").should("have.length", 0);
      });
    });

    describe("when you try to add a valid item", () => {
      let itemTitle;
      beforeEach(() => {
        itemTitle = "make tea";
        cy.get("[data-cy=input]")
          .type(itemTitle)
          .should("have.value", itemTitle);
        cy.get("[data-cy=add-btn]").click();
      });

      it("should add one item to the list", () => {
        cy.get("[data-cy=item").should("have.length", 1);
      });

      it("should add the specific item to the list", () => {
        cy.get("[data-cy=item-title").should(($title) => {
          expect($title).to.have.length(1);
          expect($title.first()).to.contain(itemTitle);
        });
      });

      it("should persist even on page refresh", () => {
        cy.reload();
        cy.get("[data-cy=item").should("have.length", 1);
      });

      describe("when you remove the item", () => {
        beforeEach(() => {
          itemTitle = "make tea";
          cy.get("[data-cy=delete-btn]").click();
        });

        it("should remove the item", () => {
          cy.get("[data-cy=item").should("have.length", 0);
        });

        it("should persist even on page refresh", () => {
          cy.reload();
          cy.get("[data-cy=item").should("have.length", 0);
        });
      });
    });
  });
});
