$(function(){

var $shoes = $('#shoeList');
var displayData;

$.ajax({
  type: 'GET',
  url: '/api/shoes',
  success: function(shoes){
    displayData = shoes;
    $("#display-button").on("click", function(e){
      e.preventDefault();
    $.each(displayData, function(i, shoe){
      var tr = $("<tr></tr>");
      tr.append("<td>"+ shoe._id +"</td>");
       tr.append("<td>"+ shoe.brand +"</td>");
       tr.append("<td>"+ shoe.color +"</td>");
       tr.append("<td>"+ shoe.price +"</td>");
       tr.append("<td>"+ shoe.size +"</td>");
       tr.append("<td>"+ shoe.in_stock +"</td>");
      $("#shoeList").append(tr);
    })
    })
  }
})
})
