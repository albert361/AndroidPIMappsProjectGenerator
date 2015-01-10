function TaskAndroidCommonChips() {
	TaskLibsEntry.call(this);
	this.PACKAGE = 'com.android.ex.chips';
	this.SOURCE = AMAX;
	this.DIR_RELATIVE = '/android-common-chips';
	this.PATH_RELATIVE = '/frameworks/ex/chips';

	this.name = 'android-common-chips';
	this.DIR = ROOT + LIBS + this.DIR_RELATIVE;
	this.PATHSRC = this.SOURCE + this.PATH_RELATIVE;
	this.PATHDEST = ROOT + LINKS + this.DIR_RELATIVE;
}
extend(TaskAndroidCommonChips, TaskLibsEntry);
TaskAndroidCommonChips.prototype.makeFolder = function() {
	mkdir(this.DIR);
	mkdir(ROOT + LINKS + this.DIR_RELATIVE)
};

// AndroidManifest
TaskAndroidCommonChips.prototype.genAndroidManifest = function() {
	var am = new AndroidManifest(this.PACKAGE);
	am.addEntry(new AndroidManifest.UsesSDK());

	return am;
}
TaskAndroidCommonChips.prototype.writeAndroidManifest = function(am) {
	am.writeXML(this.DIR + '/AndroidManifest.xml');
}

// .classpath
TaskAndroidCommonChips.prototype.genClassPath = function() {
	var classpath = new Classpath();
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'gen'));
	classpath.addEntry(new Classpath.ClasspathEntry('src', 'src'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.DEPENDENCIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.LIBRARIES', 'true'));
	classpath.addEntry(new Classpath.ClasspathEntry('con', 'com.android.ide.eclipse.adt.ANDROID_FRAMEWORK'));
	classpath.addEntry(new Classpath.ClasspathEntry('output', 'bin/classes'));

	return classpath;
}
TaskAndroidCommonChips.prototype.writeClassPath = function(xml) {
	xml.writeXML(this.DIR + '/.classpath');
}

// .project
TaskAndroidCommonChips.prototype.genProject = function() {
	var project = new Project(this.name);
	project.addLinkedResouce(new Project.Link('src', 'PARENT-2-PROJECT_LOC/links/android-common-chips/src'));
	project.addLinkedResouce(new Project.Link('res', 'PARENT-2-PROJECT_LOC/links/android-common-chips/res'));

	return project;
}
TaskAndroidCommonChips.prototype.writeProject = function(xml) {
	xml.writeXML(this.DIR + '/.project');
}