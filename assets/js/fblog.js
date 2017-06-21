$trys = 0;
  window.fbAsyncInit = function() {
   FB.init({
      appId      : '1347552405299649',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
   });
   FB.AppEvents.logPageView();

   FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
   });
};

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/es_LA/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

function  statusChangeCallback(response) {
   console.log(response);
   if (response.status==='connected') {
         getData();
   } else if (response.status==='not_authorized' && $trys == 0) {
         askLog();
   } else {
         console.log('Not log with facebook');
         askLog();
   }
}

function getData(id) {
   FB.api('/me?fields=id,email,cover,name,first_name,last_name,age_range,link,gender,locale,picture,timezone,updated_time,verified', function (response) {
      console.log(response);
      console.log('Log init! use data from '+ response.name);
      showDatainForm(response);
   });
}

function showDatainForm(response) {
   //alert(response.name);
   document.getElementById("formname").value = response.name;
   //alert(response.email);
   document.getElementById("formemail").value = response.email;
}

function askLog() {
   $trys ++;
   FB.login(function(response) {
      // handle the response
      console.log(response);
      statusChangeCallback(response);
   }, {scope: 'public_profile,email', return_scopes: true});
}
