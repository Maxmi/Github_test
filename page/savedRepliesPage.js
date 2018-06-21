const Nightmare = require('nightmare');
const credentials = require('../page/credentials');
const elems = require('../page/elems');

class SavedRepliesPage {
  constructor() {
    this.elems = elems;
    this.credentials = credentials;
  }
  
  openPageAndGetTitle() {
    return nightmare
      .goto(this.elems.repliesUrl)
      .evaluate(() => {
        return document.title;
      })
      .end()
  }
  
  followLinkAndGetTitle() {
    return nightmare
      .click(this.elems.linkToLearnMorePage)
      .evaluate(() => {
        return document.title;
      })
      .end()
  }
  
  signInToGithub() {
    return nightmare
      .goto(this.elems.loginUrl)
      .type(this.elems.loginField, this.credentials.username)
      .type(this.elems.pswField, this.credentials.psw)
      .click(this.elems.signInBtn)
      .wait(1000)
      .goto(this.elems.profileUrl)
      .wait(this.elems.linkToRepliesPage)
      .click(this.elems.linkToRepliesPage)
      .wait(1000)
  }
  
  sendEmptyStrToFormAndSave() {
    return nightmare
      .type(this.elems.titleField, ' ')
      .type(this.elems.bodyField, ' ')
      .click(this.elems.saveReplyBtn)
      .wait(1000)
  }
  
  fillOutFormAndWait() {
    return nightmare
      .type(this.elems.titleField, this.elems.titleText)
      .type(this.elems.bodyField, this.elems.bodyText)
      .evaluate(() => {
          return document.querySelector('button.btn.btn-primary').disabled
        })
        .end()
  }
  
  fillOnlyOneField(field, text) {
    return nightmare
      .type(field, text)
      .evaluate(() => {
          return document.querySelector('button.btn.btn-primary').disabled
        })
        .end()
  }
  
  createSavedReply() {
    return nightmare
      .type(this.elems.titleField, this.elems.titleText)
      .type(this.elems.bodyField, this.elems.bodyText)
      .click(this.elems.saveReplyBtn)
      .wait(1000)
  }
  
  editSavedReply() {
    return nightmare
      .click(this.elems.editReplyBtn)
      .wait(1000)
  }
  
  deleteSavedReply() {
    return nightmare
      .wait(this.elems.deleteReplyBtn)
      .click(this.elems.deleteReplyBtn)
      .end()
  }
  
  useFormattingBar(elem, text) {
    return nightmare
      .click(elem)
      .type(elems.bodyField, text)
      .click(elems.previewTab)
      .wait(1000)
  }
  
} //end of class


module.exports = SavedRepliesPage;