console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      sex: $('#sexIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val()
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
}); // end doc ready

var getKoalas = function(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/getKoalas',
    type: 'GET',
    success: function( response ){
      console.log( 'got some koalas: ', response );
      // When we receive the info from the server(the response) we are then appending each row of info to the DOM with the response[i].name, response[i].age, etc.
      $('#viewKoalas').empty();
        for (var i = 0; i < response.length; i++) {
          $('#viewKoalas').append('<p>' + response[i].name + ' ' + response[i].sex + ' ' + response[i].age + ' ' + response[i].transfer + ' ' + response[i].notes + '</p>');
        }
    } // end success

  }); //end ajax
  // display on DOM with buttons that allow edit of each
}; // end getKoalas

var saveKoala = function( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/addKoala',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
    } // end success
  }); //end ajax
};
