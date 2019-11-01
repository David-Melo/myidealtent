const NavBackgroundHandler = function() {

    let navElement = document.getElementById('main-nav');

    if (document.body.scrollTop > 75 || document.documentElement.scrollTop > 75) {

        document.getElementById('main-body').className = "";

        if (!navElement.classList.contains('navbar-light')) {
            navElement.classList.toggle('navbar-dark');
            navElement.classList.toggle('navbar-light');
        }

    } else {

        document.getElementById('main-body').className = "at-top";

        if (!navElement.classList.contains('navbar-dark')) {
            navElement.classList.toggle('navbar-dark');
            navElement.classList.toggle('navbar-light');
        }

    }
};

export default NavBackgroundHandler;
