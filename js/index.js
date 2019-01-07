// 
// This is where the main part of your JS lives
// 
// 
// NF.


// my drawing library I wrote. Another one to look into would P5.js which has more features
// The advantage of mine is it is super lightweight and therefore runs pretty fast 
const Mindrawing = require('mindrawingjs')

// use console.log() to write to the output
console.log('Setup began')

// set up the canvas (where we draw to)
// make a new drawing object
let d = new Mindrawing()
// tell it the canvas object (its in the index.html file) has an id of display
// notice its attached to the d object, because that is our drawing object
d.setup('display')

// a bit of a hack to set the canvas to the size of the screen
let rect = d.c.parentNode.getBoundingClientRect()
d.setCanvasSize(rect.width, rect.height)
// make the background black
d.background('black')

// initialise the mouse position to 0,0 until the mouse has moved
let lastMouse = {
  x: 0,
  y: 0
}

// an empty list where we will store the positions of circles every time we click
let allCircles = []

// every time the mouse moves, this runs, and save the mouse position to lastmouse
//  last mouse is defined above as a new object.
document.onmousemove = (event) => {
  lastMouse.x = event.pageX
  lastMouse.y = event.pageY
}

// create a loop that runs 60 times a second, the value is in milliseconds hence 1000 / 60
setInterval(() => {
  d.background('black')

  // set line color to white
  d.stroke('white')
  // set line thickness to 1
  d.strokeWeight(1)
  // set fill color to purple
  d.fill('purple')

  // loop through each circle
  allCircles.forEach(_circle => {
    // and draw it
    d.ellipse(_circle.x, _circle.y, 20)
  })
  // also draw a circle at the mouse position
  d.ellipse(lastMouse.x, lastMouse.y, 20)
  // draw a line from the last circle to be dropped to the mouse position
  // have to check if any circles have been dropped first by checking the length of the array
  if (allCircles.length > 0) {
    // to find the last circle dropped get the last item in the list
    // this is done by getting the length - 1
    d.line(allCircles[allCircles.length-1].x, allCircles[allCircles.length-1].y, lastMouse.x, lastMouse.y)
  }
}, 1000 / 60)

// add an eventlistener which runs every time the mouse is clicked
d.c.addEventListener('mouseup', (e) => {
  // add a new object to the circles array with the click position as the coordinates
  allCircles.push({x: e.x, y: e.y})
})

