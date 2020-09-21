let sin = Math.sin;
let cos = Math.cos;



function getDegree(num){
	return (num * Math.PI / 180)
}
function rotate(rot){
	rot = getDegree(rot)
	let rotateMatrix = [cos(rot),sin(rot),0,-sin(rot),cos(rot),0,0,0,1]
	return rotateMatrix
}

function ApplyScale(scale){
	let scaleMatrix = [scale,0,0,0,scale,0,0,0,scale]
	return scaleMatrix
}
function trans(positionX, positionY) {
	let translateMatrix = [0,0,0,0,0,0,positionX,positionY,0]
	return translateMatrix;
}
function multiplyMatrix(mat1,mat2) {
	let answerMatrix = [0,0,0,0,0,0,0,0,0]

	for(let i = 0; i < mat1.length; i+=3){
			answerMatrix[i]= 
			answerMatrix[i+1]=
			answerMatrix[i+2]=
	}
	return answerMatrix;
}
// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The transformation first applies scale, then rotation, and finally translation.
// The given rotation value is in degrees.
function GetTransform( positionX, positionY, rotation, scale )
{

	// 1 0 0  |  cos()   sin()  0   |
	// 0 1 0  |  -sin()  cos()  0   |
	// 0 0 1  |  0        0     0   |
	let rotationMatrix = rotate(rotation)
	let scaleMatrix = ApplyScale(scale)
	let translateMatrix = trans(positionX,positionY)
	//rotate * translate * scale
	let matrixTransform =multiplyMatrix()

	return matrix
}

// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The arguments are transformation matrices in the same format.
// The returned transformation first applies trans1 and then trans2.
function ApplyTransform( trans1, trans2 )
{
	return Array( 1, 0, 0, 0, 1, 0, 0, 0, 1 );
}
