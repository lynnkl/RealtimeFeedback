function highlightCurrentPage() {
    const currentPage = window.location.pathname;

    if(currentPage === "/") {
        const navElement = document.getElementById("home-link-nav");
        if (navElement != null) {
            
            navElement.classList.add('currentPage');
        }
    } else if(currentPage === "/login") {
        document.getElementById("login-link-nav").classList.add('currentPage');
    } else if(currentPage === "/register") {
        document.getElementById("register-link-nav").classList.add('currentPage');
    } else if(currentPage === "/realtimefeedback") {
        document.getElementById("feedback-link-nav").classList.add('currentPage');
    } 

}

highlightCurrentPage();