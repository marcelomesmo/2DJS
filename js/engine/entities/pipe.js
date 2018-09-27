

function Pipe() {

	// Position and Movement
	var currX, topY, botY;
	var velX;

	var topDistance;
	var MIN_TOP_DIST = -20;
	var MAX_TOP_DIST = 60;
	var gapDistance;
	var MIN_GAP = 60;
	var MAX_GAP = 120;

	// Images
	var pipeTop = new Image();
	pipeTop = loader.getFile("pipeTop");
	var pipeBottom = new Image();
	pipeBottom = loader.getFile("pipeBottom");

	// Life time
	var outScreen;
	var hasScored;	// Tells if score has already been counted for this pipe

	var hitpoints;

	/*
		Init variables
	*/
	this.topDistance = Math.floor((Math.random() * (MAX_TOP_DIST-MIN_TOP_DIST+1)) + MIN_TOP_DIST);
	//this.bottom = Math.floor((Math.random() * (MAX_GAP-MIN_GAP+1)) + MIN_GAP);
	this.gapDistance = Math.floor((Math.random() * (MAX_GAP-MIN_GAP+1)) + MIN_GAP);

	this.currX = graph.getWidth();
	this.topY = -this.topDistance;									// This could be better
	this.botY = this.topY + pipeTop.height + this.gapDistance;		// "

	this.velX = -0.1;

	
	this.outScreen = false;
	this.hasScored = false;

	this.hitpoints = 6;

	this.Update = function(delta)
	{
		this.currX += this.velX * delta;

		if(this.currX < -100) this.outScreen = true;
	}

	this.Draw = function()
	{
		graph.Draw(pipeTop, this.currX, this.topY);
		graph.Draw(pipeBottom, this.currX, this.botY);
		// DEBUG BOX
		// graph.DrawRect(this.currX, this.topY, pipeTop.width, pipeTop.height);
		// graph.DrawRect(this.currX, this.botY, pipeBottom.width, pipeBottom.height);
	}

	this.IsDead = function()
	{
		if(this.hitpoints <= 0) return true;
		return false;
	}
	
	this.IsOutScreen = function()
	{
		return this.outScreen;
	}

	this.Damage = function()
	{
		this.hitpoints--;
	}

	this.Score = function()
	{
		this.hasScored = true;
	}

	this.HasScored = function()
	{
		return this.hasScored;
	}

	this.X = function()
	{
		return this.currX;
	}

	this.getTopY = function()
	{
		return this.topY;
	}
	this.getBottomY = function()
	{
		return this.botY;
	}

	this.getHeight = function()
	{
		return pipeTop.height;
	}

	this.getWidth = function()
	{
		return pipeTop.width;
	}
}