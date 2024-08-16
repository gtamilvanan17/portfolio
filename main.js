// import projectsData from "./assets/json/projects.json" assert { type: "json" };

/*---------- Progress Bar Start --------*/
// When the user scrolls the page, execute pageScroll function 
window.onscroll = function() {
  pageScroll();
};

function pageScroll() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("proBar").style.width = scrolled + "%";
}
/*---------- Progress Bar Start --------*/

const reveal = {
  distance: "30px",
  easing: "ease-in",
  duration: 500,
  delay: 300,
  origin: "top",
};
ScrollReveal().reveal(".main", reveal);

/*---------------- MENU SHOW Y HIDDEN ----------------*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

const themesMenu = document.getElementById("themes-menu"),
  themesToggle = document.getElementById("themes-menu-toggle"),
  themesClose = document.getElementById("themes-close");

/*---- MENU SHOW ----*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
    themesMenu.classList.remove("show-menu");
  });
}

if (themesToggle) {
  themesToggle.addEventListener("click", () => {
    themesMenu.classList.add("show-menu");
    navMenu.classList.remove("show-menu");
  });
}

/*---- MENU HIDDEN ----*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

if (themesClose) {
  themesClose.addEventListener("click", () => {
    themesMenu.classList.remove("show-menu");
  });
}

/*---------------- REMOVE MENU MOBILE ----------------*/
const navLink = document.querySelectorAll(".nav_link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  //when we click on each nav_link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*---------------- SKILLS ----------------*/
const skillsContent = document.getElementsByClassName("skills_content"),
  skillsHeader = document.querySelectorAll(".skills_header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills_content skills_close";
  }
  if (itemClass === "skills_content skills_close") {
    this.parentNode.className = "skills_content skills_open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*---------------- SERVICES MODAL ----------------*/

/*-------------------------PROJECTS-------------------- */
await fetch("./assets/json/projects.json")
  .then((response) => {
    return response.json();
  })
  .then((projectsData) => {
    console.log(projectsData);
    document.getElementById("project-cards").innerHTML = `
         ${projectsData
           .map(function (project) {
             return `
          <!-----------Project Card--------------->
           <div class="project_card card swiper-slide" >
          
            <img class="project_image" src="${project.image}"/>
          
            <div class="project_data">
              <h3 class="project_title">${project.title}</h3>
          
              <p class="project_description">
                  ${project.description}
              </p>
          
              <a href="${project.sourceLink}" target="_blank" class="button button-flex button-small project_button">Checkout<i class="uil uil-external-link-alt button_icon checkout_button_icon"></i></a>
          
            </div>
          </div> 
          `;
           })
           .join("")} 
      `;
  });

/*-------------------- PROJECTS SWIPER  ----------------*/
var swiper = new Swiper(".projects_content", {
  slidesPerView: 2,
  spaceBetween: 30,
  slidesPerGroup: 1,
  loop: true,
  centerSlide: true,
  loop: true,
  fade: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    568: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1366: {
      slidesPerView: 5,
    },
  },
});
/*-------------------------- BLOGS ----------------------------*/
function readingTime(text) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}


// Function to fetch Medium blogs using RSS feed
async function fetchMediumBlogs(username) {
  const rssFeedUrl = `https://medium.com/feed/@${username}`;
  const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`);
  return response.json();
}

// Username for Medium (replace with the desired username)
const mediumUsername = 'cdops1official';

// Fetch Medium blogs and inject into the DOM
fetchMediumBlogs(mediumUsername).then((result) => {
  const articles = result.items; // Assuming 'items' contains the blog posts in the response
  let container = document.createElement("div");
  container.classList.add("blog_items");

  articles.forEach((article) => {
    let blog_item = document.createElement("div");
    blog_item.classList.add("blog_item", "card");

    let blog_content = document.createElement("div");
    blog_content.classList.add("blog_content");

    let article_link = article.link;

    let title = document.createElement("h3");
    title.classList.add("blog_title");
    let title_link = document.createElement("a");
    title_link.target = "_blank";
    title_link.href = article_link;
    title_link.innerText = article.title;
    title.appendChild(title_link);

    let pubDate = new Date(Date.parse(article.pubDate));
    let options = { day: "numeric", month: "long", year: "numeric" };
    let date_added = document.createElement("span");
    date_added.classList.add("blog_date"); // Apply existing styles
    date_added.innerHTML = `<i class="uil uil-calender"></i> ${pubDate.toLocaleString("en-US", options)}`;

    let read_more_link = document.createElement("a");
    read_more_link.target = "_blank";
    read_more_link.href = article.link;
    read_more_link.classList.add("read_more_button");
    read_more_link.innerHTML = `Read more <i class="uil uil-external-link-alt"></i>`;

    let meta_data = document.createElement("div");
    meta_data.appendChild(date_added);

    let read_more_container = document.createElement("div");
    read_more_container.appendChild(read_more_link);

    blog_content.appendChild(title);
    blog_content.appendChild(meta_data);
    blog_content.appendChild(read_more_container);
    blog_item.appendChild(blog_content);
    container.appendChild(blog_item);
  });

  document.querySelector(".blogs_container").appendChild(container);
});


/*---------------- SCROLL SECTIONS ACTIVE LINK ----------------*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    let sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav_menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav_menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);
/*---------------- CHANGE BACKGROUND HEADER ----------------*/
function scrollHeader() {
  const nav = document.getElementById("header");

  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}

window.addEventListener("scroll", scrollHeader);

/*---------------- SHOW SCROLL UP ----------------*/
function scrollUp() {
  const scrollUpButton = document.getElementById("scroll-up");

  if (this.scrollY >= 560) scrollUpButton.classList.add("scroll-show");
  else scrollUpButton.classList.remove("scroll-show");
}

window.addEventListener("scroll", scrollUp);

/*---------------- DARK LIGHT themes ----------------*/
const darkLightThemeButton = document.getElementById("dark_light-theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

//  localStorage theme is being retrieved if the site was previously visited
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  darkLightThemeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  darkLightThemeButton.classList[
    selectedIcon === "uil-moon" ? "add" : "remove"
  ](iconTheme);
}

darkLightThemeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  darkLightThemeButton.classList.toggle(iconTheme);

  // storing current theme to local storage
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*------------------- Color Themes --------------------- */
const gradientThemesButtons = document.querySelectorAll(".theme_item");

const selectedGradientThemeIndexNumber = localStorage.getItem(
  "selectedGradientThemeIndexNumber"
);

if (selectedGradientThemeIndexNumber) {
  gradientThemesButtons.forEach((el, id) => {
    if (selectedGradientThemeIndexNumber == id) {
      toggleColorTheme(el, id);
    }
  });
}

function toggleColorTheme(element, indexNumber) {
  let itemId = element.id;

  for (let i = 0; i < gradientThemesButtons.length; i++) {
    gradientThemesButtons[i].classList.remove("theme-selected");
    document.body.classList.remove("gradient-theme-" + (i + 1));
  }

  document.body.classList.add(itemId);
  element.classList.add("theme-selected");

  //storing current gradient theme to local storage
  localStorage.setItem("selectedGradientThemeIndexNumber", indexNumber);
}

gradientThemesButtons.forEach((el, id) => {
  el.addEventListener("click", () => {
    toggleColorTheme(el, id);
  });
});
