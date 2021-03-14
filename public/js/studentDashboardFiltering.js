$( document ).ready(function() {
    //console.log( "page is ready!" );
    //TODO  any page load intial
});

jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
  };

$(function() {    
    $('#filter-by-username').change(function() { 
        $("#table td.col1:contains('" + $(this).val() + "')").parent().show();
        $("#table td.col1:not(:contains('" + $(this).val() + "'))").parent().hide();
    });
});


/* show file value after file select */
document.querySelector('.custom-file-input').addEventListener('change',function(e){
    var fileName = document.getElementById("fileInput").files[0].name;
    var nextSibling = e.target.nextElementSibling
    nextSibling.innerText = fileName
})