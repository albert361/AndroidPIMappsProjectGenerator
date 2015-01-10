function TaskSupportV4() {
	TaskLibsEntry.call(this);
	this.SOURCE = AOSP;
	this.DIR_RELATIVE = '/';
	this.PATH_RELATIVE = '/out/target/common/obj/JAVA_LIBRARIES/android-support-v4_intermediates';

	this.name = 'SupportV4';
	this.DIR = ROOT + LIBS + this.DIR_RELATIVE;
}
extend(TaskSupportV4, TaskLibsEntry);
TaskSupportV4.prototype.makeFolder = function() {
	mkdir(this.DIR);
	// Copy jar
	var fs = require('fs');
	fs.createReadStream(this.SOURCE + this.PATH_RELATIVE + '/classes.jar')
	  .pipe(fs.createWriteStream(this.DIR + '/android-support-v4.jar'));
};