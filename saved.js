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
const headingEL = document.querySelector(".heading");

sidebarEL.style.visibility = "hidden";

const showSidebar = () => {
  if (sidebarEL.style.visibility == "hidden") {
    sidebarEL.style.visibility = "visible";
    sidebarEL.style.transform = "translateX(0)";
  } else {
    sidebarEL.style.visibility = "hidden";
    sidebarEL.style.transform = "translateX(100%)";
  }
};
const loadSaved = () => {
  const saved = localStorage.getItem("bookmarkList");
  if (saved) {
    bookmarkList.push(...JSON.parse(saved));
    headingEL.textContent = "Saved(" + String(bookmarkList.length) + ")";
  }
  headingEL.textContent =
    "Your saved colors (" + String(bookmarkList.length) + ")";
};
loadSaved();

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
    
    const copyIconEL = document.createElement("div");
    copyIconEL.classList.add("copy-icon");
    colorContainerEL.appendChild(copyIconEL);
    copyIconEL.style.backgroundImage = "url('copy-svgrepo-com.svg')";
  }
};

const generateSaved = () => {
  containersCreate(bookmarkList.length);
};
generateSaved();
const colorContainerELs = document.querySelectorAll(".color-container");

const resetMarks = () => {
  colorContainerELs.forEach((colorContainerEL) => {
    const bookmarkIconEL = colorContainerEL.querySelector(".bookmark-icon");
    bookmarkIconEL.style.backgroundColor = "red";
  });
};

//* Function to apply random color to each container
const generateColor = (color, colorContainerEL) => {
  colorContainerEL.style.backgroundColor = `${color}`;

  const existingSpan = colorContainerEL.querySelector("span");
  if (existingSpan) {
    existingSpan.textContent = `${color}`;
  } else {
    const colorCodeSpan = document.createElement("span");
    colorCodeSpan.textContent = `${color}`;
    colorContainerEL.appendChild(colorCodeSpan);
  }
  if (bookmarkList.includes(`${color}`)) {
    const bookmarkIconEL = colorContainerEL.querySelector(".bookmark-icon");
    bookmarkIconEL.style.backgroundColor = "green";
    bookmarkIconEL.style.backgroundImage =
      "url('bookmark-check-svgrepo-com.svg')";
  }
};

//* Function to randomize the color for each container

//* Function to bookmark the color and remove it
const bookmark = (bookmarkIconEL) => {
  const colorContainerEL = bookmarkIconEL.parentNode;
  const colorCodeSpan = colorContainerEL.querySelector("span");
  const textContent = colorCodeSpan.textContent;

  if (bookmarkIconEL.style.backgroundColor == "red") {
    bookmarkIconEL.style.backgroundImage =
      "url('bookmark-check-svgrepo-com.svg')";
    bookmarkIconEL.style.backgroundColor = "green";

    bookmarkList.push(textContent);
  } else if (bookmarkIconEL.style.backgroundColor == "green") {
    bookmarkIconEL.style.backgroundColor = "red";
    bookmarkIconEL.style.backgroundImage =
      "url('bookmark-svgrepo-com (1).svg')";

    const bm = bookmarkList.indexOf(textContent);
    bookmarkList.splice(bm, 1);
  }

  headingEL.textContent =
    "Your saved colors (" + String(bookmarkList.length) + ")";
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
};

const bookmarkIconELs = document.querySelectorAll(".bookmark-icon");

bookmarkIconELs.forEach((bookmarkIconEL) => {
  bookmarkIconEL.addEventListener("click", () => bookmark(bookmarkIconEL));
});

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
    headingEL.style.color = "white";
    body.style.height = "100%";
    body.style.backgroundColor = "#2b2b2b";
    body.style.transition = "all 0.5s ease";
    localStorage.setItem("darkmode", "true");
  } else {
    const body = document.querySelector("body");
    headingEL.style.color = "black";
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

let timeoutId; // globale Variable zum Speichern der Timer-ID

const copy = (copyIconEL) => {
  const colorContainerEL = copyIconEL.parentNode;
  const colorCodeSpan = colorContainerEL.querySelector("span");
  const textContent = colorCodeSpan.textContent;
  navigator.clipboard.writeText(textContent);
  const copiedFeedback = document.querySelector(".copiedContainer");

  // Timer löschen, wenn vorhanden
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  if (copiedFeedback.style.transform === "translateY(0%) translateX(-50%)") {
    copiedFeedback.style.transform = "";
    setTimeout(() => {
      copiedFeedback.style.transform = "translateY(0%) translateX(-50%)";
    }, 200);
  } else {
    copiedFeedback.style.transform = "translateY(0%) translateX(-50%)";
  }

  // Neuen Timer starten und Timer-ID speichern
  timeoutId = setTimeout(() => {
    copiedFeedback.style.transform = "translateY(-300%) translateX(-50%)";
  }, 2000);
};

const savedContainers = () => {
  const createdContainerELs = document.querySelectorAll(".color-container");
  if (bookmarkList.length !== 0) {
    for (let i = 0; i < createdContainerELs.length; i++) {
      const colorContainerEL = createdContainerELs[i];
      const colorCode = bookmarkList[i];
      if (colorCode && colorContainerEL) {
        generateColor(colorCode, colorContainerEL);
      }
    }
  }
};
colorContainerELs.forEach((colorContainerEL) => {
  const copyIconEL = colorContainerEL.querySelector(".copy-icon");
  copyIconEL.addEventListener("click", () => copy(copyIconEL));
});
sidebarMenu.addEventListener("click", showSidebar);
sidebarCloseEL.addEventListener("click", showSidebar);
setMode();

savedContainers();

const rmAllButton = document.getElementById("rmAllButton");
const sidebar = document.getElementById("sidebar");

window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    const buttonholderEL = document.createElement("li");
    sidebar.appendChild(buttonholderEL);
    buttonholderEL.appendChild(rmAllButton);
    rmAllButton.style.padding = "10px";
    rmAllButton.style.marginLeft = "5px";
    rmAllButton.style.marginTop = "25px";
    rmAllButton.style.transform = "translateX(0)";
  } else {
    document.querySelector(".buttoncontainer").appendChild(rmAllButton); // Move the button back to the navbar
    rmAllButton.style.padding = "";
    rmAllButton.style.marginLeft = "";
    rmAllButton.style.marginTop = "";
    rmAllButton.style.transform = "";
    if (rmAllHolderEL) {
      sidebar.removeChild(rmAllHolderEL);
    }
  }
});

if (window.innerWidth <= 768) {
  window.dispatchEvent(new Event("resize"));
}

const rmButtonEL = document.getElementById("rmAllButton");

rmButtonEL.addEventListener("click", () => {
    colorContainerELs.forEach((colorContainerEL) => {
      const toBookmark = colorContainerEL.querySelector(".bookmark-icon");
      bookmark(toBookmark);
    });
})

