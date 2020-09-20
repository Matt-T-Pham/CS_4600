// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The transformation first applies scale, then rotation, and finally translation.
// The given rotation value is in degrees.
function GetTransform( positionX, positionY, rotation, scale )
{

	// 1 0 0  |  cos()   sin()  0   |
	// 0 1 0  |  -sin()  cos()  0   |
	// 0 0 1  |  0        0     0   |



	matrixScale = array(1, 0, 0, 0, 1, 0, 0, 0, 1)
	matrixRotation = array(1, 0, 0, 0, 1, 0, 0, 0, 1)
	matrixTransform = array(1, 0, 0, 0, 1, 0, 0, 0, 1)

	console.log(positionX,positionY,rotation,scale)
	// scale then rotation then transloation
	//   0           1                2
	for (let j = 0; j < 3; j++){
		for (let i = 0; i < matrix.length; i++) {
			//do math for scale
			if (j ==0){
				if( i == 0 || i == 4 || i == 8)
					matrixScale[i] = matrixScale[i] * scale
			}
			// do math for rotation
			else if (j == 1){
			

			} //do math for rotation
			else if(j == 2){

			}

		}
	}


	return matrix
}

// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The arguments are transformation matrices in the same format.
// The returned transformation first applies trans1 and then trans2.
function ApplyTransform( trans1, trans2 )
{
	return Array( 1, 0, 0, 0, 1, 0, 0, 0, 1 );
}
