$(function(){

var $shoes = $('#shoeList');
var displayData;
var $brand = $('#brand');
var $color = $('#color');
var $price = $('#price');
var $size = $('#size');
var $in_stock = $('#in_stock');

var shoesTemplate = "" +
"<li>" +
"<p><strong>Brand:</strong> {{brand}}</p>" +
"<p><strong>Color:</strong> {{color}}</p>" +
"<p><strong>Price:</strong> R{{price}}</p>" +
"<p><strong>Size:</strong> {{size}}</p>" +
"<p><strong>In Stock:</strong> {{in_stock}}</p>" +
"<button data-id='{{_id}}'class='remove'>X</button>" +


"</li>";

function addShoe(shoe){
  $shoes.append(Mustache.render(shoesTemplate, shoe))
  // var tr = $("<tr></tr>");
  //  tr.append("<td>"+ shoe.brand +"</td>");
  //  tr.append("<td>"+ shoe.color +"</td>");
  //  tr.append("<td>"+"R "+ shoe.price +"</td>");
  //  tr.append("<td>"+ shoe.size +"</td>");
  //  tr.append("<td>"+ shoe.in_stock +"</td>");
  // $("#shoeList").append(tr);
}

$.ajax({
  type: 'GET',
  url: '/api/shoes',
  success: function(shoes){
    displayData = shoes;
    $.each(displayData, function(i, shoe){
      addShoe(shoe);

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
    }
  })
});
$shoes.delegate('.remove','click', function(){
  var $li = $(this).closest('li');
  $.ajax({
    type: 'DELETE',
    url: '/api/shoes/' +$(this).attr('data-id'),
    success: function(){
      $li.remove();

    }
  })

})

});
