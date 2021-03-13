$( document ).ready(function() {
    console.log( "page is ready!" );
});

jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
  };

$(function() {    
    console.log( "page function!" );
    $('#filter-by-username').change(function() { 
        console.log( "gooo is ready!" );
        $("#table td.col1:contains('" + $(this).val() + "')").parent().show();
        $("#table td.col1:not(:contains('" + $(this).val() + "'))").parent().hide();
    });
    
});