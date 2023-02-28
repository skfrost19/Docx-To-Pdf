// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');


var docxConverter = require('docx-pdf');

function convertDocxToPdf(docxPath, pdfPath) {
	docxConverter(docxPath, pdfPath, function (err, result) {
		if (err) {
			console.log(err);
			// use pop-up to show error
			vscode.window.showErrorMessage('Error converting file');
		}
		console.log(result);
		vscode.window.showInformationMessage('File converted successfully');
	});
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('docx-to-pdf.convert', (Uri) => {
		// The code you place here will be executed every time your command is executed
		const fileName = Uri.fsPath;
		const pdfPath = fileName.replace('.docx', '.pdf');
		convertDocxToPdf(fileName, pdfPath);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
