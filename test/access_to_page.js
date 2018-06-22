const Nightmare = require('nightmare');
const {expect} = require('chai');

const SavedRepliesPage = require('../page/savedRepliesPage');


describe('access to saved replies page', function () {
  const sp = new SavedRepliesPage();
  this.timeout('15s');

  context('if user is not authorized and tried to access `Saved replies` page', () => {
    it('he is redirected to login page', () => {
      nightmare = new Nightmare({
        show: true
      });
      return sp.openPageAndGetTitle()
        .then((title) => {
          expect(title).to.equal('Sign in to GitHub · GitHub');
        });
    });
  });
});