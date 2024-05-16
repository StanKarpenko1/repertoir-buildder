describe('GraphQL Query: getSongs', () => {
    it('should fetch all songs', () => {
      const query = `
        query getSongs {
          songs {
            id
            name
            style
          }
        }
      `;
  
      cy.request({
        method: 'POST',
        url: '/', 
        body: {
          query,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property('songs');
        expect(response.body.data.songs).to.be.an('array');
        expect(response.body.data.songs).to.have.length.greaterThan(0);
        response.body.data.songs.forEach((song) => {
          expect(song).to.have.property('id');
          expect(song).to.have.property('name');
          expect(song).to.have.property('style');
        });
      });
    });
  });
  