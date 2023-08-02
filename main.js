var objetos = [];
var detectado = false;
function setup() {
    canvas = createCanvas(1000, 700);
    background("green");
    foto.resize(1000, 700);
    detector = ml5.objectDetector("cocossd", listo);
}
function listo() {
    console.log("listo!!!");
    detector.detect(canvas, respuesta);
}
function respuesta(error, resultado) {
    if (!error) {
        console.log(resultado);
        objetos = resultado;
        detectado = true;
    }
}
function preload() {
    foto = loadImage("https://www.elsoldesinaloa.com.mx/local/ahp784-felinos-rescatados-zoo-culiacan/ALTERNATES/LANDSCAPE_768/felinos-rescatados-zoo-culiacan")
}
function draw() {
    image(foto, 0, 0, 1000, 700)
    if (detectado) {
        for (var i = 0; i < objetos.length; i++) {
            noFill();
            stroke("green");
            rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height)
            nombre = objetos[i].label;
            porcentaje = Math.round(objetos[i].confidence * 100);
            mensaje = nombre + "  " + porcentaje + "%";
            textSize(30);
            text(mensaje, objetos[i].x, objetos[i].y)
        }
    }
}