// Utilities of the game
// functions that are used to calculate and do other works etc.

var util = 
{
	load_image: function(a_href) 
	{// loads the images from the array of links that the user inputs 
		var ret = new Array();
		for(var i = 0; i < a_href.length; i++)
		{
			var temp = a_href[i].split('/');
			temp = temp[temp.length - 1].split('.')[0];
			ret.push(temp);
			game.load.image(temp, a_href[i]);
		}
		return ret;
	}// End load_image 
};



