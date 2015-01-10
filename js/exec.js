function exe(cmd) {
	console.log('Executing: ' + cmd);
	var sys = require('sys')
	var exec = require('child_process').exec;
	function exec_internal(error, stdout, stderr) { 
		sys.puts(stdout);
		if (error !== null) {
			sys.puts(stderr);
			sys.puts(error);
		}
	}
	exec(cmd, exec_internal);
}

function mkdir(dir) {
	console.log('mkdir: ' + dir);
	var fs = require('fs');
	var path = require('path');
	fs.mkdirParent = function(dirPath, mode, callback) {
		//Call the standard fs.mkdir
		try {
			fs.mkdirSync(dirPath, mode, function(error) {
				//When it fail in this way, do the custom steps
				if (error && error.errno === 34) {
					//Create all the parents recursively
					fs.mkdirParent(path.dirname(dirPath), mode, callback);
		  			//And then the directory
		  			fs.mkdirParent(dirPath, mode, callback);
				}
				//Manually run the callback since we used our own callback to do all these
				callback && callback(error);
	  		});
		} catch (err) {
			if (err.toString().contains('EEXIST')) {
			} else {
				throw err;
			}
		}
  	};
	fs.mkdirParent(dir);
}