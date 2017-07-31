const AWS = require('aws-sdk');
const ec2 = new AWS.EC2();

const params = {  Filters: [{}]};

module.exports= {


	getPrivateIp:  function () {
		ec2.describeInstances(params, (err, data) => {
        		if (err){
                		console.log(err, err.stack);
        		}
        		else return JSON.stringify(data.Reservations[0].Instances[0].PrivateIpAddress);
		})
	}
}
