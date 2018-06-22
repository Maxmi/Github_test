const Nightmare = require('nightmare');
const {expect} = require('chai');
const elems = require('../page/elems');
const SavedRepliesPage = require('../page/savedRepliesPage');


describe('page elements', function () {
  const sp = new SavedRepliesPage();
  this.timeout('15s');

  context('page elements and form', () => {
    beforeEach('sign in to Github', () => {
      nightmare = new Nightmare({
        show: true
      });
      sp.signInToGithub();
    });

    it('if user doesn\'t have saved replies yet, the `Saved replies` section is empty', () => {
      return nightmare
        .evaluate(() => {
          return document.querySelector('div.blankslate').innerText;
        })
        .end()
        .then((text) => {
          expect(text).to.contain('No saved replies yet.');
        });
    });


    it('clicking on `Learn more` link in the `Saved replies` section opens new page', () => {
      return sp.followLinkAndGetTitle()
        .then((title) => {
          expect(title).to.equal('Working with saved replies - User Documentation');
        });
    });


    it('form for saving replies exists on the page', () => {
      return nightmare
        .evaluate(() => {
          return document.getElementById('new_saved_reply');
        })
        .end()
        .then((form) => {
          expect(form).to.be.not.null;
        });
    });


    it('button for adding saved replies is disabled when form is empty', () => {
      return nightmare
        .evaluate(() => {
          return document.querySelector('button.btn.btn-primary').disabled
        })
        .end()
        .then((attr) => {
          expect(attr).to.be.true;
        });
    });


    it('user can\'t save the reply if only title provided', () => {
      return sp.fillOnlyOneField(elems.titleField, elems.titleText)
        .then((attr) => {
          expect(attr).to.be.true;
        });
    });

    it('user can\'t save the reply if only body provided', () => {
      return sp.fillOnlyOneField(elems.bodyField, elems.bodyText)
        .then((attr) => {
          expect(attr).to.be.true;
        });
    });

    it('button for saving replies is clickable only when both title and body provided', () => {
      return sp.fillOutFormAndWait()
        .then((attr) => {
          expect(attr).to.be.false;
        });
    });

    
    it('reply is not saved if user typed empty string in title and body', () => {
      return sp.sendEmptyStrToFormAndSave()
        .evaluate(() => {
          return document.querySelector('div.blankslate').innerText;
        })
        .end()
        .then((text) => {
          expect(text).to.contain('No saved replies yet.');
        });
    });


    it('error message is rendered if user typed empty string in title and body', () => {
      return sp.sendEmptyStrToFormAndSave()
        .evaluate(() => {
          return document.querySelector('div.container').innerText
        })
        .end()
        .then((text) => {
          expect(text).to.contain('Error creating your saved reply.');
        });
    });
  }); 

});