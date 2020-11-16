describe('Pagination', () => {
	const currentPage = '.tify-page-select_button';

	it('Change page via buttons', () => {
		cy.visit('/?manifest=http://localhost:8081/manifest/gdz-HANS_DE_7_w042081.json&tify={"pages":[15]}');
		cy
			.get('.tify-app_main')
			.then(() => {
				cy.contains(currentPage, '15 : 7r');

				cy.contains('First page').click();
				cy.contains(currentPage, '1 :  -');

				cy.contains('Next page').click().click();
				cy.contains(currentPage, '3 : 1r');

				cy.contains('Next section').click().click();
				cy.contains(currentPage, '7 : 3r');

				cy.contains('Last page').click();
				cy.contains(currentPage, '69 :  -');

				cy.contains('Previous section').click().click().click().click();
				cy.contains('16 : 7v');

				cy.contains('Toggle double-page').click();
				cy.contains('.-active', 'Toggle double-page');
			});
	});

	it('Change page via keyboard', () => {
		cy.visit('/?manifest=http://localhost:8081/manifest/gdz-HANS_DE_7_w042081.json&tify={"pages":[15]}');
		cy
			.get('.tify-app_main')
			.then(() => {
				cy.contains(currentPage, '15 : 7r');

				cy.get('body').type('q');
				cy.contains(currentPage, '14 : 6v');
				cy.get('body').type('e');
				cy.contains(currentPage, '15 : 7r');

				cy.get('body').type('b');
				cy.contains(currentPage, '14 : 6v');
				cy.contains('.-active', 'Toggle double-page');

				cy.get('body').type('q');
				cy.contains(currentPage, '12 : 5v');
				cy.get('body').type(',');
				cy.contains(currentPage, '10 : 4v');

				cy.get('body').type('e');
				cy.contains(currentPage, '12 : 5v');
				cy.get('body').type('.');
				cy.contains(currentPage, '14 : 6v');

				cy.get('body').type('Q');
				cy.contains(currentPage, '1 :  -');

				cy.get('body').type('E');
				cy.contains(currentPage, '68 :  -');

				cy.get('body').type('b');
				cy.contains(currentPage, '68 :  -');
				cy.contains('.-active', 'Toggle double-page').should('not.be.visible');

				cy.get('body').type('Q');
				cy.contains(currentPage, '1 :  -');

				cy.get('body').type('E');
				cy.contains(currentPage, '69 :  -');
			});
	});
});
