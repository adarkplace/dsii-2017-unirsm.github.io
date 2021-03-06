// Francesco Paolini @francescopaolini © 2017 MIT License
// P5js retrieve data from Google Spreadsheets/JSON | San Marino, RSM | 4.2017
// Educational purpose, made for DSII2017 lab @UniRSM

// example inspired on Gist https://gist.github.com/claytical/6a929f14964c867e07d8 by @claytical

// link del doc google spreasheets, deve essere pubblico su web,
// va copiato la parte di indice nell'url nel formato sotto:
// https://spreadsheets.google.com/feeds/list/
// + KEY_URL + /od6/public/values?alt=json
//

var url = "https://spreadsheets.google.com/feeds/list/1CXyV9zoplZxuiSkvL5GO7Ktr35S3yz_5u6fpCIzPdCM/od6/public/values?alt=json";

 // array per contenere i dati/oggetto
var dati = [];
var scala = 10;

function setup() {
  pixelDensity(displayDensity());
  createCanvas(windowWidth, windowHeight);

  // richiedi i dati formato JSON e poi chiama la funzione gotSpreadsheet
  loadJSON(url, gotSpreadsheet);
  //print("ciao");
  colorMode(HSB);
  rectMode(CENTER);
} // setup()

function draw() {
  // piccolo loop per verificare di avere i dati,
  // stampa su schermo cerchi con i colori presenti nel google doc
  background(36);

  var padding = width/(dati.length+1);
  for (var i = 0; i < dati.length; i++) {
    //fill(dati[i].maschi,dati[i].femmine,dati[i].tasso,dati[i].alpha/75);
    if (dati[i].forma == "cerchio") {


      fill(216,100,84,dati[i].alpha/90);
      ellipse(padding + i * padding, height/1.88,sqrt(dati[i].maschi/PI)*scala,sqrt(dati[i].maschi/PI)*scala);

      fill(349,75,77,dati[i].alpha/90);
      ellipse(padding + i * padding, height/2.1, sqrt(dati[i].femmine/PI)*scala,sqrt(dati[i].femmine/PI)*scala);

      noFill();
      strokeWeight(6);
      stroke(255,0,0,dati[i].alpha/95);
      ellipse(padding + i * padding, height/2, sqrt(dati[i].tasso/PI)*scala,sqrt(dati[i].tasso/PI)*scala);
    }
    noStroke();
    fill(255);
    textAlign(CENTER);

    text(dati[i].colore, padding + (i * padding),height/1.55);
    text(dati[i].maschi, padding + (i * padding),height/1.35);
    text(dati[i].femmine, padding + (i * padding),height/1.4);
    text(dati[i].tasso, padding + (i * padding),height/1.45);



    //push();
    //  translate(padding + (i * padding),height/2));
    //  rotate(PI/2);
    //  text(dati[i].colore, 0 , 0);
   //  pop();
  }

  text("decessi per influenza",210,height/1.6);
  text("decessi per influenza",410,height/1.6);
  text("decessi per influenza",620,height/1.6);
  text("decessi per influenza",820,height/1.6);
  text("decessi per influenza",1030,height/1.6);
  text("decessi per influenza",1235,height/1.6);

  fill(255,0,0);
  ellipse(175,height/1.458,15,15);

    fill(349,75,77);
  ellipse(175,height/1.408,15,15);

  fill(216,100,84);
  ellipse(175,height/1.358,15,15);
//------------------
  fill(255,0,0);
  ellipse(385,height/1.458,15,15);

    fill(349,75,77);
  ellipse(385,height/1.408,15,15);

  fill(216,100,84);
  ellipse(385,height/1.358,15,15);
//------------------
  fill(255,0,0);
  ellipse(590,height/1.458,15,15);

  fill(349,75,77);
  ellipse(590,height/1.408,15,15);

    fill(216,100,84);
  ellipse(590,height/1.358,15,15);
  //------------------
    fill(255,0,0);
    ellipse(795,height/1.458,15,15);

    fill(349,75,77);
    ellipse(795,height/1.408,15,15);

        fill(216,100,84);
    ellipse(795,height/1.358,15,15);
    //------------------
      fill(255,0,0);
      ellipse(1000,height/1.458,15,15);

fill(349,75,77);
      ellipse(1000,height/1.408,15,15);

          fill(216,100,84);
      ellipse(1000,height/1.358,15,15);
      //------------------
        fill(255,0,0);
        ellipse(1205,height/1.458,15,15);

        fill(349,75,77);
        ellipse(1205,height/1.408,15,15);

            fill(216,100,84);
        ellipse(1205,height/1.358,15,15);




  fill(255);
  text("decessi maschili",220,783);
  fill(216,100,84);
  ellipse(150,780,20,20);

  fill(255);
  text("decessi femminili",420,783);
  fill(349,75,77);
  ellipse(350,780,20,20);

  fill(255);
  text("decessi totali",630,783);
fill(255,0,0);
  ellipse(570,780,20,20);



} // draw()

function gotSpreadsheet(colori) {
  println(colori.feed.entry.length); // < debug, numero righe della tabella
  for (var i = 0; i < colori.feed.entry.length; i++) {
    // costruzione dell'oggetto singolo, la riga
    var colore = {
                  // dati, nomi delle colonne, i parametri
                  "colore": colori.feed.entry[i].gsx$colore.$t,
                  "maschi": colori.feed.entry[i].gsx$maschi.$t,
                  "femmine": colori.feed.entry[i].gsx$femmine.$t,
                  "tasso": colori.feed.entry[i].gsx$tasso.$t,
                  "alpha": colori.feed.entry[i].gsx$alpha.$t,
                  "forma": colori.feed.entry[i].gsx$forma.$t
              }
              println(colore); // < debug, verifica oggetto 1x1
    dati.push(colore); // < inserimento nell'array del dato
  }
} // gotSpreadsheet(colori)

// se ridimensiona la finestra ricalcola width e height canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
