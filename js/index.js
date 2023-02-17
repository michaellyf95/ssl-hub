var sideNav = document.querySelector('.edoc-sidenav');
var content = document.querySelector('.content');
var searchbar = document.querySelector('#searchbar');
var searchdd = document.querySelector('.search-dd');
var edocsidenavcaret = document.getElementsByClassName('edoc-sidenav-caret');
var edocsidenavsubcaret = document.getElementsByClassName('edoc-sidenav-subcaret');
var hubsidenavcaret = document.getElementsByClassName('hub-sidenav-caret');
var i;

// EDOC SIDEMENU TREEVIEW
for (i = 0; i < edocsidenavcaret.length; i++) {
  edocsidenavcaret[i].addEventListener('click', function() {
    this.parentElement.querySelector('.edoc-sidenav-nested').classList.toggle('edoc-sidenav-active');
    this.classList.toggle('edoc-sidenav-caret-down');
  });
}

for (i = 0; i < edocsidenavsubcaret.length; i++) {
  edocsidenavsubcaret[i].addEventListener('click', function() {
    this.parentElement.querySelector('.edoc-sidenav-nested').classList.toggle('edoc-sidenav-active');
    this.classList.toggle('edoc-sidenav-caret-down');
  });
}

// HUB SIDEMENU DROPDOWN
for (i = 0; i < hubsidenavcaret.length; i++) {
  hubsidenavcaret[i].addEventListener('click', function() {
    this.parentElement.querySelector('.hub-sidenav-nested').classList.toggle('hub-sidenav-active');
    var ico = this.querySelector('.fa');
    if(ico.className == 'fa fa-plus'){
      ico.className = 'fa fa-minus';
    }
    else {
      ico.className = 'fa fa-plus';
    }
  });
}

// GRID LIST VIEW
var gamelistcontent = document.querySelector('.hub-gamelist-content');
var gridlisticobtn = document.getElementById('gridlist-ico');

function toggleGridList() {
  if (gamelistcontent.classList.contains('grid')) {
    gamelistcontent.classList.remove('grid');
    gamelistcontent.classList.add('list');
    gridlisticobtn.className = 'fa fa-th-large';

    var gamediv = document.getElementsByClassName("hub-game-div");
    for(var i=0; i < gamediv.length; i++)
    {
      gamediv[i].classList.remove('grid');
      gamediv[i].classList.add('list');
    }
  }
  else {
    gamelistcontent.classList.remove('list');
    gamelistcontent.classList.add('grid');
    gridlisticobtn.className = 'fa fa-list';

    var gamediv = document.getElementsByClassName("hub-game-div");
    for(var i=0; i < gamediv.length; i++)
    {
      gamediv[i].classList.remove('list');
      gamediv[i].classList.add('grid');
    }
  }
}

// GAMELIST DETAILS
var overlay = document.querySelector('.hub-gamedetails-overlay');

function clickedGameDetails(id) {
  overlay.style.display = 'block';
}

function closeGameDetails() {
  overlay.style.display = 'none';
}

// CODE BOARD NAV
var codeboards = document.getElementsByClassName('edoc-codeboard').length;

for (i = 1; i < codeboards + 1; i++) {
  var trigger = 'default-code-' + i;
  document.getElementById(trigger).click();
}

function showCode(evt, tabid, lang) {
  var i;
  var box = document.getElementById(tabid)
  var boardcontent = box.getElementsByClassName('edoc-boardcontent');
  var tabbtn = box.getElementsByClassName('edoc-tab-btn');

  for (i = 0; i < boardcontent.length; i++) {
    boardcontent[i].classList.add('edoc-boardcontent-hide');
    boardcontent[i].classList.remove('edoc-boardcontent-show');
  }

  for (i = 0; i < tabbtn.length; i++) {
    tabbtn[i].className = tabbtn[i].className.replace(' edoc-boardtab-active', '');
  }

  document.getElementById(lang).classList.add('edoc-boardcontent-show');
  document.getElementById(lang).classList.remove('edoc-boardcontent-hide');
  evt.currentTarget.className += ' edoc-boardtab-active';
}

// CODE BOARD CLIPBOARD
function copyCode(tabid) {
  var box = document.getElementById(tabid)
  var boardcontent = box.getElementsByClassName('edoc-boardcontent');

  for (i = 0; i < boardcontent.length; i++) {
    if (!boardcontent[i].classList.contains('edoc-boardcontent-hide')) {
      var codeid = document.getElementById(boardcontent[i].id);
      var txt = codeid.querySelector('pre').innerText;
      navigator.clipboard.writeText(txt);
      copiedCode(box);
    }  
  }
}

function copiedCode(box) {
  var copyico = box.querySelector('.fa');
  var copybtn = box.querySelector('#copy-btn');

  copyico.style.display = 'none';
  var copiedtxt = document.createElement('Label');
  copiedtxt.innerHTML = 'Copied';
  copybtn.appendChild(copiedtxt);
  copybtn.disabled = true;

  setTimeout(function() {
    copyico.style.display = 'block';
    copybtn.removeChild(copybtn.children[1]);
    copybtn.disabled = false;
  },2000);
}

// SEARCH
searchbar.addEventListener("focusin", searchOnFocus);

document.addEventListener('click', function handleClickOutsideBox(event) {
  if (!searchdd.contains(event.target) && !searchbar.contains(event.target)) {
    searchdd.classList.remove('show-results');
  }
});

function searchOnFocus() {
  if (searchbar.value.length > 0) {
    searchdd.classList.add('show-results');
  }
}

function searchOutFocus() {
  searchdd.classList.remove('show-results');
}

searchbar.addEventListener('input', function (e) {
  if (this.value.length > 0) {
    searchdd.classList.add('show-results');
  }
  else {
    searchdd.classList.remove('show-results');
  }
});

// SEARCH RESULTS LIST
const resultlist = document.getElementById('result-list');
const loadmorebtn = document.getElementById('load-more-btn');
const resultcount = document.getElementById('result-count');
const resulttotal = document.getElementById('result-total');

const resultLimit = 50; // TOTAL RESULTS
const resultIncrease = 10; // HOW MANY LINKS PUMP OUT
const pageCount = Math.ceil(resultLimit / resultIncrease);
var currentPage = 1;

// RESULTS LOADER
window.onload = function () {
  try {
    addLinks(currentPage);
    loadmorebtn.addEventListener("click", () => {
      addLinks(currentPage + 1);
    });
  }
  catch(ex) {
    console.log(ex);
  }
};

function addLinks(pageIndex) {
  currentPage = pageIndex;
 
  loadMoreButtonStatus();
   
  const startRange = (pageIndex - 1) * resultIncrease;
  const endRange = pageIndex * resultIncrease > resultLimit ? resultLimit : pageIndex * resultIncrease;

  resultcount.innerHTML = endRange;
  resulttotal.innerHTML = resultLimit;
    
  for (let i = startRange + 1; i <= endRange; i++) {
    createLink(i);
  }
}

function createLink() {
  const link = document.createElement('li');
  link.className = 'card';
  // DYNAMIC INFO = href, link name, link direction
  link.innerHTML = '<a href=\"' + '#' + '\"><span class=\"result-li\">' + 'Get All Reports' + '</span><span class=\"dir-li\">' + '/ CustomReport Management / Get All Reports / Overview' + '</span></a>';
  resultlist.appendChild(link);
}

function loadMoreButtonStatus() {
  if (pageCount === currentPage) {
    loadmorebtn.classList.add("disabled");
    loadmorebtn.setAttribute("disabled", true);
  }
}

// CAROUSEL 
var slideIndex = 1;
var loopInterval = null;
var carouselslides = document.getElementsByClassName('carousel-slide');
if(carouselslides.length > 0) {
  loopInterval = setInterval(loopSlides, 5000);
}
showSlides(slideIndex);

function loopSlides() {
  try {
    var carouselslides = document.getElementsByClassName('carousel-slide');
    var slidesno = carouselslides.length;
    slideIndex++;
    if (slideIndex > slidesno) {
      slideIndex = 1;
    }
    showSlides(slideIndex);
  }
  catch(ex) {
    console.log(ex);
  }
}

function currentSlide(index) {
  clearInterval(loopInterval);
  showSlides(slideIndex = index);
}

function showSlides(index) {
  try {
    var i;
    var carouselslides = document.getElementsByClassName('carousel-slide');
    var carouseldots = document.getElementsByClassName('carousel-dot');
    if (index > carouselslides.length) 
    {
      slideIndex = 1
    }
    if (index < 1) {
      slideIndex = carouselslides.length
    }
    
    for (i = 0; i < carouselslides.length; i++) {
      carouselslides[i].classList.remove('slide-show');
    }
    for (i = 0; i < carouseldots.length; i++) {
      carouseldots[i].className = carouseldots[i].className.replace(' active', '');
    }
    carouselslides[slideIndex-1].classList.add('slide-show');
    carouseldots[slideIndex-1].className += ' active';
  }
  catch(ex) {
    console.log(ex);
  }
}

// SEE MORE
function seeMore(btnid, val) {
  var seemorebtn = document.getElementById(btnid);
  var seemorediv = document.querySelector('#see-more-' + val);
  var seemoretxt = seemorebtn.querySelector('.see-more-txt');
  var seemoreico = seemorebtn.querySelector('.see-more-ico');

  if (seemorediv.classList.contains('edoc-seemore-show')) {
    seemoretxt.innerHTML = 'show more';
    seemoreico.classList.remove('fa-chevron-up');
    seemoreico.classList.add('fa-chevron-down');
  } 
  else {
    seemoretxt.innerHTML = 'show less';
    seemoreico.classList.remove('fa-chevron-down');
    seemoreico.classList.add('fa-chevron-up');
  }

  seemorediv.classList.toggle('edoc-seemore-show');
}

// PRINT
function showHiddenContent(val) {
  const allcodeboards = document.querySelectorAll('.edoc-boardcontent');
  const allseemore = document.querySelectorAll('.edoc-seemore-div');
  const allseemorebtn = document.querySelectorAll('.edoc-seemore-btn')

  if (val == true) {
    allcodeboards.forEach(codeboard => {
      codeboard.classList.add('edoc-boardcontent-showall');
    });

    allseemore.forEach(seemore => {
      seemore.classList.add('edoc-seemore-show');
    });

    allseemorebtn.forEach(seemorebtn => {
      seemorebtn.classList.add('edoc-seemore-hide');
    });
  }
  else {
    allcodeboards.forEach(codeboard => {
      codeboard.classList.remove('edoc-boardcontent-showall');
    });
    for (i = 1; i < codeboards + 1; i++) {
      var trigger = 'default-code-' + i;
      document.getElementById(trigger).click();
    }

    allseemore.forEach(seemore => {
      seemore.classList.remove('edoc-seemore-show');
    });

    allseemorebtn.forEach(seemorebtn => {
      seemorebtn.classList.remove('edoc-seemore-hide');
    });
  }
}