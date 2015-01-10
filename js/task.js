var HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var ROOT = HOME + '/UnbundleProjects2';
var AOSP = HOME + '/android-sdk/source';
var AMAX = HOME + '/mcrd1-5/AMAX-android_4.3_r2.1-master';
var APPS = '/apps';
var LIBS = '/libs';
var LINKS = '/links';
var AOSP_PROJECT_NAME = 'android_4.3_r2.1';

var DEFAULT_PROPERTIES = 
		'# This file is automatically generated by Android Tools.\n' +
		'# Do not modify this file -- YOUR CHANGES WILL BE ERASED!\n' +
		'#\n' +
		'# This file must be checked in Version Control Systems.\n' +
		'#\n' +
		'# To customize properties used by the Ant build system edit\n' +
		'# "ant.properties", and override values to adapt the script to your\n' +
		'# project structure.\n' +
		'#\n' +
		'# To enable ProGuard to shrink and obfuscate your code, uncomment this (available properties: sdk.dir, user.home):\n' +
		'#proguard.config=${sdk.dir}/tools/proguard/proguard-android.txt:proguard-project.txt\n' +
		'\n' +
		'# Project target.\n';

function extend(Child, Parent) {　　　　
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}


/**
 * Task class prototype
 */
function Task() {
	this.name = 'TASK';
	/////////////////////
	this.ROOT = ROOT;
	this.AOSP = AOSP;
	this.AMAX = AMAX;
	/////////////////////
	this.DIR = '';
	this.PATHSRC = '';
	this.PATHDEST = '';
}
Task.prototype.makeFolder = function() {
	mkdir(this.DIR);
};
Task.prototype.makeSymlink = function() {
	var fs = require('fs');
	if (this.PATHSRC != '' && this.PATHDEST != '') {
		var files = fs.readdirSync(this.PATHSRC);
		for (k in files) {
			var file = files[k];
			console.log('make link: ' + this.PATHSRC + '/' + file
				+ ' -> ' + this.PATHDEST + '/' + file);
			try {
				fs.symlinkSync(this.PATHSRC + '/' + file, this.PATHDEST + '/' + file);
			} catch (err) {
				if (err.toString().contains('EEXIST')) {
				} else {
					throw err;
				}
			}
		}
	}
};
// AndroidManifest
Task.prototype.genAndroidManifest = function() {}
Task.prototype.writeAndroidManifest = function(am) {}
Task.prototype.makeAndroidManifest = function() {
	var am = this.genAndroidManifest();
	this.writeAndroidManifest(am);
};
Task.prototype.genClassPath = function() {}
Task.prototype.writeClassPath = function(cp) {}
Task.prototype.makeClassPath = function() {
	var cp = this.genClassPath();
	this.writeClassPath(cp);
}
Task.prototype.genProject = function() {}
Task.prototype.writeProject = function(prj) {}
Task.prototype.makeProject = function() {
	var prj = this.genProject();
	this.writeProject(prj);
}
Task.prototype.genProjectProperties = function () {};
Task.prototype.writeProjectProperties = function (pp) {
	if (this.DIR_RELATIVE != '/' && this.DIR_RELATIVE != undefined) {
		var fs = require('fs');
		fs.writeFileSync(this.DIR + '/project.properties', pp);
	}
};
Task.prototype.makeProjectProperties = function() {
	var pp = this.genProjectProperties();
	this.writeProjectProperties(pp);
}


/**
 * Root, Apps, Libs, Links
 **/
function TaskRoot() {
	Task.call(this);
	this.name = 'ROOT';
	this.DIR = ROOT;
}
extend(TaskRoot, Task);


function TaskApps() {
	Task.call(this);
	this.name = 'APPS';
	this.DIR = ROOT + APPS;
}
extend(TaskApps, Task);

function TaskLibs() {
	Task.call(this);
	this.name = 'LIBS';
	this.DIR = ROOT + LIBS;
}
extend(TaskLibs, Task);

function TaskLibsEntry() {
	Task.call(this);
}
extend(TaskLibsEntry, Task);
TaskLibsEntry.prototype.genProjectProperties = function () {
	var text = DEFAULT_PROPERTIES +
		'target=android-17\n' +
		'android.library=true\n';
	return text;
}

function TaskLinks() {
	Task.call(this);
	this.name = 'LINKS';
	this.DIR = ROOT + LINKS;
}
extend(TaskLinks, Task);