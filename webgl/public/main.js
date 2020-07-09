const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
if(!gl){
    throw new Error('Webgl problem!');
}
/* Road Map
CPU
-create buffer
-load vertexData into buffer
GPU
- create vertex shader
- create fragment shader
- create program
- attach shaders to program
draw
*/

const matrix = mat4.create();
console.log(matrix);
const buffer = gl.createBuffer();
const vertex = [
  0,1,0,
  1,-1,0,
  -1,-1,1,
];
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertex), gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
const color = [
    1,0,0,
    1,1,0,
    0,0,1,
];
gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(color), gl.STATIC_DRAW);
const vertexShader = gl.createShader(gl.VERTEX_SHADER);

gl.shaderSource(vertexShader, `
precision mediump float;
attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;
void main() {
    vColor = color;
    gl_Position = vec4(position, 1);
}
`);
gl.compileShader(vertexShader);
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, `
precision mediump float;
varying vec3 vColor;
void main() {
    gl_FragColor = vec4(vColor, 1);
}
`);
gl.compileShader(fragShader); 
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragShader);
gl.linkProgram(program);

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);
