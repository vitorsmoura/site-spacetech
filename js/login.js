$(function(){
  $(".userphone").mask("11999999999")
  
})
$(".signUp-link").on("click", function () {
  $(".login").css("display", "none");
  $(".createInput").css("display", "flex");
  $(".signIn-link").css("display", "flex");
  $(".signUp-link").css("display", "none");
  $(".createBtn").css("display", "flex");
  $(".loginBtn").css("display", "none");

});

$(".signIn-link").on("click", function () {
  $(".login").css("display", "flex");
  $(".createInput").css("display", "none");
  $(".signIn-link").css("display", "none");
  $(".signUp-link").css("display", "none");
  $(".createBtn").css("display", "none");
  $(".loginBtn").css("display", "flex");

});

$(".loginBtn").on("click", function(){
  let user = $(".user").val();
  let password = $(".password").val();
  let status;
  let array=[]
  let authToken;
  let userType;
  let atualId;
  
  let settings = {
    "url": "http://onsist.ftccloud.com.br:8063/Authentication",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "email": user,
      "password": password
    }),
  };
  console.log(JSON.stringify(settings))
  $.ajax(settings).done(function (response) {
    array.push(response)
    status=array[0].sucess
    console.log(response)
    if(status==false){
      messagesContent=  array[0].data[0].value
     $(".messageAlert").text(messagesContent) 
     $(".messageAlert").css("display", "flex") 
    }else{
        window.location.href = './accountConfig.html';
        authToken=array[0].authenticated.token;
        userType=array[0].authenticated.userType;
        nome =array[0].authenticated.name;
        email =array[0].authenticated.email;
        let telephone =array[0].authenticated.telephone;
        atualId=array[0].authenticated.id;
        localStorage.setItem('id', atualId);
        localStorage.setItem('name', nome);
        localStorage.setItem('telephone', telephone);
        localStorage.setItem('email', email);
        localStorage.setItem('userType', userType);
        localStorage.setItem('token', authToken);

        
      
    }
  });

})
$(".createBtn").on("click", function () {
  let name = $(".username").val();
  let password = $(".password").val();
  let lastname = $(".lastname").val();
  let confirmPassowrd = $(".confirmPassword").val();
  let phone = $(".userphone").val();
  let email = $(".email").val();
  let array = [];
  let status;
  let messagesContent;

  let settings = {
    "url": "http://onsist.ftccloud.com.br:8063/User",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
    },
    "data": JSON.stringify({
      "name": name,
      "surname": lastname,
      "password": password,
      "confirmPassword": confirmPassowrd,
      "email": email,
      "telephone": phone
    }),
  };

  console.log(JSON.stringify(settings))

  $.ajax(settings).done(function (response) {
    array.push(response);
    status = array[0].sucess;
    console.log(response);

    if (status == false) {
      messagesContent = array[0].data[0].value;
      $(".messageAlert").text(messagesContent);
      $(".messageAlert").css("display", "flex");
    } else {
      $(".confirmMessage").css("display", "flex");

      $(".messageAlert").text("Conta criada com sucesso!");
      window.alert("Conta criada com sucesso. Você será redirecionado para o login.");

      window.location.href = "login.html";


      $(".confirmButton button").on("click", function () {
        // Redirect to the login page
        window.location.href = "/pages/login.html";
      });
    }
  });
});



