// Simple alert on contact form submit
document.querySelector("form")?.addEventListener("submit", function(e){
    e.preventDefault();
    alert("Thank you! We will contact you soon.");
});
window.addEventListener("scroll", () => {
    document.querySelectorAll(".service-box").forEach(box => {
        box.style.opacity = "1";
    });
});


document.querySelector(".menu-toggle").onclick = function() {
    document.querySelector("nav").classList.toggle("active");
};