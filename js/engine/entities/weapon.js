

function Weapon() {

	var image = loader.getFile("weapon");

	var totalCharges = 10;
	var weaponCharges = 10;

	var barWidth = 60;
	var barHeight = 10;

	var reloadTime = 0;

	var RELOAD_CD = 700; //ms

	var bullets = [];

	this.Update = function(delta)
	{
		reloadTime += delta;

		if(reloadTime > RELOAD_CD) 
		{
			weaponCharges = 10;
			reloadTime = 0;
		}

		for(let b of bullets)
        {
        	b.Update(delta);

        	if(b.HasHit()) 
            {
                var removeBullet = bullets.indexOf(b);
                //console.log("Should remove pipe "+ removePipe + " at " + p.X());
                bullets.splice(removeBullet, 1);
            }
        }
	}

	this.Draw = function(x, y)
	{
		graph.Draw(image, x, y);

		graph.DrawRect(x + image.width + 10, y + 4, barWidth * weaponCharges/totalCharges, barHeight);

		for(let b of bullets)
        {
        	b.Draw();
        }
	}

	this.Shoot = function(x, y)
	{
		if(weaponCharges > 0) 
		{
			weaponCharges--;

			reloadTime = 0;

			var b = new Bullet(x, y);
			bullets.push(b);

			// SFX
		   	sfxHit.stop();
		   	sfxHit.play();
		}
		else
		{
			// SFX
		   	//sfxNoBullets.stop();
		   	//sfxNoBullets.play();
		}
	}


	this.Reload = function()
	{
		weaponCharges = totalCharges;
	}

	this.getBullets = function()
	{
		return bullets;
	}

}