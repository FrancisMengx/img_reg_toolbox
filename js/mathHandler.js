var points = [];
function init(){
     $('.drawingBoard').children().remove();
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            points.push([i*60, j * 60,0,0,0]);

            DrawArrow(i*60, j * 60, i * 60, j*60 , null);
        }
    }
    $('#x-slider').on('slide',function(ev){
         $('.drawingBoard').children().remove();
        for(var i=0; i < points.length; i ++){
            var col = i %10;
            var row = i/10;
            DrawArrow(points[i][0],points[i][1],points[i][0]+ev.value+points[i][4]*(row-5),points[i][1]+points[i][3]+points[i][4]*(col-5));
            points[i][2] = ev.value;
        }
    });
    $('#y-slider').on('slide',function(ev){
         $('.drawingBoard').children().remove();
        for(var i=0; i < points.length; i ++){
            var col = i %10;
            var row = i/10;
            DrawArrow(points[i][0],points[i][1],points[i][0]+points[i][2]+points[i][4]*(row-5),points[i][1]+ev.value+points[i][4]*(col-5));
            points[i][3] = ev.value;
        }
    });
    $('#zoom-slider').on('slide',function(ev){
         $('.drawingBoard').children().remove();
        for(var i=0; i < points.length; i ++){
            var col = i %10;
            var row = i/10;
            DrawArrow(points[i][0],points[i][1],points[i][0]+ev.value*(row-5)+points[i][2],points[i][1]+ev.value*(col-5)+points[i][3]);
            points[i][4] = ev.value;
        }
    });

}

function DrawArrow(x1, y1, x2, y2){
   
    DrawLine(x1, y1, x2, y2);
    rad = Math.atan((y2-y1)/(x2-x1));
    deg = (rad*180)/Math.PI;
    if(x2-x1<0){
        x11 = x2-Math.sin((Math.PI- rad) + Math.PI/4)*7;
        y11 = y2 - Math.cos((Math.PI- rad) + Math.PI/4)*7;
        x12 = x2 - Math.sin((Math.PI- rad) + 3*Math.PI/4)*7;
        y12 = y2 - Math.cos((Math.PI- rad) + 3*Math.PI/4)*7;
    }else{
        x11 = x2-Math.sin((Math.PI- rad) - Math.PI/4)*7;
        y11 = y2 - Math.cos((Math.PI- rad) - Math.PI/4)*7;
        x12 = x2 - Math.sin((Math.PI- rad) - 3*Math.PI/4)*7;
        y12 = y2 - Math.cos((Math.PI- rad) - 3*Math.PI/4)*7;
    }
    DrawLine(x11, y11, x2, y2);
    DrawLine(x12, y12, x2, y2);
    
};

function DrawLine(x1, y1, x2, y2){

    if(y1 < y2){
        var pom = y1;
        y1 = y2;
        y2 = pom;
        pom = x1;
        x1 = x2;
        x2 = pom;
    }

    var a = Math.abs(x1-x2);
    var b = Math.abs(y1-y2);
    var c;
    var sx = (x1+x2)/2;
    var sy = (y1+y2)/2;
    var width = Math.sqrt(a*a + b*b );
    var x = sx - width/2;
    var y = sy;

    a = width / 2;

    c = Math.abs(sx-x);

    b = Math.sqrt(Math.abs(x1-x)*Math.abs(x1-x)+Math.abs(y1-y)*Math.abs(y1-y) );

    var cosb = (b*b - a*a - c*c) / (2*a*c);
    var rad = Math.acos(cosb);
    var deg = (rad*180)/Math.PI

    htmlns = "http://www.w3.org/1999/xhtml";

    var div=$('<div></div>');
    div.attr('style','border:1px solid black;width:'+width+'px;height:0px;-moz-transform:rotate('+deg+'deg);'+
        '-webkit-transform:rotate('+deg+'deg);position:absolute;top:'+y+'px;left:'+x+'px;');   
    $('.drawingBoard').append(div);
}