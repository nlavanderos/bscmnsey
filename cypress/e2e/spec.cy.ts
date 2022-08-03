describe('homeAndTitle', () => {
  it('Visita la pagina y busca el titulo buscaminas', () => {
    cy.visit('/');
    assert(cy.get('h1').contains('Buscaminas'));
  });

  it(
    'Espera el evento click en un bomba',
    {
      retries: {
        runMode: 3,
        openMode: 1,
      },
    },
    (done) => {
      cy.visit('/').then((win) => {
        cy.get('.bomba', { timeout: 60000 }).then(async (jQueryElement) => {
          let elemHtml = jQueryElement.get(0);
          cy.log('ELEMENTO ENCONTRADO', elemHtml.toString());
          await elemHtml.addEventListener('click', (event) => {
            expect(event instanceof win['MouseEvent']).to.be.true;
          });
          done();
        });
      });
    }
  );
});
