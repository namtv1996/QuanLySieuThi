// Elegant Modal

// Function to open Modal when the page finishes loading (with time to display animation)
// setTimeout(function(){
// 	$(".mask").addClass("active");
// }, 500);

// Click event function to open modal (active)
$(".btn-modal").on("click", function(){
  $(".mask").addClass("active"); //Finds .mask class and adds the active class
});

// Função para fechar o modal.
function closeModal(){
  $(".mask").removeClass("active"); //Remove the active class
}

// Function to close the modal screen
$(".close, .mask").on("click", function(){
  closeModal();
});

// Closes the modal with the button within the content
$(".content-button-close").click(function(){
	closeModal();
});

// or the keyboard (esc)
// $(document).keyup(function(e) {
//   if (e.keyCode == 27) {
//     closeModal();
//   }
// });