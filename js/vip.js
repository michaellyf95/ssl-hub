// VIP CATEGORY
var viprngbtn = document.querySelector('#rng-button');
var vippopbtn = document.querySelector('#pop-button');
var viplivebtn = document.querySelector('#live-button');
var viprngdiv = document.querySelector('.vip-rng-div');
var vippopdiv = document.querySelector('.vip-pop-div');
var viplivediv = document.querySelector('.vip-live-div');
var vipgameinput = document.getElementById('vip_game_name');
var vipnumberinput = document.getElementById('vip_number');

function clickedVipCategory(cat) {
    vipCategoryHandle(cat);
    vipCategoryPagesHandle(cat);
    clearHighlights();
    vipgameinput.value = '';
    vipnumberinput.value = '';
}

function vipCategoryHandle(cat) {
  if (cat == 'rng') {
    viprngbtn.classList.add('active');
    vippopbtn.classList.remove('active');
    viplivebtn.classList.remove('active');
  }
  else if (cat == 'pop') {
    viprngbtn.classList.remove('active');
    vippopbtn.classList.add('active');
    viplivebtn.classList.remove('active');
  }
  else if (cat == 'live') {
    viprngbtn.classList.remove('active');
    vippopbtn.classList.remove('active');
    viplivebtn.classList.add('active');
  }
}

function vipCategoryPagesHandle(cat) {
  if (cat == 'rng') {
    viprngdiv.classList.add('active');
    vippopdiv.classList.remove('active');
    viplivediv.classList.remove('active');
  }
  else if (cat == 'pop') {
    viprngdiv.classList.remove('active');
    vippopdiv.classList.add('active');
    viplivediv.classList.remove('active');
  }
  else if (cat == 'live') {
    viprngdiv.classList.remove('active');
    vippopdiv.classList.remove('active');
    viplivediv.classList.add('active');
  }
}

// VIP SEARCH
function clearHighlights() {
  var thlistrng = document.getElementsByClassName('rng-thead');
  var thlistpop = document.getElementsByClassName('pop-thead');
  var thlistlive = document.getElementsByClassName('live-thead');
  var tbodyrng = document.getElementsByClassName('rng-tbody');
  var tbodypop = document.getElementsByClassName('pop-tbody');
  var tbodylive = document.getElementsByClassName('live-tbody');

  for (i = 0; i < thlistrng.length; i++) {
    thlistrng[i].classList.remove('selected');
  }
  for (i = 0; i < thlistpop.length; i++) {
    thlistpop[i].classList.remove('selected');
  }
  for (i = 0; i < thlistlive.length; i++) {
    thlistlive[i].classList.remove('selected');
  }
  for (i = 0; i < tbodyrng.length; i++) {
    tbodyrng[i].classList.remove('selected');
  }
  for (i = 0; i < tbodypop.length; i++) {
    tbodypop[i].classList.remove('selected');
  }
  for (i = 0; i < tbodylive.length; i++) {
    tbodylive[i].classList.remove('selected');
  }
}

vipgameinput.addEventListener('input', function () {
    var i, category;

    if (viprngdiv.classList.contains('active')) {
        category = 'rng-tbody';
    } 
    else if (vippopdiv.classList.contains('active')) {
        category = 'pop-tbody';
    }
    else if (viplivediv.classList.contains('active')) {
        category = 'live-tbody';
    }

    try {
      var gamename = this.value.toUpperCase();
      var tbodylist = document.getElementsByClassName(category);
      for (i = 0; i < tbodylist.length; i++) {
        var th = tbodylist[i].innerText;
        if (th) {
          if (th.toUpperCase().indexOf(gamename) > -1) {
            tbodylist[i].scrollIntoView({ block: 'center' });
            tbodylist[i].classList.add('selected');
          }
          else {
            tbodylist[i].classList.remove('selected');
          }
        }
        if (gamename == '') {
          tbodylist[i].classList.remove('selected');
        }
      }
    }
    catch(ex) {
        console.log(ex);
    }
});

vipnumberinput.addEventListener('input', function () {
    var category = null;
    var number = this.value;
    if (viprngdiv.classList.contains('active')) {
      category = 'rng-thead';
    } 
    else if (vippopdiv.classList.contains('active')) {
      category = 'pop-thead';
    }
    else if (viplivediv.classList.contains('active')) {
      category = 'live-thead';
    }

    try {
      var thlist = document.getElementsByClassName(category);
      for (i = 0; i < thlist.length; i++) {
        var th = thlist[i].innerText;
        if (th) {
          if (thlist[i].innerText == number) {
            thlist[i].scrollIntoView({ inline: 'center' });
            thlist[i].classList.add('selected');
          }
          else {
            thlist[i].classList.remove('selected');
          }
        }
        if (number == '') {
          thlist[i].classList.remove('selected');
        }
      }
    }
    catch(ex) {
      console.log(ex);
    }
});