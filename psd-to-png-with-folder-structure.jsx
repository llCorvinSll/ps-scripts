main();
function main(){

	var inputFolder = Folder.selectDialog("Select a folder to process");
	var targetFolder = Folder.selectDialog("Select a target folder");

	processFolder(inputFolder,  targetFolder, inputFolder);
}

function processFolder(folder, destFolder, rootFolder) {
	var content = folder.getFiles(),
	item = null;

	for (var i = 0; i < content.length; i++) { 
		item = content[i];

		if (item instanceof Folder){
			processFolder(item, destFolder, rootFolder);
		} else {
			processFile(item, destFolder, rootFolder);
		}
	}
}

function processFile(file, destFolder, rootFolder){

	var Name = file.name.replace(/\.[^\.]+$/, '');
	var Ext = decodeURI(file.name).replace(/^.*\./,'');
	var Path = file.path;
	
	if(Ext.toLowerCase() != "psd") return;

	var docRef = open(file);

	var saveFolder =  destFolder + "/" + Path.replace(rootFolder,  "");
	var saveName =  saveFolder + "/" + Name + ".png";

	var folder1 = Folder(saveFolder);
	//Check if it exist, if not create it.
	if(!folder1.exists) folder1.create();

	var saveFile = File(saveName);
	if(saveFile.exists) saveFile.remove();
	SavePNG(saveFile);

	docRef.close(SaveOptions.DONOTSAVECHANGES); 
}

function SavePNG(saveFile){
	pngSaveOptions = new PNGSaveOptions();
	activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE);
}

