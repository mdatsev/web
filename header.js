document.querySelectorAll("#nav li a")
.forEach(e => e.classList.remove("active"));
document.querySelector(`a[href="${window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}"]`).classList.add('active');

document.querySelectorAll('a[href*="#"]').forEach(function (el) {
    var targetId = el.hash,
        targetAnchor = document.getElementById(targetId.slice(1));
    if (!targetAnchor) return;
    var targetOffset = targetAnchor.offsetTop;
    el.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelectorAll("#nav li a")
            .forEach(e => e.classList.remove("active"));
        el.classList.add('active');
        window.scroll({
            top: targetOffset,
            behavior: 'smooth'
        });
    });
})

document.getElementById("header").style.width = document.body.clientWidth;