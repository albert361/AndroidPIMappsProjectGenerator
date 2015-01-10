function TaskExchangeResource() {
	Task.call(this);
	this.PACKAGE = 'com.google.exchange';
	this.SOURCE = AMAX;
	this.DIR_RELATIVE = '/ExchangeResource';

	this.name = 'ExchangeResource';
	this.DIR = ROOT + APPS + this.DIR_RELATIVE;
}
extend(TaskExchangeResource, Task);

// AndroidManifest
TaskExchangeResource.prototype.genAndroidManifest = function() {
	var am = new AndroidManifest(this.PACKAGE);
	am.addEntry(new AndroidManifest.UsesSDK());

	return am;
}
TaskExchangeResource.prototype.writeAndroidManifest = function(am) {
	am.writeXML(this.DIR + '/AndroidManifest.xml');
}

// .classpath
TaskExchangeResource.prototype.genClassPath = function() {
	var fs = require('fs');

	var classpath = new Classpath();
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'gen'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.DEPENDENCIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.LIBRARIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.ANDROID_FRAMEWORK'));
	classpath.addEntry(new Classpath.ClasspathEntry('output', 'bin/classes'));

	return classpath;
}
TaskExchangeResource.prototype.writeClassPath = function(xml) {
	xml.writeXML(this.DIR + '/.classpath');
}

// .project
/**
 * We'll duplicate a copy of .project locally, bacause all .project modifications
 * are not encouraged to be commited into repository.
 */
TaskExchangeResource.prototype.genProject = function() {
	var fs = require('fs');
	try {
		fs.unlinkSync(this.DIR + '/.project');
	} catch (err) {};

	var project = new Project(this.name);
	project.addLinkedResouce(new Project.Link('res', 'PARENT-1-PROJECT_LOC/Email/exchange2/res'));

	return project;
}
TaskExchangeResource.prototype.writeProject = function(xml) {
	xml.writeXML(this.DIR + '/.project');
}

// project.properties
/**
 * We'll duplicate a copy of project.properties locally, bacause all project.properties modifications
 * are not encouraged to be commited into repository.
 */
TaskExchangeResource.prototype.genProjectProperties = function () {
	var fs = require('fs');
	try {
		fs.unlinkSync(this.DIR + '/project.properties');
	} catch (err) {};

	var text = DEFAULT_PROPERTIES +
		'target=android-17\n' +
		'android.library=true\n';
	return text;
}