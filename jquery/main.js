$(function() {
    // Get random number between 2 ranges
    function randomNum(m, n) {
        m = parseInt(m);
        n = parseInt(n);
        return Math.floor(Math.random() * (n - m + 1)) + m;
    }

    function heartAnimation() {
        $this = $('body');
        var heartCount = ($this.width()/60)*9;
        for (var i = 0; i< heartCount; i++) {
            var heartSize = (randomNum(600, 1200) / 100);
            $this.append('<span class="tiny-heart" style="top: '+ randomNum(5, 95) +'%;' +
                ' left: '+ randomNum(0, 100) +'%;' +
                ' width: '+ heartSize +'px;' +
                ' height: '+ heartSize +'px ;' +
                ' animation-delay: -'+ randomNum(0, 3) +'s;' +
                ' animation-duration: '+ randomNum(2, 5) +'s"></span>')
        }
    }

    heartAnimation();
})

$(function(){
    $.scrollIt();
});
$(function (){
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "slideShow",
            "thumbs",
            "zoom",
            "fullScreen",
            "share",
            "close"
        ],
        loop: false,
        protect: true
    });

    $('[data-fancybox="card"]').fancybox({
        thumbs : {
            autoStart : true
        }
    });
    $('[data-fancybox="DP"]').fancybox({
        thumbs : {
            autoStart : true
        }
    });


});

$(function (){
    $('[data-fancybox="logo"]').fancybox({
        buttons: [
            "slideShow",
            "thumbs",
            "zoom",
            "fullScreen",
            "share",
            "close"
        ],
        loop: false,
        protect: true
    });

});



(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    //I'm don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy + 1,
        dayMonth = "04/08/",
        birthday = dayMonth + yyyy;

    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
        birthday = dayMonth + nextYear;
    }
    //end

    const countDown = new Date(birthday).getTime(),
        x = setInterval(function() {

            const now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById("days").innerText = Math.floor(distance / (day)),
                document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
                document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
                document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

            //do something later when date is reached
            if (distance < 0) {
                document.getElementById("headline").innerText = "It's my birthday!";
                document.getElementById("countdown").style.display = "none";
                document.getElementById("content").style.display = "block";
                clearInterval(x);
            }
            //seconds
        }, 0)
}());

//audio
$(function(){
    $(".fa-music").click(function (){

       if ($(this).hasClass("pause")){
           $("#myAudio")[0].play();
           console.log("play");
       }
       else{
           $("#myAudio")[0].pause();
           console.log("pause");
       }
       $(this).toggleClass("pause");
        //$("#myAudio")[0]
    })
});

"use strict";

// add elemnts
const bgBody = ["#e5e7e9", "#ff4545", "#f8ded3", "#ffc382", "#f5eda6", "#ffcbdc", "#dcf3f3"];
const body = document.body;
const player = document.querySelector(".player");
const playerHeader = player.querySelector(".player__header");
const playerControls = player.querySelector(".player__controls");
const playerPlayList = player.querySelectorAll(".player__song");
const playerSongs = player.querySelectorAll(".audio");
const playButton = player.querySelector(".play");
const nextButton = player.querySelector(".next");
const backButton = player.querySelector(".back");
const playlistButton = player.querySelector(".playlist");
const slider = player.querySelector(".slider");
const sliderContext = player.querySelector(".slider__context");
const sliderName = sliderContext.querySelector(".slider__name");
const sliderTitle = sliderContext.querySelector(".slider__title");
const sliderContent = slider.querySelector(".slider__content");
const sliderContentLength = playerPlayList.length - 1;
const sliderWidth = 100;
let left = 0;
let count = 0;
let song = playerSongs[count];
let isPlay = false;
const pauseIcon = playButton.querySelector("img[alt = 'pause-icon']");
const playIcon = playButton.querySelector("img[alt = 'play-icon']");
const progres = player.querySelector(".progres");
const progresFilled = progres.querySelector(".progres__filled");
let isMove = false;

// creat functions
function openPlayer() {

    playerHeader.classList.add("open-header");
    playerControls.classList.add("move");
    slider.classList.add("open-slider");

}

function closePlayer() {

    playerHeader.classList.remove("open-header");
    playerControls.classList.remove("move");
    slider.classList.remove("open-slider");

}

function next(index) {

    count = index || count;

    if (count == sliderContentLength) {
        count = count;
        return;
    }

    left = (count + 1) * sliderWidth;
    left = Math.min(left, (sliderContentLength) * sliderWidth);
    sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
    count++;
    run();

}

function back(index) {

    count = index || count;

    if (count == 0) {
        count = count;
        return;
    }

    left = (count - 1) * sliderWidth;
    left = Math.max(0, left);
    sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
    count--;
    run();

}

function changeSliderContext() {

    sliderContext.style.animationName = "opacity";

    sliderName.textContent = playerPlayList[count].querySelector(".player__title").textContent;
    sliderTitle.textContent = playerPlayList[count].querySelector(".player__song-name").textContent;

    if (sliderName.textContent.length > 16) {
        const textWrap = document.createElement("span");
        textWrap.className = "text-wrap";
        textWrap.innerHTML = sliderName.textContent + "   " + sliderName.textContent;
        sliderName.innerHTML = "";
        sliderName.append(textWrap);

    }

    if (sliderTitle.textContent.length >= 18) {
        const textWrap = document.createElement("span");
        textWrap.className = "text-wrap";
        textWrap.innerHTML = sliderTitle.textContent + "    " + sliderTitle.textContent;
        sliderTitle.innerHTML = "";
        sliderTitle.append(textWrap);
    }

}

function changeBgBody() {
    body.style.backgroundColor = bgBody[count];
}

function selectSong() {

    song = playerSongs[count];

    for (const item of playerSongs) {

        if (item != song) {
            item.pause();
            item.currentTime = 0;
        }

    }

    if (isPlay) song.play();


}

function run() {

    changeSliderContext();
    changeBgBody();
    selectSong();

}

function playSong() {

    if (song.paused) {
        song.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";

    }else{
        song.pause();
        isPlay = false;
        playIcon.style.display = "";
        pauseIcon.style.display = "";
    }


}

function progresUpdate() {

    const progresFilledWidth = (this.currentTime / this.duration) * 100 + "%";
    progresFilled.style.width = progresFilledWidth;

    if (isPlay && this.duration == this.currentTime) {
        next();
    }
    if (count == sliderContentLength && song.currentTime == song.duration) {
        playIcon.style.display = "block";
        pauseIcon.style.display = "";
        isPlay = false;
    }
}

function scurb(e) {

    // If we use e.offsetX, we have trouble setting the song time, when the mousemove is running
    const currentTime = ( (e.clientX - progres.getBoundingClientRect().left) / progres.offsetWidth ) * song.duration;
    song.currentTime = currentTime;

}

function durationSongs() {

    let min = parseInt(this.duration / 60);
    if (min < 10) min = "0" + min;

    let sec = parseInt(this.duration % 60);
    if (sec < 10) sec = "0" + sec;

    const playerSongTime = `${min}:${sec}`;
    this.closest(".player__song").querySelector(".player__song-time").append(playerSongTime);

}


changeSliderContext();

// add events
sliderContext.addEventListener("click", openPlayer);
sliderContext.addEventListener("animationend", () => sliderContext.style.animationName ='');
playlistButton.addEventListener("click", closePlayer);

nextButton.addEventListener("click", () => {
    next(0)
});

backButton.addEventListener("click", () => {
    back(0)
});

playButton.addEventListener("click", () => {
    isPlay = true;
    playSong();
});

playerSongs.forEach(song => {
    song.addEventListener("loadeddata" , durationSongs);
    song.addEventListener("timeupdate" , progresUpdate);

});

progres.addEventListener("pointerdown", (e) => {
    scurb(e);
    isMove = true;
});

document.addEventListener("pointermove", (e) => {
    if (isMove) {
        scurb(e);
        song.muted = true;
    }
});

document.addEventListener("pointerup", () => {
    isMove = false;
    song.muted = false;
});

playerPlayList.forEach((item, index) => {

    item.addEventListener("click", function() {

        if (index > count) {
            next(index - 1);
            return;
        }

        if (index < count) {
            back(index + 1);
            return;
        }

    });

});



let difference_between_dates = (d1,d2)=>{
    const one_day=1000*60*60*24;
    let total = Math.floor((d1 - d2)/one_day);
    result.innerHTML = "" + total + " days";
}

const relation = new Date('April 8 2021').getTime();
const rightNow = new Date();
difference_between_dates(rightNow, relation);




// play with the postedDate as you  wish to check this function
const postedDate = new Date('April 8 2021 00:00');

function dateDifference(actualDate, value) {
    // Calculate time between two dates:
    const date1 = actualDate; // the date you already commented/ posted
    const date2 = new Date(); // today
    let r = {}; // object for clarity
    let message;
    const diffInSeconds = Math.abs(date2 - date1) / 1000;
    const days = Math.floor(diffInSeconds / 60 / 60 / 24);
    const hours = Math.floor(diffInSeconds / 60 / 60 % 24);
    const minutes = Math.floor(diffInSeconds / 60 % 60);
    const seconds = Math.floor(diffInSeconds % 60);
    const milliseconds =
        Math.round((diffInSeconds - Math.floor( diffInSeconds)) * 1000);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    /* Below object is useful if you want to show difference in detailed context */
    // if you want to return an object instead of a message
    r = {
        years: years,
        months: months,
        weeks: weeks,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds
    };

    /* If you want to display difference either in any one of the data in above object 'r'.*/

    // check if difference is in years or months
    if (years === 0 && months === 0) {
        // show in weeks if no years / months
        if (weeks > 0) {
            if (weeks === 1) {
                message = weeks + ' week';
            } else {
                message = weeks + ' weeks';
            }
        } else if (days > 0) {
            if (days === 1) {
                message = days + ' day';
            } else {
                message = days + ' days ';
            }
        } else if (hours > 0) {

            // show in hours if no years / months / days
            if (hours === 1) {
                message = hours + ' hour';
            } else {
                message = hours + ' hours';
            }
        } else {
            // show in minutes if no years / months / days / hours
            if (minutes === 1) {
                message = minutes + ' minute';
            } else {
                message = minutes + ' minutes ';

            }
        }
    } else if (years === 0 && months > 0) {
        // show in months if no years
        if (months === 1) {
            message = months + ' month';
        } else {
            message = months + ' months ';

        }
    } else if (years > 0) {
        // show in years if years exist
        if (years === 1) {
            message = years + ' year';
        } else {
            message = years + ' years ';

        }
    }

    // To display either an object or a message in the view
    if (value === true) {
        return r;
    }
    return message;
}

function contentUpdate() {
    // context
    document.getElementById('context').innerHTML = ``;



    // result in the form of a detailed object
    const objectDate = dateDifference(postedDate, true);
    document.getElementById('object').innerHTML = `<p>
<strong>${objectDate.years}</strong> year or <strong>${objectDate.months}</strong> m, <strong>${objectDate.weeks}</strong> w, <strong>${objectDate.days}</strong> d, <strong>${objectDate.hours}</strong> h, <strong>${objectDate.minutes}</strong> mi, <strong>${objectDate.seconds}</strong> s </p>`;
}


// to update content every one second
setInterval(contentUpdate, 1000);

// to update the content for the first time
contentUpdate();