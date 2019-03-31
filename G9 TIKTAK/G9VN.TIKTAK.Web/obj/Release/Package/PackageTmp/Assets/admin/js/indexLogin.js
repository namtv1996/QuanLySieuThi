// Toggle Function

var a=true;
$('#dn').hide();
$('#qmk').hide();
function load(){
	if(a==true){
	$('#qmk').show();
	$('#dn').hide();
	}else{
	$('#qmk').hide();
	$('#dn').show();
	}
}

$('.toggle').click(function(){
  // Switches the Icon
    $(this).children('i').toggleClass('fa-unlock-alt');
    $(this).toggleClass('view');
  // Switches the forms
	if(a==true){
	a=false;
	load();
	}else{
		a=true;
		load();
	}
  $('.form').animate({
    height: "toggle",
    'padding-top': 'toggle',
    'padding-bottom': 'toggle',
    opacity: "toggle"
  }, "slow");
});
$('.toggle').hover(function () {
    load();
  }, 
  function () {
    $('#dn').hide();
	$('#qmk').hide();
  });