Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };

  Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

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

let debuga = 0;
let debugc = 0;

let mouseEvent = {clientX: -9999, clientY: -9999};

{
    let canvas = document.getElementById("about-canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var img = new Image();

    const hCount = 20;
    const vCount = 12;
    const xspread = 2000;
    const yspread = 0;
    const speed = 1 - 0.10;
    const angleSpread = 0;
    const epsilon = 0.1;
    let points = [];
    const signedRnd = _ => 0.5 - Math.random();
    for (let i = 0; i < vCount; i++) {
        points[i] = [];
        for (let j = 0; j < hCount; j++) {
            points[i][j] = {
                x: canvas.width / hCount * (j + ((j == 0 || j == hCount - 1) ? 0 : Math.random())),
                y: canvas.height / vCount * (i + ((i == 0 || i == vCount - 1) ? 0 : Math.random())),
                offset1x: signedRnd() * xspread,
                offset1y: signedRnd() * yspread,
                offset2x: signedRnd() * xspread,
                offset2y: signedRnd() * yspread,
                angle1: signedRnd() * angleSpread,
                angle2: signedRnd() * angleSpread
            };
        }
    }

    img.addEventListener('load', function () {


        const centerx = canvas.width / 2 - img.width / 2;
        const centery = canvas.height / 2 - img.height / 2;

        function drawSegment(image, p1, p2, p3, offsetx, offsety, angle, scale) {
            ctx.save();
            if (offsetx || offsety) {
                ctx.translate(offsetx, offsety);
            }

            if (angle || scale) {
                center = {
                    x: (p1.x + p2.x + p3.x) / 3,
                    y: (p1.y + p2.y + p3.y) / 3
                };
                ctx.translate(center.x, center.y)
                ctx.rotate(angle);
                ctx.scale(scale, scale);
                ctx.translate(-center.x, -center.y)
            }
            
            

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.clip();
            ctx.drawImage(image, centerx, centery);
            ctx.restore();

        }

        function draw() {
            let [mx, my] = getMousePos(canvas, mouseEvent);
            let done = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);     
            for (let i = 0; i < vCount - 1; i++) {
                for (let j = 0; j < hCount - 1; j++) {
                    const p1 = points[i][j];
                    const p2 = points[i + 1][j];
                    const p3 = points[i][j + 1];
                    const p4 = points[i + 1][j + 1];

                    let distSq = Math.pow(mx - p1.x, 2) + Math.pow(my - p1.y, 2);
                    debuga += distSq; debugc++;
                    let scale = Math.pow(0.8 * distSq.map(0, 400000, 0, 1) + .95, 2).clamp(0, 1); //NO TOUCH ME
                    drawSegment(img, p1, p2, p3, p1.offset1x, p1.offset1y, p1.angle1, scale);
                    drawSegment(img, p2, p3, p4, p1.offset2x, p1.offset2y, p1.angle2, scale);

                    [
                        "offset1x",
                        "offset1y",
                        "offset2x",
                        "offset2y",
                        "angle1",
                        "angle2"].forEach(p => p1[p] *= Math.abs(p1[p]) > epsilon ? speed : 0)
                }
            }
            window.requestAnimationFrame(draw);
        }
        window.requestAnimationFrame(draw);
    }, false);
    img.src = 'about.png';
}

window.addEventListener("mousemove", e => mouseEvent = e);

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return [
        evt.clientX - rect.left,
        evt.clientY - rect.top
    ];
}