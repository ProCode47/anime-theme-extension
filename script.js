const pin = document.getElementById("pin");
const search = document.getElementById("search");
const query = document.getElementById("query");
var choice;

const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
      console.log(c.substring(name.length, c.length));
    }
  }
  return "";
};

const imageChange = () => {
  const images = [
    "./assets/16729.jpg",
    "./assets/77572.png",
    "./assets/112131.jpg",
    "./assets/118722.png",
    "./assets/135625.jpg",
    "./assets/153243.jpg",
    "./assets/185425.jpg",
    "./assets/215588.jpg",
    "./assets/413842.jpg",
    "./assets/415511.jpg",
    "./assets/613924.jpg",
    "./assets/614826.png",
    "./assets/640956.jpg",
    "./assets/641968.jpg",
    "./assets/1097180.png",
    "./assets/144565.jpg",
    "./assets/122122.jpg",
    "./assets/432432.jpg",
    "./assets/526885.jpg",
    "./assets/530476.jpg",
    "./assets/670838.jpg",
    "./assets/anime-girl-raining-are-you-still-in-pain-board-ad-windows-29151-1280x720.jpeg",
    "./assets/anime-girl-umbrella-rainy-day-5k-68-1280x720.jpg",
    "./assets/anime-girl-with-balloon-in-hand-vo-1280x720.jpg",
    "./assets/anime-landscape-anime-girl-clouds-scenic-sky-anime-20758-1280x720.jpg",
    "./assets/anime-landscape-cityscape-scenic-sunset-anime-girl-anime-34693-1280x720.jpeg",
    "./assets/anime-landscape-scenery-clouds-stars-buildings-anime-36270-1280x720.jpeg",
    "./assets/anime-landscape-windy-tree-painting-clouds-anime-2141-1280x720.jpg",
    "./assets/anime-scenery-sunset-anime-school-girl-clouds-artwork-anime-34390-1280x720.jpeg",
    "./assets/anime_girl_headphones_sunset_evening_24155_1280x720.jpg",
    "./assets/boruto-uzumaki-naruto-akatsuki-scar-katana-anime-16798-1280x720.png",
    "./assets/CLHGn92-naruto-wallpaper-1080p.jpg",
    "./assets/girl_bike_night_140306_1280x720.jpg",
    "./assets/girl_twilight_clouds_156445_1280x720.jpg",
    "./assets/girl_umbrella_anime_141156_1280x720.jpg",
    "./assets/shooting-star-5e-1280x720.jpg",
    "./assets/silhouette_night_starry_sky_137292_1280x720.jpg",
  ];
  const savedChoice = getCookie("choices");

  if (savedChoice != "") {
    document.body.style.backgroundImage = `url(${images[savedChoice]})`;
  } else {
    choice = Math.floor(Math.random() * (19 - 0) + 0);
    document.body.style.backgroundImage = `url(${images[choice]})`;
  }
};
const timeChange = () => {
  var theDate = new Date();
  var options = { month: "long", day: "numeric" };
  var option2 = { hour: "numeric", minute: "numeric" };
  var currentDate = theDate.toLocaleDateString([], options);
  var getTime = theDate.toLocaleTimeString([], option2);

  document.getElementById("time").innerHTML = getTime;
  document.getElementById("date").innerHTML = currentDate;
};
// Checks Cookies on all new tabs
const cookieCheck = () => {
  if (getCookie("choices") == "") {
    pin.style.color = "white";
    return;
  }
  pin.style.color = "grey";
};

imageChange();
cookieCheck();
timeChange();
setInterval(() => {
  timeChange();
}, 15000);

pin.addEventListener("click", () => {
  if (pin.style.color != "grey") {
    pin.style.color = "grey";
    setCookie("choices", choice, 365);
    return;
  }
  document.cookie = "choices=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  pin.style.color = "white";
});

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const queryInfo = {
      text: query.value,
    };
    chrome.search.query(queryInfo, (err) => {
      console.log({ err });
    });
  }
});
search.addEventListener("click", () => {
  const queryInfo = {
    text: query.value,
  };
  chrome.search.query(queryInfo, (err) => {
    console.log({ err });
  });
});
