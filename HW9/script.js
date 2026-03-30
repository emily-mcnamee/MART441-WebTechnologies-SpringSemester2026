   /* $(document).ready(function () {
      $("button").click(function () {
        $("#exhibitionInfo").load("ten_exhibitions.json");
      });
    });*/

    $(document).ready(function () {

      $("button").click(function () {

        $.getJSON("ten_exhibitions.json", function(result){

          $.each(result, function(i, exhibit){

            var row = "<tr>" +
            "<td>" + exhibit.exhibition_id + "</td>" +
            "<td>" + exhibit.exhibition_title + "</td>" +
            "<td>" + exhibit.exhibition_department + "</td>" +
            "<td>" + exhibit.display_date + "</td>" +

            "</tr>";

            $("#tableBody").append(row);
            
          });
        });
      });
    });