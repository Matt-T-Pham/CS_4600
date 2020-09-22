let sin = Math.sin;
let cos = Math.cos;



function getDegree(num){
	return (num * (Math.PI / 180))
}
function rotate(rot){
	rot = getDegree(rot)
	// cos -sin 0
	// sin cos  0
	// 0   0    1
	let rotateMatrix = [cos(rot),sin(rot),0,-sin(rot),cos(rot),0,0,0,1]
	return rotateMatrix
}

function ApplyScale(scale){
	let scaleMatrix = [scale,0,0,0,scale,0,0,0,1]
	return scaleMatrix
}
function trans(positionX, positionY) {
	let translateMatrix = [1,0,0,0,1,0,positionX,positionY,1]
	return translateMatrix;
}
function rowTimesColumn(row, col) {
	let ans = ((row[0] * col[0]) + (row[1] * col[1]) + (row[2] * col[2]))
	return ans
}
function multiplyMatrix(mat1,mat2) {
	let answerMatrix = [0,0,0,0,0,0,0,0,0]

	let mat1Row1 = [mat1[0],mat1[3],mat1[6]]
	let mat1Row2 = [mat1[1],mat1[4],mat1[7]]
	let mat1Row3 = [mat1[2],mat1[5],mat1[8]]

	for(let i = 0 ; i < answerMatrix.length; i+=3){
		answerMatrix[i]  = rowTimesColumn(mat1Row1,[mat2[i],mat2[i+1],mat2[i+2]])
		answerMatrix[i+1]= rowTimesColumn(mat1Row2,[mat2[i],mat2[i+1],mat2[i+2]])
		answerMatrix[i+2]= rowTimesColumn(mat1Row3,[mat2[i],mat2[i+1],mat2[i+2]])
	}
	return answerMatrix;
}
// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The transformation first applies scale, then rotation, and finally translation.
// The given rotation value is in degrees.
function GetTransform( positionX, positionY, rotation, scale )
{

	console.log(positionX,positionY)
	let rotationMatrix = rotate(rotation)
	let scaleMatrix = ApplyScale(scale)
	let translateMatrix = trans(positionX,positionY)
	let ans = multiplyMatrix((multiplyMatrix(translateMatrix,rotationMatrix)),scaleMatrix)
	return ans;
}

// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The arguments are transformation matrices in the same format.
// The returned transformation first applies trans1 and then trans2.
function ApplyTransform( trans1, trans2 )
{
	let ans = multiplyMatrix(trans2,trans1);
	return ans;
}
