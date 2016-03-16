$('#test').on('submit', function( e ){
    var data, xhr;

    data = new FormData();

    data.append( 'file', $( '#file' )[0].files[0] );
    data.append('user','56e8264952ed4c1d0e215580');
     $.ajax({
        url: '/docs/',
        data: data,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function ( data ) {
            console.log(data)
        },
        error: function(error){
            console.log(error)
        }
     });

    e.preventDefault();
})