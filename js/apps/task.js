function TaskTask() {
	Task.call(this);
	this.SOURCE = AMAX;
	this.DIR_RELATIVE = '/Task';
	this.PATH_RELATIVE = '/packages/apps/Task';
	
	this.name = 'Task';
	this.DIR = ROOT + APPS + this.DIR_RELATIVE;
	this.PATHSRC = this.SOURCE + this.PATH_RELATIVE;
	this.PATHDEST = ROOT + APPS + this.DIR_RELATIVE;
}
extend(TaskTask, Task);

// .classpath
/**
 * We'll duplicate a copy of .classpath locally, bacause all .classpath modifications
 * are not encouraged to be commited into repository.
 */
TaskTask.prototype.genClassPath = function() {
	var fs = require('fs');
	try {
		fs.unlinkSync(this.DIR + '/.classpath');
	} catch (err) {};

	var classpath = new Classpath();
	classpath.addEntry(new Classpath.ClasspathEntry('src', '/' + AOSP_PROJECT_NAME, '', 'false'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'src'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'gen'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'taskcontract/src'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.DEPENDENCIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.LIBRARIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.ANDROID_FRAMEWORK'));
	classpath.addEntry(new Classpath.ClasspathEntry('output', 'bin/classes'));

	return classpath;
}
TaskTask.prototype.writeClassPath = function(xml) {
	xml.writeXML(this.DIR + '/.classpath');
}

// .project
/**
 * We'll duplicate a copy of .project locally, bacause all .project modifications
 * are not encouraged to be commited into repository.
 */
TaskTask.prototype.genProject = function() {
	var fs = require('fs');
	try {
		fs.unlinkSync(this.DIR + '/.project');
	} catch (err) {};

	var project = new Project(this.name);
	project.addLinkedResouce(new Project.Link('libs/android-support-v4.jar', 'PARENT-2-PROJECT_LOC/libs/android-support-v4.jar', '1'));

	return project;
}
TaskTask.prototype.writeProject = function(xml) {
	xml.writeXML(this.DIR + '/.project');
}

// project.properties
/**
 * We'll duplicate a copy of project.properties locally, bacause all project.properties modifications
 * are not encouraged to be commited into repository.
 */
TaskTask.prototype.genProjectProperties = function () {
	var fs = require('fs');
	try {
		fs.unlinkSync(this.DIR + '/project.properties');
	} catch (err) {};

	var text = DEFAULT_PROPERTIES +
		'target=android-17\n' +
		'android.library.reference.3=../../libs/calendar-common\n' +
		'android.library.reference.2=../../libs/android-common\n';
	return text;
}