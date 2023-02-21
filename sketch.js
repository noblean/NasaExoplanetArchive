/*
 * Project Created By: Angela Noble
 * Data: https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars
 */

let originX, originY;
let min = 1992;
let max, minSlider, maxSlider;

let total = 0;

let radialVelocity = true,
  transit = true,
  imaging = true,
  other = true;

let radialVelocityColour = "#5e00dc"; // original purple # 8425fd
let transitColour = "#4DABE9"; // original blue # 54AFD0
let imagingColour = "#E7880B"; // original orange # E7880B
let otherColour = "#4FC600"; // original green # 89C900

let textColour = "#F7F7F7";

let b1, b2, b3, b4;

let img;

let lightyears = 3.2615635;

let inputText, button;

// Exoplanet class
class Exoplanet {
  constructor(x, y, radius, distance, disc, plname, year) {
    this.x = x;
    this.y = y;
    this.r = radius;
    if (radius < 6) {
      this.radius = 2.3;
    } else {
      this.radius = radius / 3;
    }
    this.distance = distance;
    this.disc = disc;
    this.plname = plname;
    this.year = year;

    this.over = false;
  }

  // Check if mouse is over exoplanet
  rollover(px, py) {
    let d = dist(px, py, this.x, this.y);
    this.over = d < this.radius;
  }

  // Display
  display() {
    
     if(this.plname == inputText.value()){
         console.log(inputText.value());
       
         if (this.disc === "Radial Velocity") {
           fill(radialVelocityColour);
           ellipse(this.x, this.y, this.radius, this.radius);
           stroke(radialVelocityColour);
         } else if (this.disc === "Transit") {
            fill(transitColour);
           ellipse(this.x, this.y, this.radius, this.radius);
            stroke(transitColour);
         } else if (this.disc === "Imaging") {
            fill(imagingColour);
           ellipse(this.x, this.y, this.radius, this.radius);
           stroke(imagingColour);
         } else  {
            fill(otherColour);
           ellipse(this.x, this.y, this.radius, this.radius);
           stroke(otherColour);
         }
         
         

          strokeWeight(2);
          setLineDash([5, 5]);
          line(this.x, this.y, 0, 0);

          noFill();
          strokeWeight(5);
         setLineDash([0, 0]);
          ellipse(this.x, this.y, this.radius + 20, this.radius + 20);
          
          noStroke()
          search( this.x, this.y, this.plname, this.r, this.distance);
       
          stroke(255);
    }
    else {
       
    if (this.year >= minSlider.value() && this.year <= maxSlider.value()) {
      noStroke();

      if (this.disc === "Radial Velocity" && radialVelocity) {
        fill(radialVelocityColour);
        ellipse(this.x, this.y, this.radius, this.radius);

        if (this.over) {
         

          stroke(255);
          strokeWeight(2);
          setLineDash([5, 5]);
          line(this.x, this.y, 0, 0);

          noFill();
          stroke(radialVelocityColour);
          setLineDash([0, 0]);
          ellipse(this.x, this.y, this.radius + 10, this.radius + 10);
          
          noStroke();
          hover(this.plname, this.r, this.distance);
          
        }
      } else if (this.disc === "Transit" && transit) {
        fill(transitColour);
        ellipse(this.x, this.y, this.radius, this.radius);

        if (this.over) {
      
          stroke(255);
          strokeWeight(2);
          setLineDash([5, 5]);
          line(this.x, this.y, 0, 0);

          noFill();
          stroke(transitColour);
          setLineDash([0, 0]);
          ellipse(this.x, this.y, this.radius + 10, this.radius + 10);
          
          noStroke();
          hover(this.plname, this.r, this.distance);
        }
      } else if (this.disc === "Imaging" && imaging) {
        fill(imagingColour);
        ellipse(this.x, this.y, this.radius, this.radius);

        if (this.over) {

          stroke(255);
          strokeWeight(2);
          setLineDash([5, 5]);
          line(this.x, this.y, 0, 0);

          noFill();
          stroke(imagingColour);
          setLineDash([0, 0]);
          ellipse(this.x, this.y, this.radius + 10, this.radius + 10);
          
          noStroke();
          hover(this.plname, this.r, this.distance);
        }
      } else if (
        other &&
        this.disc != "Transit" &&
        this.disc != "Imaging" &&
        this.disc != "Radial Velocity"
      ) {
        fill(otherColour);
        ellipse(this.x, this.y, this.radius, this.radius);

        if (this.over) {

          stroke(255);
          strokeWeight(2);
          setLineDash([5, 5]);
          line(this.x, this.y, 0, 0);

          noFill();
          stroke(otherColour);
          setLineDash([0, 0]);
          ellipse(this.x, this.y, this.radius + 10, this.radius + 10);
          
          noStroke();
          hover(this.plname, this.r, this.distance);
        }
      } else {
        total--;
      }
    } // end if min / max year slider
      
    } //end else
  } // end display()
} // end Exoplanet class

function hover(plname, r, distance) {
  fill(255);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(28);
  text(plname, mouseX - originX, mouseY - originY - 40);
  textStyle(NORMAL);
  textSize(15);
  
  // If radius cell is empty set to undefined
  if (r == "0" || r == 0) {
    text(
      "Radius: undefined" + " / Distance: " + round(distance * lightyears) + " lightyears from earth",
      mouseX - originX,
      mouseY - originY - 20
    );
  } else {
      if (r == 1){
        text(
      "Diameter: Equal to earth / Distance: " + round(distance * lightyears) + " lightyears from earth",
      mouseX - originX,
      mouseY - originY - 20
    );
      }
    else {
      text(
      "Diameter: " + r + " earths / Distance: " + round(distance * lightyears) + " lightyears from earth",
      mouseX - originX,
      mouseY - originY - 20
    );
    }
  }
} // end hover()


function search( x, y, plname, r, distance) {
  
  //console.log( x + " " + y)
  fill(255);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(28);
  text(plname, x , y - 60);
  textStyle(NORMAL);
  textSize(15);
  
  // If radius cell is empty set to undefined
  if (r == "0" || r == 0) {
    text(
      "Radius: undefined" + " / Distance: " + round(distance * lightyears) + " lightyears from earth",
      x ,
      y - 40
    );
  } else {
      if (r == 1){
        text(
      "Diameter: Equal to earth / Distance: " + round(distance * lightyears) + " lightyears from earth",
      x ,
      y  - 40
    );
      }
    else {
      text(
      "Diameter: " + r + " earths / Distance: " + round(distance * lightyears) + " lightyears from earth",
      x ,
      y  - 40
    );
    }
  }
} // end search()

let table;
let exoplanet = [];

function preload() {
  table = loadTable("PSCompPars_2023.01.22_22.47.46.csv", "csv", "header");
  img = loadImage('earth-icon.png');
}

function loadData() {
  const exoplanetData = table.getRows();
  const length = table.getRowCount();

  //load data from csv
  for (let i = 0; i < length; i++) {
    const r = int(exoplanetData[i].getString("pl_rade"));
    const dist = int(exoplanetData[i].getString("sy_dist"));
    const disc = exoplanetData[i].getString("discoverymethod");
    const plname = exoplanetData[i].getString("pl_name");
    const year = int(exoplanetData[i].getString("disc_year"));

    let a = dist + 9;
    let theta = random(361) * ((2 * PI) / 360);
    let x = a * cos(theta);
    let y = a * sin(theta);

    // Put object in array
    exoplanet.push(new Exoplanet(x, y, r, dist , disc, plname, year));
  }
} // end loadData()

function setup() {
  createCanvas(windowWidth - 4, windowHeight - 4);

  originX = windowWidth / 2;
  originY = windowHeight / 2;

  // Year Slider
  max = year();

  minSlider = createSlider(min, max, 1992, 1);
  minSlider.position(10, windowHeight - 50);
  minSlider.style("width", "250px");

  maxSlider = createSlider(min, max, 2023, 1);
  maxSlider.position(10, windowHeight - 30);
  maxSlider.style("width", "250px");

  // Discovery Method Buttons
  b1 = createButton("Radial Velocity");
  b1.position(10, 35);
  b1.mousePressed(b1Button);
  b1.style('color', textColour);
  b1.style("width", "104px");
  b1.style("background-color", radialVelocityColour);
  b1.style("border", "none");
  b1.style("border-radius", "2.5px");

  b2 = createButton("Transit");
  b2.position(10, 60);
  b2.mousePressed(b2Button);
  b2.style('color', textColour);
  b2.style("width", "104px");
  b2.style("background-color", transitColour);
  b2.style("border", "none");
  b2.style("border-radius", "2.5px");

  b3 = createButton("Imaging");
  b3.position(10, 85);
  b3.mousePressed(b3Button);
  b3.style('color', textColour);
  b3.style("width", "104px");
  b3.style("background-color", imagingColour);
  b3.style("border", "none");
  b3.style("border-radius", "2.5px");

  b4 = createButton("Other");
  b4.position(10, 110);
  b4.mousePressed(b4Button);
  b4.style('color', textColour);
  b4.style("width", "104px");
  b4.style("background-color", otherColour);
  b4.style("border", "none");
  b4.style("border-radius", "2.5px");

  inputText = createInput();
  inputText.position(windowWidth - 205, 0);
  inputText.value("Search...")
                  
  loadData();
}

function b1Button() {
  if (radialVelocity) {
    radialVelocity = false;
    b1.style("background-color", color(132, 37, 253, 90));
  } else {
    radialVelocity = true;
    b1.style("background-color", radialVelocityColour);
  }
}

function b2Button() {
  if (transit) {
    transit = false;
    b2.style("background-color", color(146, 212, 236, 90));
  } else {
    transit = true;
    b2.style("background-color", transitColour);
  }
}

function b3Button() {
  if (imaging) {
    imaging = false;
    b3.style("background-color", color(253, 159, 37, 90));
  } else {
    imaging = true;
    b3.style("background-color", imagingColour);
  }
}

function b4Button() {
  if (other) {
    other = false;
    b4.style("background-color", color(184, 253, 37, 90));
  } else {
    other = true;
    b4.style("background-color", otherColour);
  }
}

function draw() {
  background(0);

  push();

  translate(originX, originY);

  // fill(255);
  // noStroke();
  // ellipse(0, 0, 10, 10);
  
  let imgsize = 15
  img.resize(imgsize, imgsize);
  image(img, - imgsize/2, - imgsize/2);

  stroke(color(238, 238, 238, 85));
  setLineDash([5, 5]);
  noFill();

  let circleSize = 330;

  ellipse(0, 0, circleSize, circleSize);
  ellipse(0, 0, circleSize*2, circleSize*2);
  ellipse(0, 0, circleSize*3, circleSize*3);
  ellipse(0, 0, circleSize*4, circleSize*4); 
 
  

  for (let i = 0; i < exoplanet.length; i++) {
    if (
      exoplanet[i].year >= minSlider.value() &&
      exoplanet[i].year <= maxSlider.value()
    ) {
      total++;
    }
  }

  // Display all exoplanets from dataset
  for (let i = 0; i < exoplanet.length; i++) {
    exoplanet[i].display();
    exoplanet[i].rollover(mouseX - originX, mouseY - originY);
  }

  pop();

  textAlign(LEFT);
  fill(255);
  textSize(15);
  text("Discovery Method", 10, 23);

  //YEARS SELECTED ON SLIDER
  textStyle(BOLD);
  textAlign(LEFT);
  fill(255);
  textSize(16);
  text("Discovery Years", 10, height - 100);
  textSize(30);
  text(minSlider.value() + " - " + maxSlider.value(), 10, height - 65);

  //TOTAL EXOPLANETS DISPLAYED
  textAlign(RIGHT);
  textSize(25);
  text("TOTAL: " + total, width - 20, height - 20);
  total = 0;

  // NAVIGATE 
  if (keyIsDown(UP_ARROW)) {
    originY = originY + 20;
  } else if (keyIsDown(DOWN_ARROW)) {
    originY = originY - 20;
  } else if (keyIsDown(RIGHT_ARROW)) {
    originX = originX - 20;
  } else if (keyIsDown(LEFT_ARROW)) {
    originX = originX + 20;
  } 
} // close draw()

function windowResized() {
  resizeCanvas(windowWidth - 4, windowHeight - 4);
  minSlider.position(10, windowHeight - 50);
  maxSlider.position(10, windowHeight - 30);
  originX = windowWidth / 2;
  originY = windowHeight / 2;
  inputText.position(windowWidth - 205, 10);
 
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

//reset page
function keyPressed() {
  if (key === " ") {
    originX = windowWidth / 2;
    originY = windowHeight / 2;
  }
}
