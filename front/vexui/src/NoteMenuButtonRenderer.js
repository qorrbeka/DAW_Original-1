/**
 * Class composed by functions for drawing all menu buttons. 
 */

//TODO make the positioning and size of the buttons configurable by parameters.
Vex.UI.NoteMenuButtonRenderer = function (panel, context){
	this.ready = false;
	var renderer = this;
	//Load Resources
	this.menuButtonsImg = new Image();
	this.menuButtonsImg.src = 'resources/noteMenuButtons.gif';	
	this.menuButtonsImg.onload = function(){renderer.ready=true};
};

Vex.UI.NoteMenuButtonRenderer.prototype.closeButton = function (){
	var panelProps = this.panel;
	var context = this.context;
	
	
	var offset = 5; //offset between panel boundaries and button boundaries
	var drawingOffset = 4; //offset between button boundaries and the X for the close
	var buttonWidth = 15;
	var buttonX = panelProps.rightX - buttonWidth - offset; 
	var buttonY = panelProps.y + offset; 
	
	//Button Panel
	 context.beginPath();
	 context.rect(buttonX, buttonY, buttonWidth, buttonWidth);
	 context.fillStyle = 'red';
	 context.fill();
	 
	 //Button Content (the X)
	 context.beginPath();
	 context.lineWidth = 3;
	 //Part 1: the \
	 context.moveTo(buttonX + drawingOffset, buttonY + drawingOffset);
	 context.lineTo(buttonX + buttonWidth - drawingOffset, buttonY + buttonWidth - drawingOffset);
	 //Part 2: the /
	 context.moveTo(buttonX + drawingOffset, buttonY + buttonWidth - drawingOffset);
	 context.lineTo(buttonX + buttonWidth - drawingOffset, buttonY + drawingOffset);
	 context.strokeStyle = 'white';
	 context.stroke();
	 
	 return new Vex.UI.Button({
		 backgroundColor: 'red',
		 width: buttonWidth,
		 height: buttonWidth,
		 x: buttonX,
		 y: buttonY,
		 rightX: buttonX + buttonWidth,
		 bottomY: buttonY + buttonWidth,
		 name: 'closeButton',
		 action: 'close',
		 // tip: '메뉴 닫기'
     tip: '',
	 });
};

Vex.UI.NoteMenuButtonRenderer.prototype.accidentalButton = function (index) {
	var panelProps = this.panel;
	var context = this.context;
	var imageObj = this.menuButtonsImg;
	
	//Position of each accidental:
	var positions = [400,100,200,0,300];
	//Actions of each Accidental
	var actions = ['addDoubleFlat', 'addFlat', 'addNatural', 'addSharp', 'addDoubleSharp'];
	var tips = ['키에 더블 플랫 추가', '키에 플랫 추가', '키에 제자리표 추가', '키에 샵 추가', '키에 더블 샵 추가'];

	var initialOffsetX = 10; //offset between 1st button and paenl
	var offSetX = 5; // offset between buttons
	var offSetY = 10;

	//Source Specs
	var sourceX = positions[index];
	var sourceY = 0;
	var sourceWidth = 100;
	var sourceHeight = 100;

	//Destination Specs
	var destWidth = 25;
	var destHeight = destWidth;

	var destX = panelProps.x + initialOffsetX + index * (offSetX + destWidth);

	var destY = panelProps.y + offSetY;

	context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

	return new Vex.UI.Button({
		backgroundColor: 'white',
		x: destX,
		y: destY,
		rightX: destX + destWidth,
		bottomY: destY + destHeight,
		width: destWidth,
		height: destHeight,
		action: actions[index],
		// tip: tips[index]
		tip: '',
	});
};

Vex.UI.NoteMenuButtonRenderer.prototype.dotButton = function(){
	var panelProps = this.panel;
	var context = this.context;
	var imageObj = this.menuButtonsImg;
	
	//Position of each dot button in the sprite:
	var position = 700;

	var initialOffsetX = 10; //offset between 1st button and paenl
	//var offSetX = 5; // offset between buttons
	var offSetY = 10;

	//Source Specs
	var sourceX = position;
	var sourceY = 0;
	var sourceWidth = 100;
	var sourceHeight = 100;

	//Destination Specs
	var destWidth = 25;
	var destHeight = destWidth;

	var destX = panelProps.x + initialOffsetX;

	// 2 * offSetY + destHeight=> because its the 2nd row of buttons
	var destY = panelProps.y + (2 * offSetY) + destHeight;

	context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

	return new Vex.UI.Button({
		backgroundColor: 'white',
		x: destX,
		y: destY,
		rightX: destX + destWidth,
		bottomY: destY + destHeight,
		width: destWidth,
		height: destHeight,
		action: 'addDot',
		// tip: '키에 점을 추가'
		tip: '',
	});
};

Vex.UI.NoteMenuButtonRenderer.prototype.beamButton = function (){
	var panelProps = this.panel;
	var context = this.context;
	var imageObj = this.menuButtonsImg;
	
	//Position of each dot button in the sprite:
	var position = 500;

	var initialOffsetX = 10; //offset between 1st button and paenl
	var offSetX = 5; // offset between buttons
	var offSetY = 10;

	//Source Specs
	var sourceX = position;
	var sourceY = 0;
	var sourceWidth = 100;
	var sourceHeight = 100;

	//Destination Specs
	var destWidth = 25;
	var destHeight = destWidth;
	
	//1 * (offSetX + destWidth) because its the 2nd button in the row.
	var destX = panelProps.x + initialOffsetX + (offSetX + destWidth);

	// 2 * offSetY + destHeight=> because its the 2nd row of buttons
	var destY = panelProps.y + (2 * offSetY) + destHeight;

	context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

	return new Vex.UI.Button({
		backgroundColor: 'white',
		x: destX,
		y: destY,
		rightX: destX + destWidth,
		bottomY: destY + destHeight,
		width: destWidth,
		height: destHeight,
		action: 'addBeam',
		// tip: '다음 노드와 머리 잇기'
		tip: '',
	});
};

// Vex.UI.NoteMenuButtonRenderer.prototype.tieButton = function(){
// 	var panelProps = this.panel;
// 	var context = this.context;
// 	var imageObj = this.menuButtonsImg;
//
// 	//Position of each dot button in the sprite:
// 	var position = 600;
//
// 	var initialOffsetX = 10; //offset between 1st button and paenl
// 	var offSetX = 5; // offset between buttons
// 	var offSetY = 10;
//
// 	//Source Specs
// 	var sourceX = position;
// 	var sourceY = 0;
// 	var sourceWidth = 100;
// 	var sourceHeight = 100;
//
// 	//Destination Specs
// 	var destWidth = 25;
// 	var destHeight = destWidth;
//
// 	//1 * (offSetX + destWidth) because its the 3nd button in the row.
// 	var destX = panelProps.x + initialOffsetX + 2*(offSetX + destWidth);
//
// 	// 2 * offSetY + destHeight=> because its the 2nd row of buttons
// 	var destY = panelProps.y + (2 * offSetY) + destHeight;
//
// 	context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
//
// 	return new Vex.UI.Button({
// 		backgroundColor: 'white',
// 		x: destX,
// 		y: destY,
// 		rightX: destX + destWidth,
// 		bottomY: destY + destHeight,
// 		width: destWidth,
// 		height: destHeight,
// 		action: 'addTie',
// 		tip: '다음 노드와 묶기'
// 	});
// };

Vex.UI.NoteMenuButtonRenderer.prototype.deleteButton = function(){
	var panelProps = this.panel;
	var context = this.context;
	var imageObj = this.menuButtonsImg;
	
	//Position of each dot button in the sprite:
	var position = 800;

	var initialOffsetX = 10; //offset between 1st button and paenl
	var offSetX = 5; // offset between buttons
	var offSetY = 10;

	//Source Specs
	var sourceX = position;
	var sourceY = 0;
	var sourceWidth = 100;
	var sourceHeight = 100;

	//Destination Specs
	var destWidth = 25;
	var destHeight = destWidth;
	
	//1 * (offSetX + destWidth) because its the 4nd button in the row.
	var destX = panelProps.x + initialOffsetX + 3*(offSetX + destWidth);

	// 2 * offSetY + destHeight=> because its the 2nd row of buttons
	var destY = panelProps.y + (2 * offSetY) + destHeight;

	context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

	return new Vex.UI.Button({
		backgroundColor: 'white',
		x: destX,
		y: destY,
		rightX: destX + destWidth,
		bottomY: destY + destHeight,
		width: destWidth,
		height: destHeight,
		action: 'deleteNote',
		// tip: '노트 삭제'
		tip: '',
	});
};
