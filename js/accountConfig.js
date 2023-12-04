$(function () {
  let type = localStorage.getItem("userType");
  let id = localStorage.getItem("id");
  let email = localStorage.getItem("email");
  let name = localStorage.getItem("name");
  let telephone = localStorage.getItem("telephone");
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  let bearer = `Bearer ${token}`;


  document.getElementById('userName').textContent = "BEM VINDO, " + name;
  document.getElementById('userMail').textContent = "E-mail: " + email;

  if (type != 1) {
    $(".adminLogin").css("display", "none");
  } else {
    $(".searchItem").on("click", function () {

      let searchItem = $(".searchName").val();
        var settings = {
          url: "http://onsist.ftccloud.com.br:8063/User/Search",
          method: "POST",
          timeout: 0,
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          data: JSON.stringify({
            take: 6,
            skip: 0,
            textForSearch: "",
            order: "",
          }),
        };

        $.ajax(settings).done(function (response) {
          let data = response.data;
          let thisId;
          let thisEmail;
          let thisPhone;
          let formattedString;
          let thisName;
          let thisLastName;

          $(".listItems").html("");
          for (let i = 0; i < data.length; i++) {
            thisId = data[i].id;
            thisEmail = data[i].email;
            thisPhone = data[i].telephone;
            thisName = data[i].name;
            thisLastName = data[i].surname;



            formattedString = ` <div class="boxContentUser"  data-email="${thisEmail}" data-lastname="${thisLastName}" data-name="${thisName}" data-id="${thisId}" data-phone="${thisPhone}">
    ${thisEmail}
  </div>`;

            $(".listItems").append(formattedString);
          }


          $(".boxContentUser").on("click", function () {

            $(".userLogin").css("display", "none");

            $(".boxContentName").css("display", "flex");
          
            // Get the data attributes from the clicked element
            let thisId = $(this).attr("data-id");
            let thisEmail = $(this).attr("data-email");
            let thisPhone = $(this).attr("data-phone");
            let thisName = $(this).attr("data-name");
            let thisLastName = $(this).attr("data-lastname");
          
            // Set the input values based on the retrieved data
            $("#id").val(thisId);
            $("#name").val(thisName);
            $("#lastName").val(thisLastName);
            $("#email").val(thisEmail);
          
            // Assuming userName and userLastName are already defined somewhere
            if (userName != "" || userLastName != "") {
              if (userName == "") {
                userName = thisName;
              }
              if (userLastName == "") {
                userLastName = thisLastName;
              }
            }
          });
          
          $(".buttonAcc").on("click", function () {

            //thisEmail = $(this).attr("data-email");
            //thisPhone = $(this).attr("data-phone");

            let novoNome = $("#name").val();
            let novoLastName = $("#lastName").val();
            let novoId = $("#id").val();
            let novoMail = $("#email").val();


            
            // Assuming bearer, thisId, userName, userLastName, thisEmail, and thisPhone are defined
            var settings = {
              url: "http://onsist.ftccloud.com.br:8063/User",
              method: "PUT",
              timeout: 0,
              headers: {
                "Content-Type": "application/json",
                Authorization: bearer,
              },
              data: JSON.stringify({
                id: novoId,
                name: novoNome,
                surname: novoLastName,
                email: novoMail,
                telephone: thisPhone,
              }),
            };
          
            $.ajax(settings).done(function (response) {
              let formattedMessage;
          
              // Check if the property is spelled correctly in the response
              if (response.sucess == true) {
                formattedMessage = "Usuário alterado com sucesso";

                // Use 5000 (milliseconds) instead of "5000" (string) in setTimeout
                setTimeout(() => {
                  location.reload();
                }, 2000);

              } else {
                formattedMessage = "Erro ao alterar usuário";
              }
          
              $(".messageAlert").text(formattedMessage);
          



            });
          });

          $(".buttonDelete").on("click", function () {

            //thisEmail = $(this).attr("data-email");
            //thisPhone = $(this).attr("data-phone");

            let currentId = $("#id").val();

            
            var settings = {
              url: "http://onsist.ftccloud.com.br:8063/User/" + currentId,
              method: "DELETE",
              timeout: 0,
              headers: {
                "Content-Type": "application/json",
                Authorization: bearer,
              },
            };
            
          
            $.ajax(settings).done(function (response) {
              let formattedMessage;
          
              // Check if the property is spelled correctly in the response
              if (response.sucess == false) {
                formattedMessage = "Usuário DELETADO com sucesso";

               // Use 5000 (milliseconds) instead of "5000" (string) in setTimeout
              setTimeout(() => {
                location.reload();
              }, 2000);

              } else {
                formattedMessage = "Erro ao DELETAR usuário";
              }
          
              $(".messageAlert").text(formattedMessage);
          


            });
          });
          
        });
      
    });
  }
});
