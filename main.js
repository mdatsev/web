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