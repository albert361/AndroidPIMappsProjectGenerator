function TaskCalendarCommon() {
	TaskLibsEntry.call(this);
	this.PACKAGE = 'com.android.calendarcommon2';
	this.SOURCE = AMAX;
	this.DIR_RELATIVE = '/calendar-common';
	this.PATH_RELATIVE = '/frameworks/opt/calendar';

	this.name = 'calendar-common';
	this.DIR = ROOT + LIBS + this.DIR_RELATIVE;
	this.PATHSRC = this.SOURCE + this.PATH_RELATIVE;
	this.PATHDEST = ROOT + LINKS + this.DIR_RELATIVE;
}
extend(TaskCalendarCommon, TaskLibsEntry);
TaskCalendarCommon.prototype.makeFolder = function() {
	mkdir(this.DIR);
	mkdir(this.DIR + '/res');
	mkdir(ROOT + LINKS + this.DIR_RELATIVE)
};

// AndroidManifest
TaskCalendarCommon.prototype.genAndroidManifest = function() {
	var am = new AndroidManifest(this.PACKAGE);
	am.addEntry(new AndroidManifest.UsesSDK());

	return am;
}
TaskCalendarCommon.prototype.writeAndroidManifest = function(am) {
	am.writeXML(this.DIR + '/AndroidManifest.xml');
}

// .classpath
TaskCalendarCommon.prototype.genClassPath = function() {
	var classpath = new Classpath();
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'gen'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'src'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.DEPENDENCIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.LIBRARIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.ANDROID_FRAMEWORK'));
	classpath.addEntry(new Classpath.ClasspathEntry('output', 'bin/classes'));

	return classpath;
}
TaskCalendarCommon.prototype.writeClassPath = function(xml) {
	xml.writeXML(this.DIR + '/.classpath');
}

// .project
TaskCalendarCommon.prototype.genProject = function() {
	var project = new Project(this.name);
	project.addLinkedResouce(new Project.Link('src', 'PARENT-2-PROJECT_LOC/links/calendar-common/src'));
	
	return project;
}
TaskCalendarCommon.prototype.writeProject = function(xml) {
	xml.writeXML(this.DIR + '/.project');
}