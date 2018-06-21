const Nightmare = require('nightmare');
const {expect} = require('chai');
const elems = require('../page/elems');

const SavedRepliesPage = require('../page/savedRepliesPage');
const sp = new SavedRepliesPage();

describe('replies', function () {
 
  this.timeout('15s');
  
  context('saved replies', () => {
    
    beforeEach('sign in to Github and create a saved reply', () => {
      nightmare = new Nightmare({
        show: true
      });
        sp.signInToGithub()
        sp.createSavedReply()
    });
    
    afterEach('delete created reply', () => {
      nightmare = new Nightmare({
        show: true
      });
      sp.signInToGithub()
      sp.deleteSavedReply()
    });
    
    it('success message is rendered on the top of the page after saving the reply', () => {
      return nightmare
        .evaluate(() => {
          return document.querySelector('div.container').innerText
        })
        .end()
        .then((text) => {
          expect(text).to.equal('Your saved reply was created successfully.');
        });
    });

    it('saved reply is rendered on the same page in `Saved replies` section', () => {
      return nightmare
        .evaluate(() => {
          return document.querySelector('div.listgroup').hasChildNodes();
        })
        .end()
        .then((prop) => {
          expect(prop).to.be.true;
        });
    });
    
    it('saved reply can be edited', () => {
      return nightmare
        .evaluate(() => {
          return document.querySelector('form.BtnGroup-form');
        })
        .end()
        .then((button) => {
          expect(button).to.be.not.null;
        });
    });
    
    it('clicking on Edit button opens new page', () => {
      return sp.editSavedReply()
        .evaluate(() => {
            return document.title
          })
        .end()
        .then((title) => {
          expect(title).to.equal('Edit Saved Replies');
        });
    });
    
    it('saved reply can be deleted', () => {
      return nightmare
        .evaluate(() => {
          return document.querySelector('form.js-saved-reply-delete.BtnGroup-form')
        })
        .end()
        .then((button) => {
          expect(button).to.be.not.null;
        });
    });
    
  });//end of context
  
  context('formatting bar', () => {
    beforeEach('sign in to Github and type a title, then...', () => {
      nightmare = new Nightmare({
        show: true
      });
      sp.signInToGithub()
      sp.fillOnlyOneField(elems.titleField, 'md title')
    });
    
    it('clicking on `B` button in formatting bar makes a text bold', () => {
      return sp.useFormattingBar(elems.mdBold, 'this is bold text')
        .evaluate(() => {
          return document.querySelector('div.markdown-body > p').innerHTML
        })
        .end()
        .then((html) => {
          expect(html).to.equal('<strong>this is bold text</strong>')
        })
    });
    
    it('clicking on @ button mentiones a github user', () => {
      return sp.useFormattingBar(elems.mdMention, 'Maxmi')
        .evaluate(() => {
          return document.querySelector('div.markdown-body > p > a').getAttribute('href')
        })
        .end()
        .then((href) => {
          expect(href).to.equal('https://github.com/Maxmi')
        })
    });
  }); //end of context
  
}); //most outer describe