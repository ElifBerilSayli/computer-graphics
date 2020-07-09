const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
if(!gl){
    throw new Error('Webgl problem!');
}
alert('OKEY')
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
const buffer = gl.createBuffer();
const vertex = [
  0,1,0,
  1,-1,0,
  -1,-1,1,
];
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertex), gl.STATIC_DRAW);

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
attribute vec3 position;
void main() {
    gl_Position = vec4(position, 1);
}
`);
gl.compileShader(vertexShader);
const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, `
void main() {
    gl_FragColor = vec4(1, 1, 0, 1);
}
`);
gl.compileShader(fragShader); 
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragShader);
gl.linkProgram(program);

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.drawArrays(gl.TRIANGLES, 0, 3);
