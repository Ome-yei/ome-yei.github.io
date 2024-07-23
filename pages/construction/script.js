/*
    TODO: 
        [X] ->  on hamburger menu icon click, display the nav menu by adding the class and also change the icon to the closing icon
        [X] -> have the logo and icon change color from white to color when user scrolls - this will be done by changing the svg
        [] -> on nav option click, take the user to the clicked section - implement when sections are setup
        [X] -> add border line to the bottom of the header when nav options are open
        [X] -> animate the nav menu coming in and out.
        [X] -> refactor code
        [X] -> style the nav options: 
        [X] -> remove the underline, 
        [X] -> close the nav menu when a click event happens outside of it.
        [] -> scroll to the specific section when a nav item is clicked
*/

/*=============================== HEADER ===============================*/
const logoColors = {
  colorSrc: "assets/logo/J&L Logo-Color.svg",
  whiteSrc: "assets/logo/J&L Logo-White.svg",
};

const closeIconColors = {
  colorSrc: "assets/icons/close_Icon-color.svg",
  whiteSrc: "assets/icons/close_Icon-white.svg",
};

const hamburgerIconColors = {
  colorSrc: "assets/icons/menu_Icon-color.svg",
  whiteSrc: "assets/icons/menu_Icon-white.svg",
};

/* change header and Icon colors onScroll */
const headerContainer = document.querySelector(".navigation-header-container");
const heroSection = document.querySelector(".hero-section");

const logoImgElement = document.querySelector(
  ".navigation-header-logo-container img"
);
const menuImgElement = document.querySelector(
  ".navigation-header-menu-icon img"
);
const navMenuContainerElement = document.querySelector(
  ".navigation-header-nav-container"
);

const observerOptions = {
  rootMargin: `-500px 0px 0px 0px`,
};

const headerObserver = new IntersectionObserver((entries, headerObserver) => {
  const isNavMenuOpen = navMenuContainerElement.classList.contains(
    "show_navigation-header-nav-container"
  );

  const [entry] = entries;
  if (!entry.isIntersecting) {
    headerContainer.classList.add("add_navigation-header-container-color");
    logoImgElement.src = logoColors.colorSrc;
    menuImgElement.src = !isNavMenuOpen
      ? hamburgerIconColors.colorSrc
      : closeIconColors.colorSrc;
  } else {
    headerContainer.classList.remove("add_navigation-header-container-color");
    logoImgElement.src = logoColors.whiteSrc;
    menuImgElement.src = !isNavMenuOpen
      ? hamburgerIconColors.whiteSrc
      : closeIconColors.whiteSrc;
  }
}, observerOptions);

headerObserver.observe(heroSection);

/* toggle open nav menu */
const menuIconContainer = document.querySelector(
  ".navigation-header-menu-icon"
);

const hideNavMenu = () => {
  const isHeaderColorBackground = headerContainer.classList.contains(
    "add_navigation-header-container-color"
  );

  const hamburgerIconSrc = isHeaderColorBackground
    ? hamburgerIconColors.colorSrc
    : hamburgerIconColors.whiteSrc;

  menuImgElement.src = hamburgerIconSrc;
  navMenuContainerElement.classList.remove(
    "show_navigation-header-nav-container"
  );
  navMenuContainerElement.style.maxHeight = "0px";
};

const showNavMenu = () => {
  const isHeaderColorBackground = headerContainer.classList.contains(
    "add_navigation-header-container-color"
  );

  const navMenuElementHeight = navMenuContainerElement.scrollHeight;

  const closeIconSrc = isHeaderColorBackground
    ? closeIconColors.colorSrc
    : closeIconColors.whiteSrc;

  menuImgElement.src = closeIconSrc;
  navMenuContainerElement.classList.add("show_navigation-header-nav-container");
  // set max-height to animate the nav menu opening
  navMenuContainerElement.style.maxHeight = `${navMenuElementHeight}px`;
};

const toggleMenu = () => {
  const isNavMenuOpen = navMenuContainerElement.classList.contains(
    "show_navigation-header-nav-container"
  );
  isNavMenuOpen ? hideNavMenu() : showNavMenu();
};

const hideNavMenuWhenClickedOutside = (event) => {
  const clickedInsideNavMenu = headerContainer.contains(event.target);
  const isNavMenuOpen = navMenuContainerElement.classList.contains(
    "show_navigation-header-nav-container"
  );

  const shouldHideNavMenu = !clickedInsideNavMenu && isNavMenuOpen;
  shouldHideNavMenu && hideNavMenu();
};

menuIconContainer.addEventListener("click", toggleMenu);
document.addEventListener("click", hideNavMenuWhenClickedOutside);
