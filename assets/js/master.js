//GENERAL DATA
var profile = '';
const jsonProfile = {
  'profile' : '',
  'area': '',
  'position' : '',
  'getSistem' : '',
  'data' : {
    'name' : '',
    'enterprise': '',
    'ruc': '',
    'email': '',
    'phone' : '',
  }
}
var stepQuiz = 0;
const $online = $('#online');
const $integracion = $('#integracion');
const $quiz = $('#input-dinamic');
const $textQuiz = $('#text-quiz');
const $input1 = $('#input-1');
const $input2 = $('#input-2');
const $input3 = $('#input-3');
const $progress = $('.content-dinamic-form');
const $formInput = $('#mainform input');
const $products = $('#products');



$('.profile-item').click(function() {
  console.log(jsonProfile);
  $('.profile-item').removeClass('active');
  $(this).addClass('active');
  jsonProfile['profile'] = $(this).data('profile');
  showQuiz(jsonProfile['profile']);
})

function showQuiz(prof) {
  $textQuiz.fadeOut();
  $quiz.delay(500).fadeIn();
  if (prof == 'Representante de empresa') {
    stepQuiz = 1;
    $('.form-dinamic').fadeOut(100);
    resetProgress();
    $input1.delay(300).fadeIn(500);
    $quiz.addClass('percent-1');
  } else {
    stepQuiz = 3;
    $('.form-dinamic').fadeOut(100);
    $input3.delay(300).fadeIn(500);
    resetProgress();
    $quiz.addClass('percent-3');
  }
}

$('#next').click(function() {
  switch (stepQuiz) {
    case 1:
      jsonProfile['area']= $input1.find('select').val();
      nextStep();
      break;
    case 2:
      jsonProfile['position']= $input2.find('select').val();
      nextStep();
      break;
    case 3:
      jsonProfile['getSistem']= $input3.find('select').val();
      nextStep();
      showSolution();
      break;
    default:
  }
})

function nextStep() {
  $('#input-'+this.stepQuiz).fadeOut(100);
  this.stepQuiz++;
  $('#input-'+this.stepQuiz).delay(300).fadeIn(500);
  resetProgress();
  $quiz.addClass('percent-'+this.stepQuiz);
}

function showSolution() {
  $quiz.fadeOut(100);
  $textQuiz.html('<h3 class="text">Esta es la solución ideal para ti <i class="fa fa-arrow-down"></i></h3>');
  $textQuiz.delay(300).fadeIn(500);
  if (jsonProfile['getSistem']=='si') {
    $online.fadeOut(100);
    $integracion.delay(2500).fadeIn(500).css('display','flex').css('opacity','1');
    $products.fadeIn(500);
  } else {
    $integracion.fadeOut(100);
    $online.delay(2300).fadeIn(500).css('display','flex').css('opacity','1');
    $products.fadeOut(300);
  }
  $('#solutions').focus();
}

function resetProgress() {
  for (var i = 1; i < 5; i++) {
    $quiz.removeClass('percent-'+i);
  }
}

$('#si').click(function() {
  $online.fadeOut(100);
  $integracion.delay(2500).fadeIn(500).css('display','flex').css('opacity','1');
  $products.fadeIn(500);
});
$('#so').click(function() {
  $integracion.fadeOut(100);
  $online.delay(2500).fadeIn(500).css('display','flex').css('opacity','1');
  $products.fadeOut(300);
});


$('#mainform').submit(function(e) {
  e.preventDefault();
  var band = false;

  $formInput.each(function () {
    var temp = $(this).attr('name');
    if ( $.trim( $(this).val() ) == '') {
      alert('Llena los campos correctamente');
      band = false;
    } else {
      jsonProfile['data'][temp] = $(this).val();
      band = true;
    }
  });

  if (band) {
    $.ajax({
      url: $(this).attr('action'),
      method: 'POST',
      data: jsonProfile,
      success: function (res) {
        if (res == 'success') {
          window.open('localhost:8000/gracias.html','_self');
        } else {
          alert('Algo salió mal, intente nuevamente');
        }
      }
    })
  }
});
