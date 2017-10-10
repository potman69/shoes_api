$(function(){

var $shoes = $('#shoeList');
var displayData;
var $brand = $('#brand');
var $color = $('#color');
var $price = $('#price');
var $size = $('#size');
var $in_stock = $('#in_stock');



function addShoe(shoe){
  var tr = $("<tr></tr>");
  tr.append("<td>"+ shoe._id +"</td>");
   tr.append("<td>"+ shoe.brand +"</td>");
   tr.append("<td>"+ shoe.color +"</td>");
   tr.append("<td>"+ shoe.price +"</td>");
   tr.append("<td>"+ shoe.size +"</td>");
   tr.append("<td>"+ shoe.in_stock +"</td>");
  $("#shoeList").append(tr);
}

$.ajax({
  type: 'GET',
  url: '/api/shoes',
  success: function(shoes){
    displayData = shoes;
    $("#display-button").on("click", function(e){
      e.preventDefault();
    $.each(displayData, function(i, shoe){
    addShoe(shoe);
    });
  });
},
  error: function(){
    alert('Error loading shoes')
  }
});
$('#add-shoe').on('click', function(){
  var shoe = {
    brand: $brand.val(),
    color: $color.val(),
    price: $price.val(),
    size: $size.val(),
    in_stock: $in_stock.val(),
  };

  $.ajax({
    type: 'POST',
    url: '/api/shoes',
    data: shoe,
    success: function(newShoe){
      addShoe(newShoe);
      //  window.location='index.html'
    }
  })
});
$('#del-button').on('click', function(){
  $.ajax({
    type: 'DELETE',
    url: '/api/shoes',
    data: shoe,
    success: function(){
      alert('Deleted');

    }
  })

})

});
