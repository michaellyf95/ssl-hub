var header1 = document.querySelector('.header-1');
var header2 = document.querySelector('.header-2');
var sideNav = document.querySelector('.edoc-sidenav');
var bttbtn = document.querySelector('.btt-btn');
var wrapper_sidenav = document.querySelector('.wrapper-content-sidenavhover');
var content = document.querySelector('.content');

// PRINT SCREEN
function printDiv() {
  beforePrint();
  window.print();
  afterPrint();
}

function beforePrint() { 
  prependUserTitle(true);
  showHiddenContent(true);
  wrapper_sidenav.classList.toggle('onprint');
  content.classList.toggle('onprint');
  header1.style.display = 'none';
  header2.style.display = 'none';
  sideNav.style.display = 'none';
  bttbtn.style.display = 'none';
}

function afterPrint() {
  prependUserTitle(false);
  showHiddenContent(false);
  wrapper_sidenav.classList.toggle('onprint');
  content.classList.toggle('onprint');
  header1.style.display = 'block';
  header2.style.display = 'block';
  sideNav.style.display = 'block';
  bttbtn.style.display = 'block';
}

function prependUserTitle(val) {
  if (val == true) {
    var docuser = document.createElement('h1');
    docuser.className = 'title-print'
    docuser.innerHTML = 'GAMZO';
    content.prepend(docuser);
  }
  else {
    var docuser = document.querySelector('.title-print')
    docuser.remove();
  }
}