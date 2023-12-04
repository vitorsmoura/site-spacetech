$(function () {
  $(document).ready(function () {
    $(".boxButton > .search").on("click", function () {
      var selectedDate = $("#dateSearch").val();

      if (selectedDate === "") {
        alert("Por favor, selecione uma data.");
        return;
      }

      var today = new Date().toISOString().split("T")[0];
      if (selectedDate > today) {
        alert("A data selecionada é maior que a data atual.");
        return;
      }

      var apiUrl =
        "https://api.nasa.gov/neo/rest/v1/feed?" +
        "start_date=" +
        selectedDate +
        "&end_date=" +
        selectedDate +
        "&api_key=9S82BZ4BKhFs7F8og9qn95l2dl5nLBkL0zRuodIR";

      $.ajax({
        url: apiUrl,
        method: "GET",
        success: function (response) {
          var asteroids = response.near_earth_objects[selectedDate];
          var resultText = $(".resultText");
          resultText.empty();

          asteroids.forEach(function (asteroid) {
            var div = $('<div class="asteroidResult"></div>');
            var name = $("<p></p>").text("Name: " + asteroid.name);
            var magnitude = $("<p></p>").text(
              "Magnitude: " + asteroid.absolute_magnitude_h
            );
            var isHazardous = $("<p></p>").text(
              "Potentially Hazardous: " +
                asteroid.is_potentially_hazardous_asteroid
            );
            div.text("");
            div.append(name, magnitude, isHazardous);
            resultText.append(div);
          });

          // Chama a segunda API
          let id = localStorage.getItem("id");

          var secondApiUrl =
            "http://onsist.ftccloud.com.br:8063/UserConsumption";

          $.ajax({
            url: secondApiUrl,
            method: "GET",
            success: function (data) {
              if (Array.isArray(data) && data.length > 0) {
                var users = data[0].users;
                var consumedAPI = data[0].consumedAPI;

                var pieChart = $(
                  '<canvas id="myPieChart" width="400" height="400"></canvas>'
                );
                $(".contentresult").empty().append(pieChart);

                var ctx = document
                  .getElementById("myPieChart")
                  .getContext("2d");
                var myPieChart = new Chart(ctx, {
                  type: "pie",
                  data: {
                    labels: [consumedAPI],
                    datasets: [
                      {
                        label: "Número de usuários",
                        data: [users],
                        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
                        borderColor: ["rgba(255, 99, 132, 1)"],
                        borderWidth: 1,
                      },
                    ],
                  },
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                      display: true,
                      position: "bottom",
                      labels: {
                        fontColor: "white",
                      },
                    },
                  },
                });
              } else {
                console.error("Resposta da API em um formato inválido.");
              }
            },
            error: function (xhr, status, error) {
              console.error(
                "Erro ao obter dados da API:",
                status + ": " + error
              );
            },
          });
        },
        error: function (xhr, status, error) {
          console.error("Erro na primeira API:", status + ": " + error);
        },
      });
    });
  });

  $(".contentValue").on("click", function () {
    var secondApiUrl = "http://onsist.ftccloud.com.br:8063/UserConsumption";
    if ($(".contentresult").css("display") == "flex") {
      $(".contentresult").css("display", "none");
    } else {
      $(".contentresult").css("display", "flex");
    }
    $.ajax({
      url: secondApiUrl,
      method: "GET",
      success: function (data) {
        if (Array.isArray(data) && data.length > 0) {
          var users = data[0].users;
          var consumedAPI = data[0].consumedAPI;

          var pieChart = $(
            '<canvas id="myPieChart" style="color:white" width="400" height="200"></canvas>'
          );
          $(".contentresult").empty().append(pieChart);

          var ctx = document.getElementById("myPieChart").getContext("2d");
          var myPieChart = new Chart(ctx, {
            type: "pie",
            data: {
              labels: [consumedAPI],
              datasets: [
                {
                  label: "Número de usuários",
                  data: [users],
                  backgroundColor: ["#251635"],
                  borderColor: ["#050075"],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                    fontColor: 'white' 
                },
              },
            },
          });
        } else {
          console.error("Resposta da API em um formato inválido.");
        }
      },
      error: function (xhr, status, error) {
        console.error("Erro ao obter dados da API:", status + ": " + error);
      },
    });
  });
});
