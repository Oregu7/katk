$('#test').on('submit', function( e ){
    var data, xhr;

    data = new FormData();

    data.append( 'file', $( '#file' )[0].files[0] );
    data.append('group',1);
    data.append('title','test');
    data.append('type','doc');
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