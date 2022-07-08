
//audio
$(function(){
    $(".fa-play-circle").click(function (){

        if ($(this).hasClass("pause")){
            $("#myAudio")[0].pause();
            console.log("pause");

        }
        else{
            $("#myAudio")[0].play();
            console.log("play");
        }
        $(this).toggleClass("pause");
        //$("#myAudio")[0]
    })
});


function likeFunction(x) {
    x.classList.toggle("liked");
}