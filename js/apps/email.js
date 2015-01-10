function TaskEmail() {
	Task.call(this);
	this.SOURCE = AMAX;
	this.DIR_RELATIVE = '/Email';
	this.PATH_RELATIVE = '/packages/apps/Email';

	this.name = 'Email';
	this.DIR = ROOT + APPS + this.DIR_RELATIVE;
	this.PATHSRC = this.SOURCE + this.PATH_RELATIVE;
	this.PATHDEST = ROOT + APPS + this.DIR_RELATIVE;
}
extend(TaskEmail, Task);

// .classpath
/**
 * We'll duplicate a copy of .classpath locally, bacause all .classpath modifications
 * are not encouraged to be commited into repository.
 */
TaskEmail.prototype.genClassPath = function() {
	var fs = require('fs');
	fs.unlinkSync(this.DIR + '/.classpath');

	var classpath = new Classpath();
	classpath.addEntry(new Classpath.ClasspathEntry('src', '/' + AOSP_PROJECT_NAME, '', 'false'));
	classpath.addEntry(new Classpath.ClasspathEntry('lib', 'libs/googleAnalytics/libGoogleAnalyticsV2.jar'));
	classpath.addEntry(new Classpath.ClasspathEntry('lib', 'emailcommon/libs/juniversalchardet.jar'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'src', '', '', 'images/|android/util/'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'gen'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'emailcommon/src'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'exchange2/src', '', '', 'com/android/exchange/reporter_amax/'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.DEPENDENCIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.LIBRARIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.ANDROID_FRAMEWORK'));
	classpath.addEntry(new Classpath.ClasspathEntry('output', 'bin/classes'));

	return classpath;
}
TaskEmail.prototype.writeClassPath = function(xml) {
	xml.writeXML(this.DIR + '/.classpath');
}

// .project
/**
 * We'll duplicate a copy of .project locally, bacause all .project modifications
 * are not encouraged to be commited into repository.
 */
TaskEmail.prototype.genProject = function() {
	var fs = require('fs');
	try {
		fs.unlinkSync(this.DIR + '/.project');
	} catch (err) {};

	var project = new Project(this.name);

	return project;
}
TaskEmail.prototype.writeProject = function(xml) {
	xml.writeXML(this.DIR + '/.project');
}

// project.properties
/**
 * We'll duplicate a copy of project.properties locally, bacause all project.properties modifications
 * are not encouraged to be commited into repository.
 */
TaskEmail.prototype.genProjectProperties = function () {
	var fs = require('fs');
	try {
		fs.unlinkSync(this.DIR + '/project.properties');
	} catch (err) {};

	var text = DEFAULT_PROPERTIES +
		'target=android-17\n' +
		'android.library.reference.1=../../libs/android-common\n' +
		'android.library.reference.2=../../libs/android-common-chips\n' +
		'android.library.reference.3=../ExchangeResource\n' +
		'android.library.reference.4=../../libs/com.google.contract\n' +
		'android.library.reference.6=../../libs/calendar-common\n' +
		'android.library.reference.5=../../libs/com.google.calendarcontract\n' +
		'android.library.reference.7=../../libs/guava\n';
	return text;
}