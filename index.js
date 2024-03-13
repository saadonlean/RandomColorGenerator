const containerEL = document.querySelector(".container");
const gButton = document.querySelector(".gButton");
const buttonContainer = document.querySelector(".buttoncontainer");
const bookmarkfeedbackEL = document.querySelector(".bookmarked");
const bookmarkAllButton = document.querySelector(".bmAllButton");
const bookmarkList = [];
const inputEL = document.getElementById("input");
const savedEL = document.getElementById("saved");
const darkmodeEL = document.getElementById("darkmode-toggle");
const sidebarEL = document.querySelector(".sidebar");
const sidebarMenu = document.getElementById("hamburger");
const sidebarCloseEL = document.querySelector(".sidebarX");

sidebarEL.style.visibility = "hidden";
const loadSaved = () => {
  const saved = localStorage.getItem("bookmarkList");
  if (saved) {
    bookmarkList.push(...JSON.parse(saved));
  }
};
loadSaved();
const showSidebar = () => {
  if (sidebarEL.style.visibility == "hidden") {
    sidebarEL.style.visibility = "visible";
    sidebarEL.style.transform = "translateX(0)";
  } else {
    sidebarEL.style.visibility = "hidden";
    sidebarEL.style.transform = "translateX(100%)";
  }
};

const extractInput = () => {
  const amount = Number(inputEL.textContent);
  return amount;
};
//* Function to create x containers and their bookmark icons
const containersCreate = (containerNum) => {
  for (let index = 0; index < containerNum; index++) {
    const colorContainerEL = document.createElement("div");
    const bookmarkIconEL = document.createElement("div");
    bookmarkIconEL.style.backgroundColor = "red";
    bookmarkIconEL.classList.add("bookmark-icon");
    colorContainerEL.classList.add("color-container");
    containerEL.appendChild(colorContainerEL);
    colorContainerEL.appendChild(bookmarkIconEL);
    bookmarkIconEL.style.backgroundImage =
      "url('bookmark-svgrepo-com (1).svg')";
  }
};

containersCreate(30);
const colorContainerELs = document.querySelectorAll(".color-container");

const resetMarks = () => {
  colorContainerELs.forEach((colorContainerEL) => {
    const bookmarkIconEL = colorContainerEL.querySelector(".bookmark-icon");
    bookmarkIconEL.style.backgroundColor = "red";
  });
};

//* Function to apply random color to each container
const generateColor = () => {
  resetMarks();
  colorContainerELs.forEach((colorContainerEL) => {
    const newColor = randomColor();
    colorContainerEL.style.backgroundColor = `#${newColor}`;

    const existingSpan = colorContainerEL.querySelector("span");
    if (existingSpan) {
      existingSpan.textContent = `#${newColor}`;
    } else {
      const colorCodeSpan = document.createElement("span");
      colorCodeSpan.textContent = `#${newColor}`;
      colorContainerEL.appendChild(colorCodeSpan);
    }
    if (bookmarkList.includes(`#${newColor}`)) {
      const bookmarkIconEL = colorContainerEL.querySelector(".bookmark-icon");
      bookmarkIconEL.style.backgroundColor = "green";
    }
  });
};

//* Function to randomize the color for each container
const randomColor = () => {
  const chars = "0123456789abcdef";
  let color = "";
  for (let index = 0; index < 6; index++) {
    const random = Math.floor(Math.random() * chars.length);
    if (random >= 0 && random < chars.length) {
      color += chars.charAt(random);
    } else {
      console.error(`Invalid random value: ${random}`);
      return null;
    }
  }
  return color;
};

generateColor();

//* Function to bookmark the color and remove it
const bookmark = (bookmarkIconEL) => {
  const colorContainerEL = bookmarkIconEL.parentNode;
  const colorCodeSpan = colorContainerEL.querySelector("span");
  const textContent = colorCodeSpan.textContent;

  const existingBookmarkFeedback = containerEL.querySelector(".bookmarked");
  if (existingBookmarkFeedback) {
    existingBookmarkFeedback.remove();
  }

  if (bookmarkIconEL.style.backgroundColor == "red") {
    bookmarkIconEL.style.backgroundImage =
      "url('bookmark-check-svgrepo-com.svg')";
    bookmarkIconEL.style.backgroundColor = "green";

    bookmarkList.push(textContent);
  } else if (bookmarkIconEL.style.backgroundColor == "green") {
    bookmarkIconEL.style.backgroundColor = "red";
    bookmarkIconEL.style.backgroundImage =
      "url('bookmark-svgrepo-com (1).svg')";

    // Remove the bookmark
    const bm = bookmarkList.indexOf(textContent);
    bookmarkList.splice(bm, bm + 1);
  }

  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
};

const bookmarkAll = () => {
  colorContainerELs.forEach((colorContainerEL) => {
    const toBookmark = colorContainerEL.querySelector(".bookmark-icon");
    bookmark(toBookmark);
  });
};

gButton.addEventListener("click", generateColor);

const bookmarkIconELs = document.querySelectorAll(".bookmark-icon");

bookmarkIconELs.forEach((bookmarkIconEL) => {
  bookmarkIconEL.addEventListener("click", () => bookmark(bookmarkIconEL));
});

bookmarkAllButton.addEventListener("click", bookmarkAll);
const bookmarkIconEL = document.querySelector(".bookmark-icon");

//* Bookmark icon hover changes the bookmark icon to x or check
bookmarkIconELs.forEach((bookmarkIconEL) => {
  bookmarkIconEL.addEventListener("mouseover", (event) => {
    if (event.target.style.backgroundColor === "green") {
      event.target.style.backgroundImage = "url('bookmark-x-svgrepo-com.svg')";
    }
  });
});

bookmarkIconELs.forEach((bookmarkIconEL) => {
  bookmarkIconEL.addEventListener("mouseout", (event) => {
    if (event.target.style.backgroundColor === "green") {
      event.target.style.backgroundImage =
        "url('bookmark-check-svgrepo-com.svg')";
    }
  });
});

//* Function to toggle dark mode
const darkmode = () => {
  if (darkmodeEL.checked == true) {
    const body = document.querySelector("body");
    body.style.backgroundColor = "#2b2b2b";
    body.style.transition = "all 0.5s ease";
    localStorage.setItem("darkmode", "true");
  } else {
    const body = document.querySelector("body");
    body.style.backgroundColor = "white";
    body.style.transition = "all 0.5s ease";
    localStorage.setItem("darkmode", "false");
  }
};

darkmodeEL.addEventListener("click", darkmode);
//* Function to set selected from local storage on page refresh
const setMode = () => {
  if (localStorage.getItem("darkmode") == "true") {
    darkmodeEL.checked = true;
    darkmode();
  } else {
    darkmodeEL.checked = false;
    darkmode();
  }
};

sidebarMenu.addEventListener("click", showSidebar);
sidebarCloseEL.addEventListener("click", showSidebar);
setMode();

window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    const gHolderEL = document.createElement("li");
    sidebar.appendChild(gHolderEL);
    gHolderEL.appendChild(gButton);
    const bmAllHolderEL = document.createElement("li");
    sidebar.appendChild(bmAllHolderEL);
    bmAllHolderEL.appendChild(bmAllButton);
    bmAllButton.style.paddingTop = "10px";
    bmAllButton.style.paddingBottom = "10px";
    bmAllButton.style.marginLeft = "5px";
    bmAllButton.style.marginTop = "15px";
    gButton.style.paddingTop = "10px";
    gButton.style.paddingBottom = "10px";
    gButton.style.marginTop = "25px";
    gButton.style.marginLeft = "5px";
  } else {
    document.querySelector(".buttoncontainer").appendChild(gButton);
    document.querySelector(".buttoncontainer").appendChild(bmAllButton); // Move the button back to the navbar
    bmAllButton.style.padding = "";
    bmAllButton.style.marginLeft = "";
    bmAllButton.style.marginTop = "";
    gButton.style.padding = "";
    gButton.style.marginLeft = "";
    gButton.style.marginTop = "";	
    
    if (gHolderEL) {
      sidebar.removeChild(gHolderEL);
    }
    if (bmAllHolderEL) {
      sidebar.removeChild(bmAllHolderEL);
    }
  }
});

if (window.innerWidth <= 768) {
  window.dispatchEvent(new Event("resize"));
}
