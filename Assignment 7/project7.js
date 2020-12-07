let sin = Math.sin;
let cos = Math.cos;


// This function takes the translation and two rotation angles (in radians) as input arguments.
// The two rotations are applied around x and y axes.
// It returns the combined 4x4 transformation matrix as an array in column-major order.
// You can use the MatrixMult function defined in project5.html to multiply two 4x4 matrices in the same format.
function GetModelViewMatrix( translationX, translationY, translationZ, rotationX, rotationY )
{
	// [TO-DO] Modify the code below to form the transformation matrix.
	var trans = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		translationX, translationY, translationZ, 1
	];
	var Xrotation = [
		1, 0 ,0 ,0,
		0, cos(rotationX), sin(rotationX), 0,
		0, -sin(rotationX), cos(rotationX), 0,
		0, 0, 0, 1
	];
	var Yrotation = [
		cos(rotationY), 0, -sin(rotationY), 0,
		0, 1, 0, 0,
		sin(rotationY), 0, cos(rotationY), 0,
		0, 0, 0, 1
	];

	var mv = MatrixMult(trans,MatrixMult(Xrotation, Yrotation));
	return mv;
}


// [TO-DO] Complete the implementation of the following class.

class MeshDrawer
{
	// The constructor is a good place for taking care of the necessary initializations.
	constructor()
	{
		// [TO-DO] initializations
		// Compile the shader program
		//
		this.prog = InitShaderProgram( modelVS, modelFS );
		// Get the ids of the uniform variables in the shaders
		this.mvp = gl.getUniformLocation( this.prog, 'mvp' );

		// Get the ids of the vertex attributes in the shaders
		this.vertPos = gl.getAttribLocation( this.prog, 'pos' );

		this.txc = gl.getAttribLocation(this.prog,'txc');

		this.sampler = gl.getUniformLocation(this.prog,'tex');

		this.swap = gl.getUniformLocation(this.prog,'swap');

		this.toShow = gl.getUniformLocation(this.prog,'toShow');


		this.x = gl.getUniformLocation(this.prog,'x');
		this.y = gl.getUniformLocation(this.prog,'y');
		this.z = gl.getUniformLocation(this.prog,'z');

		this.vertbuffer = gl.createBuffer();
		this.textureBuffer = gl.createBuffer();
		this.normalBuffer = gl.createBuffer();
	}
	
	// This method is called every time the user opens an OBJ file.
	// The arguments of this function is an array of 3D vertex positions,
	// an array of 2D texture coordinates, and an array of vertex normals.
	// Every item in these arrays is a floating point value, representing one
	// coordinate of the vertex position or texture coordinate.
	// Every three consecutive elements in the vertPos array forms one vertex
	// position and every three consecutive vertex positions form a triangle.
	// Similarly, every two consecutive elements in the texCoords array
	// form the texture coordinate of a vertex and every three consecutive 
	// elements in the normals array form a vertex normal.
	// Note that this method can be called multiple times.
	setMesh( vertPos, texCoords, normals )
	{
		// [TO-DO] Update the contents of the vertex buffer objects.
		this.numTriangles = vertPos.length / 3;
		// [TO-DO] Update the contents of the vertex buffer objects.
		this.numTriangles = vertPos.length / 3;

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertbuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertPos), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
	}
	
	// This method is called when the user changes the state of the
	// "Swap Y-Z Axes" checkbox. 
	// The argument is a boolean that indicates if the checkbox is checked.
	swapYZ( swap )
	{
		// [TO-DO] Set the uniform parameter(s) of the vertex shader
		gl.useProgram(this.prog);
		if(swap){
			gl.uniform1i(this.swap,1);
		}else{
			gl.uniform1i(this.swap,0);
		}
	}
	
	// This method is called to draw the triangular mesh.
	// The arguments are the model-view-projection transformation matrixMVP,
	// the model-view transformation matrixMV, the same matrix returned
	// by the GetModelViewProjection function above, and the normal
	// transformation matrix, which is the inverse-transpose of matrixMV.
	draw( matrixMVP, matrixMV, matrixNormal )
	{

		gl.useProgram( this.prog );
		gl.uniformMatrix4fv( this.mvp, false, matrixMVP );
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vertbuffer );
		gl.vertexAttribPointer( this.vertPos, 3, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( this.vertPos );


		gl.bindBuffer( gl.ARRAY_BUFFER, this.textureBuffer );
		gl.vertexAttribPointer( this.txc, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( this.txc );
		gl.drawArrays( gl.TRIANGLES, 0, this.numTriangles );
	}
	
	// This method is called to set the texture of the mesh.
	// The argument is an HTML IMG element containing the texture data.
	setTexture( img )
	{
		const mytex = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D,mytex);
		// You can set the texture image data using the following command.
		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img );

		gl.generateMipmap(gl.TEXTURE_2D);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);

		// [TO-DO] Now that we have a texture, it might be a good idea to set
		// some uniform parameter(s) of the fragment shader, so that it uses the texture.
		gl.useProgram(this.prog)
		gl.uniform1i(this.sampler,0)

		this.loaded = true;
		gl.useProgram(this.prog);
		gl.uniform1i(this.toShow,1);
	}
	
	// This method is called when the user changes the state of the
	// "Show Texture" checkbox. 
	// The argument is a boolean that indicates if the checkbox is checked.
	showTexture( show )
	{
		// [TO-DO] set the uniform parameter(s) of the fragment shader to specify if it should use the texture.
		gl.useProgram(this.prog);
		if(show){
			if(this.loaded === true){
				gl.uniform1i(this.toShow,1);
			}else{
				gl.uniform1i(this.toShow,0);
			}
		}else{
			gl.uniform1i(this.toShow,0);
		}
	}
	
	// This method is called to set the incoming light direction
	setLightDir( x, y, z )
	{
		// [TO-DO] set the uniform parameter(s) of the fragment shader to specify the light direction.
		gl.useProgram(this.prog);
		gl.uniform1f(this.x,x);
		gl.uniform1f(this.y,y);
		gl.uniform1f(this.z,z);
	}
	
	// This method is called to set the shininess of the material
	setShininess( shininess )
	{
		// [TO-DO] set the uniform parameter(s) of the fragment shader to specify the shininess.
	}
}


// This function is called for every step of the simulation.
// Its job is to advance the simulation for the given time step duration dt.
// It updates the given po-sitions and velocities.
function SimTimeStep( dt, positions, velocities, springs, stiffness, damping, particleMass, gravity, restitution )
{
	var forces = Array( positions.length ); // The total for per particle

	// [TO-DO] Compute the total force of each particle
	for (let i = 0; i < forces.length; i++){
		forces[i] = new Vec3(0,0,0);
		//gravity
		forces[i] = forces[i].add(gravity.mul(particleMass));


	}

	for(let i = 0; i < springs.length; i++) {

		let restLength = springs[i].rest;

		let tempx =positions[springs[i].p1].x - positions[springs[i].p0].x;
		let x =Math.pow(tempx, 2);
		let tempy = positions[springs[i].p1].y - positions[springs[i].p0].y;
		let y = Math.pow(tempy, 2)
		let tempz = positions[springs[i].p1].z - positions[springs[i].p0].z;
		let z =Math.pow(tempz , 2)
		let xyz = x+y+z;

		let springLength = Math.sqrt(xyz);

		let DirectionVector = positions[springs[i].p1].sub(positions[springs[i].p0]);

		let Fs = DirectionVector.mul(stiffness * (springLength - restLength));

		let timeLength = (velocities[springs[i].p1].sub(velocities[springs[i].p0])).dot(DirectionVector);

		let Fd = DirectionVector.mul(damping * timeLength);

		let totalF = Fs.add(Fd);

		forces[springs[i].p0] = forces[springs[i].p0].add(totalF);
		forces[springs[i].p1] = forces[springs[i].p1].sub(totalF);


	}

	// [TO-DO] Update positions and velocities

	for (let j = 0; j < positions.length; j++) {

		var acc = forces[j].div(particleMass);

		positions[j] = positions[j].add(velocities[j].mul(dt));

		velocities[j] = velocities[j].add(acc.mul(dt));

	}
	console.log(velocities);
	// [TO-DO] Handle collisions
	for (let j = 0; j < positions.length; j++) {

		if (positions[j].x < -1.0 ) {
			let temp = positions[j].x + 2.0;
			positions[j].x = temp * restitution - restitution - 1;
			velocities[j] =  velocities[j].mul(-restitution);
		}
		if (positions[j].y < -1.0 ) {
			let temp = positions[j].y + 2.0;
			positions[j].y = temp * restitution - restitution - 1;
			velocities[j] =  velocities[j].mul(-restitution);
		}
		if (positions[j].z < -1.0 ) {
			let temp = positions[j].z + 2.0;
			positions[j].z = temp * restitution - restitution - 1;
			velocities[j] =  velocities[j].mul(-restitution);
		}
		if (positions[j].x > 1.0 ) {
			let temp = positions[j].x - 2.0;
			positions[j].x = temp * restitution - restitution + 1;
			velocities[j] =  velocities[j].mul(-restitution);
		}
		if (positions[j].y > 1.0 ) {
			let temp = positions[j].y - 2.0;
			positions[j].y = temp * restitution - restitution + 1;
			velocities[j] =  velocities[j].mul(-restitution);
		}
		if (positions[j].z > 1.0 ) {
			let temp = positions[j].z - 2.0;
			positions[j].z = temp * restitution - restitution + 1;
			velocities[j] =  velocities[j].mul(-restitution);
		}
	}
}



// Vertex shader source code
var modelVS = `
	attribute vec3 pos;
	uniform mat4 mvp;
	varying vec2 texCoord;
	attribute vec2 txc;
	uniform int swap;
	
	void main()
	{
		vec3 someVec;
		if(swap == 1){
			someVec.xyz = vec3(pos.x,pos.z,pos.y);
		}else{
			someVec.xyz = vec3(pos.x,pos.y,pos.z);
		}
		texCoord = txc;
		gl_Position = mvp * vec4(someVec,1);
	}
`;

// Fragment shader source code
var modelFS = `
	precision mediump float;
	uniform sampler2D tex;
	varying vec2 texCoord;
	uniform bool toShow;
	
	uniform float x;
	uniform float y;
	uniform float z;
	
	void main()
	{
		vec3 lightPos = vec3(x,y,z);
		if(toShow){
			gl_FragColor = texture2D(tex,texCoord);		
		} else{
			gl_FragColor = vec4(1,1,1,1);
		}
	}
`;