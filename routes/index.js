 
 
import login from "./login.js"
 

export default function(app){ 
	app.use('/account/api/', login); 
};