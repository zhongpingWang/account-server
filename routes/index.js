 
 
import login from "./login.js"
 

export default function(app,params){ 
	app.use('/account/api/', login(params.redisClient)); 
};