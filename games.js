var modal = document.getElementById('myModal');

var span = document.getElementsByClassName("close")[0];
let last;
[].forEach.apply(document.getElementsByClassName("gamethumb"), [b => b.onclick = function() {
    let id = last = b.getAttribute("game")
    document.getElementById(`game-${id}-canvas`).style.display = "block"
    eval(`game${id}()`)
    modal.style.display = "block";
}])

span.onclick = function() {
    document.getElementById(`game-${last}-canvas`).style.display = "none"
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        document.getElementById(`game-${last}-canvas`).style.display = "none"
        modal.style.display = "none";
    }
}