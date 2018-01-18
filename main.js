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

{
    let canvas = document.getElementById("about-canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var img = new Image();
    img.addEventListener('load', function () {

        const hCount = 40;
        const vCount = 20;
        let points = [];

        for (let i = 0; i < vCount; i++) {
            points[i] = [];
            for (let j = 0; j < hCount; j++) {
                points[i][j] = {
                    x: canvas.width / hCount * (j + ((j == 0 || j == hCount - 1) ? 0 : Math.random())),
                    y: canvas.height / vCount * (i + ((i == 0 || i == vCount - 1) ? 0 : Math.random())),
                    offsetx: (0.5 - Math.random()) * 2000,
                    offsety: (0.5 - Math.random()) * 2000
                };
            }
        }

        function lerp(v0, v1, t) {
            return v0*(1-t)+v1*t
        }


        function draw()
        {
            ctx.clearRect(0, 0, canvas.width, canvas.height);                                
            for (let i = 0; i < vCount - 1; i++) {
                for (let j = 0; j < hCount - 1; j++) {
                    {
                        ctx.save();
                        let p1 = points[i][j];
                        let p2 = points[i + 1][j];
                        let p3 = points[i][j + 1];
                        ctx.translate(p1.offsetx, p1.offsety);     
                        ctx.beginPath();                                                               
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.lineTo(p3.x, p3.y);
                        ctx.fillStyle = "red";
                        ctx.clip();                    
                        ctx.drawImage(img, canvas.width / 2 - img.width / 2,
                            canvas.height / 2 - img.height / 2);
                        ctx.restore();
                    } 
                    {
                        ctx.save();    
                        let p1 = points[i + 1][j];
                        let p2 = points[i][j + 1];
                        let p3 = points[i + 1][j + 1];
                        ctx.translate(p1.offsetx, p1.offsety);     
                        ctx.beginPath();   
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.lineTo(p3.x, p3.y);
                        ctx.fillStyle = "green";
                        ctx.clip();                    
                        ctx.drawImage(img, canvas.width / 2 - img.width / 2,
                            canvas.height / 2 - img.height / 2);
                        ctx.restore();
                        p1.offsetx = lerp(p1.offsetx, 0, 0.05);
                        p1.offsety = lerp(p1.offsety, 0, 0.05);
                    }
                }
            }
            window.requestAnimationFrame(draw);    
        }
        
        window.requestAnimationFrame(draw);
    }, false);
    img.src = 'about.png';
}