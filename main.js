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

        const hCount = 25;
        const vCount = 10;
        const spread = 2000;
        const speed = 1 - 0.10;
        const angleSpread = 10;
        const epsilon =  0.0015;
        let points = [];
        const signedRnd = _ => 0.5 - Math.random();
        for (let i = 0; i < vCount; i++) {
            points[i] = [];
            for (let j = 0; j < hCount; j++) {
                points[i][j] = {
                    x: canvas.width / hCount * (j + ((j == 0 || j == hCount - 1) ? 0 : Math.random())),
                    y: canvas.height / vCount * (i + ((i == 0 || i == vCount - 1) ? 0 : Math.random())),
                    offset1x: signedRnd() * spread,
                    offset1y: signedRnd() * spread,
                    offset2x: signedRnd() * spread,
                    offset2y: signedRnd() * spread,
                    angle1: signedRnd() * angleSpread,
                    angle2: signedRnd() * angleSpread
                };
            }
        }

        const centerx = canvas.width / 2 - img.width / 2;
        const centery = canvas.height / 2 - img.height / 2;

        function draw()
        {
            let done = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);                                
            for (let i = 0; i < vCount - 1; i++) {
                for (let j = 0; j < hCount - 1; j++) {
                        const p1 = points[i][j];

                        if(p1.done)
                        {
                            continue;
                        }
                        else if(Math.abs(p1.offset1x) < epsilon && Math.abs(p1.offsety) < epsilon
                                && Math.abs(p1.offset2x) < epsilon && Math.abs(p1.offset2y) < epsilon)
                        {
                            p1.done = true;
                            p1.offset1x = p1.offset1y = p1.offset2x = p1.offset2y = 0;
                        }
                        else
                        {
                            done = false;
                        }

                        const p2 = points[i + 1][j];
                        const p3 = points[i][j + 1];
                        const p4 = points[i + 1][j + 1];

                        p1.center1 = p1.center1 || (p1.center1 = { x: (p1.x + p2.x + p3.x) / 3, y: (p1.y + p2.y + p3.y) / 3});
                        p1.center2 = p1.center2 || (p1.center2 = { x: (p2.x + p3.x + p4.x) / 3, y: (p2.y + p3.y + p4.y) / 3});
                        
                        ctx.save();
                        ctx.translate(p1.offset1x, p1.offset1y);
                        
                        ctx.translate(p1.center1.x, p1.center1.y)
                        ctx.rotate(p1.angle1);    
                        ctx.translate(-p1.center1.x, -p1.center1.y)
                        
                        
                        ctx.beginPath();                                                               
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.lineTo(p3.x, p3.y);
                        ctx.clip();                    
                        ctx.drawImage(img, centerx, centery);
                        ctx.restore();

                        ctx.save();   
                        ctx.translate(p1.offset2x, p1.offset2y);   
                        
                        ctx.translate(p1.center2.x, p1.center2.y)
                        ctx.rotate(p1.angle2);    
                        ctx.translate(-p1.center2.x, -p1.center2.y)   

                          
                        ctx.beginPath();   
                        ctx.moveTo(p2.x, p2.y);
                        ctx.lineTo(p3.x, p3.y);
                        ctx.lineTo(p4.x, p4.y);
                        ctx.clip();                    
                        ctx.drawImage(img, centerx, centery);                        
                        ctx.restore();
                        p1.offset1x *= speed;
                        p1.offset1y *= speed;
                        p1.offset2x *= speed;
                        p1.offset2y *= speed;
                        p1.angle1 *= speed;
                        p1.angle2 *= speed;
                }
            }
            if(done){
                console.log("done");
                return;
            }
            window.requestAnimationFrame(draw);
        }
        window.requestAnimationFrame(draw);
    }, false);
    img.src = 'about.png';
}