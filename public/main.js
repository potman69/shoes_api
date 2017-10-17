$(function(){
var $shoes = $('#shoeList');
var displayData;
var $brand = $('#brand');
var $color = $('#color');
var $price = $('#price');
var $size = $('#size');
var $in_stock = $('#in_stock');

var shoesTemplate = $('#shoetemplate').html();

function addShoe(shoe){
  $shoes.append(Mustache.render(shoesTemplate, shoe))
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
      $('input[type="text"],textarea').val('');
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

$shoes.delegate('.buy','click', function(e){
  var id = e.target.id;
  var $li = $(this).closest('li');
  $.ajax({
    type: 'PUT',
    url: '/api/shoes/' +id,
    success: function(){
      location.reload();
    }
  })
})
$("#inputBrand").on('click', function(){
  var brandName = $('#brands').val();
  $.ajax({
    type: 'GET',
    url: '/api/shoes/brand/' + brandName,
    success: function(data){
      displayData = data;
      $.each(displayData, function(i, result){
        addShoe(result);
        $('input[type="text"],textarea').val('');

    });
  },
  });
})
$("#inputSize").on('click', function(){
  var Size = $('#sizes').val();
  $.ajax({
    type: 'GET',
    url: '/api/shoes/size/' + Size,
    success: function(data){
      displayData = data;
      $.each(displayData, function(i, result){
        addShoe(result);
        $('input[type="text"],textarea').val('');
    });
  }
  });
})


});
