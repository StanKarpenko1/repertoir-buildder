describe('GraphQL Query: getSongs', () => {

  const post = 'POST'

  context ('fetch all songs', () => {
    it('should fetch all songs', () => {
      const query = `
      query getSongs {
        songs {
          id
          name
          event
          mood
          notes
          progress
          style
          performance
        }
      }
      `;
  
      cy.request({
        method: post,
        url: '/', 
        body: {
          query,
        },
      }).then((response) => {
        const thisData = response.body.data
        expect(response.status).to.eq(200);
        expect(thisData).to.have.property('songs');
        expect(thisData.songs).to.be.an('array');
        expect(thisData.songs).to.have.length.greaterThan(0);

        const dbLength = thisData.songs.length
        const randomSongIndex = Math.floor(Math.random() * dbLength)
        const randomSong = thisData.songs[randomSongIndex]

        expect(randomSong).to.have.property('id');
        expect(randomSong).to.have.property('name');
        expect(randomSong).to.have.property('style').that.is.an('array');
        expect(randomSong).to.have.property('mood').that.is.an('array');
        expect(randomSong).to.have.property('event').that.is.an('array');
        expect(randomSong).to.have.property('performance').that.is.a('array');
        expect(randomSong).to.have.property('progress').that.is.a('string');
        expect(randomSong).to.have.property('notes');
      });
    });
  })

  context ('single argument queries', () => {
    it('should fetch songs filtered by mood', () => {
      const query = `
        query songFilter($mood: Mood) {
          songFilter(mood: $mood) {
            id
            name
          }
        }
      `;
  
      cy.request({
        method: post,
        url: '/',
        body: {
          query,
          variables: {
            mood: 'romantic'
          }
        },
      }).then((response) => {

        const thisData = response.body.data;
        const dbLength = thisData.songFilter.length
        const randomSongIndex = Math.floor(Math.random() * dbLength)
        const randomSong = thisData.songFilter[randomSongIndex]

        expect(response.status).to.eq(200);
  
          expect(randomSong).to.have.property('name');
          expect(randomSong).to.have.property('id');
      });
    });
    it('should fetch songs filtered by performance', () => {
      const query = `
        query songFilter($performance: Performance) {
          songFilter(performance: $performance) {
            id
            name
          }
        }
      `;
  
      cy.request({
        method: post,
        url: '/',
        body: {
          query,
          variables: {
            performance: 'solo'
          }
        },
      }).then((response) => {
        const thisData = response.body.data;
        const dbLength = thisData.songFilter.length;
        const randomSongIndex = Math.floor(Math.random() * dbLength);
        const randomSong = thisData.songFilter[randomSongIndex];
  
        expect(response.status).to.eq(200);
        expect(randomSong).to.have.property('name');
        expect(randomSong).to.have.property('id');
      });
    });
    it('should fetch songs filtered by style', () => {
      const query = `
        query songFilter($style: Style) {
          songFilter(style: $style) {
            id
            name
          }
        }
      `;
  
      cy.request({
        method: post,
        url: '/graphql',
        body: {
          query,
          variables: {
            style: 'jazz'
          }
        },
      }).then((response) => {
        const thisData = response.body.data;
        const dbLength = thisData.songFilter.length;
        const randomSongIndex = Math.floor(Math.random() * dbLength);
        const randomSong = thisData.songFilter[randomSongIndex];
  
        expect(response.status).to.eq(200);
        expect(randomSong).to.have.property('name');
        expect(randomSong).to.have.property('id');
      });
    });
    it('should fetch songs filtered by event', () => {
      const query = `
        query songFilter($event: Event) {
          songFilter(event: $event) {
            id
            name
          }
        }
      `;
  
      cy.request({
        method: post,
        url: '/graphql',
        body: {
          query,
          variables: {
            event: 'wedding'
          }
        },
      }).then((response) => {
        const thisData = response.body.data;
        const dbLength = thisData.songFilter.length;
        const randomSongIndex = Math.floor(Math.random() * dbLength);
        const randomSong = thisData.songFilter[randomSongIndex];
  
        expect(response.status).to.eq(200);
        expect(randomSong).to.have.property('name');
        expect(randomSong).to.have.property('id');
      });
    });
    it('should fetch songs filtered by progress', () => {
      const query = `
        query songFilter($progress: Progress) {
          songFilter(progress: $progress) {
            id
            name
          }
        }
      `;
  
      cy.request({
        method: post,
        url: '/graphql',
        body: {
          query,
          variables: {
            progress: 'ready'
          }
        },
      }).then((response) => {
        const thisData = response.body.data;
        const dbLength = thisData.songFilter.length;
        const randomSongIndex = Math.floor(Math.random() * dbLength);
        const randomSong = thisData.songFilter[randomSongIndex];
  
        expect(response.status).to.eq(200);
        expect(randomSong).to.have.property('name');
        expect(randomSong).to.have.property('id');
      });
    });
  })

  context('Query songFilter with multiple arguments', () => {
    const testCases = [
      { mood: 'romantic', event: 'wedding' },
      { style: 'jazz', performance: 'solo' },
      { mood: 'upbeat', progress: 'ready' },
      { mood: 'romantic', event: 'wedding',  performance: 'solo'},
      { mood: 'upbeat', event: 'wedding',  performance: 'solo'},
      // Add more combinations as needed
    ];
    Cypress._.each(testCases, (testCase) => {
      it(`should fetch songs filtered by ${Object.keys(testCase).join(' and ')}`, () => {
        const query = `
          query songFilter($mood: Mood, $style: Style, $event: Event, $performance: Performance, $progress: Progress) {
            songFilter(mood: $mood, style: $style, event: $event, performance: $performance, progress: $progress) {
              id
              name
            }
          }
        `;
  
        cy.request({
          method: post,
          url: '/graphql',
          body: {
            query,
            variables: testCase,
          },
        }).then((response) => {
          const thisData = response.body.data;
          const dbLength = thisData.songFilter.length;
          const randomSongIndex = Math.floor(Math.random() * dbLength);
          const randomSong = thisData.songFilter[randomSongIndex];
  
          expect(response.status).to.eq(200);
          expect(randomSong).to.have.property('name');
          expect(randomSong).to.have.property('id');
        });
      });
    });
  })


  
    
    
  });

 
  