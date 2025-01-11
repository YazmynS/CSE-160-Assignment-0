/*
//DrawRectangle.js
function main()
{
   
    
    //Retrive <canvas> element
    var canvas = document.getElementById('example');
    if(!canvas)
    {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    //Get the rendering context for 2D
    var ctx = canvas.getContext('2d');

    //Draw a blue rectangle
    ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; //Set a blue color
    ctx.fillRect(120, 10, 150, 150); //Fill a rectangle with the color
}
*/

//Canvas and Context must be global variables
var canvas = document.getElementById('example');
var ctx = canvas.getContext('2d');

function main(){
    
    if(!canvas){
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    //Make canvas color black
    canvas.style.backgroundColor = 'black';

    if (!ctx) {
        console.log('Failed to get the rendering context for 2D');
        return false;
    }

    //Instantate vector v1
    var v1 = new Vector3([2.25,2.25, 0]);
    var v2 = new Vector3([2.25,2.25, 0]);

    //Draw red vector
    drawVector(ctx, v1,'red'); 
    drawVector(ctx, v2,'blue');

    var vector = new Vector3([3, 4, 0]);
}

function drawVector(ctx, vector, color) {
    // Draw line
    ctx.beginPath();
    ctx.moveTo(200, 200);
    
    // Scale by 20
    ctx.lineTo(
        200 + vector.elements[0] * 20, 
        200 - vector.elements[1] * 20  
    );

    // Set color to red
    ctx.strokeStyle = color; 
   
    // Make line visible
    ctx.stroke(); 
}

function angleBeteen(v1, v2){
    //Hint: Use the definition of dot product dot(v1, v2) = ||v1|| * ||v2|| * cos(alpha).

    //Calculate the dot product
    var dotProduct = Vector3.dot(v1,v2);

    //Calculate the magnitude
    var magnitude1 = v1.magnitude();
    var magnitude2 = v2.magnitude();

    //Calculate cosine
    var cosine = dotProduct / (magnitude1 * magnitude2);

    // Limit cosine range
    var limitedCosine = Math.min(1, Math.max(-1, cosine));

    // Calculate the angle in radians
    var radians = Math.acos(limitedCosine);
    
    // Convert to degrees
    return radians * (180 / Math.PI);
}

function areaTriangle(v1, v2){  
    //get cross product
    var cross = Vector3.cross(v1, v2); 
    
    //get magnitude
    var magnitude = cross.magnitude();

    //get area
    return magnitude / 2;
}

function handleDrawEvent(){
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //get x1 and y1 values 
    var x = parseFloat(document.getElementById('x').value);
    var y = parseFloat(document.getElementById('y').value);
    
    //get x2 and y2 values 
    var x2 = parseFloat(document.getElementById('x2').value);
    var y2 = parseFloat(document.getElementById('y2').value);

    //update vector
    v1 = new Vector3([x, y, 0]);
    v2 = new Vector3([x2, y2, 0]);
    
    //draw vector
    drawVector(ctx, v1, 'red');
    drawVector(ctx, v2, 'blue');

    // Get operation from html
    var operations = document.getElementById('operations').value;

    if (operations === "magnitude"){
        console.log("Magnitude v1:", v1.magnitude());
        console.log("Magnitude v2:", v2.magnitude());
    } else if (operations === "normalize"){
        // Calculate and display normalization in green
        v1.normalize();
        v2.normalize();
        drawVector(ctx, v1, 'green');
        drawVector(ctx, v2, 'green');
    } 
    else if (operations == "angle"){ console.log("Angle:", angleBeteen(v1, v2)); }
    else if (operations == "area"){ console.log("Area: ", areaTriangle(v1, v2)); }
    else if (operations == "add") {
        v3 = v1.add(v2);
        drawVector(ctx, v3, 'green');
    }
    else if (operations == "subtract") {
        v3 = v1.sub(v2);
        drawVector(ctx, v3, 'green');
    }
    else if( operations == "multiply") {
        scalar = parseFloat(document.getElementById('scalar').value);
        v3 = v1.mul(scalar);
        drawVector(ctx, v3, 'green');
    }
    else if (operations == "divide") {
        scalar = parseFloat(document.getElementById('scalar').value);
        v3 = v1.div(scalar);
        drawVector(ctx, v3, 'green');
    }
}

window.onload = function () {
    main();
};
