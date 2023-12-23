import { exec, spawn } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import simpleGit from 'simple-git'
import * as vscode from 'vscode';

let exePath = "";
let isWindow = false;

export function activate(context: vscode.ExtensionContext) {
	isWindow = process.platform === 'win32';
	validateVCCProjectGenerator();
	

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.create-cpp-dll', () => {
		vscode.window.showInformationMessage('Create CPP DLL Template!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.create-cpp-exe', () => {
		vscode.window.showInformationMessage('Create CPP EXE Template!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.create-cpp-complex', () => {
		vscode.window.showInformationMessage('Create CPP Complex Template!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.create-vcc-cpp-dll', () => {
		vscode.window.showInformationMessage('Create VCC DLL CPP Module!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.create-vcc-cpp-exe', () => {
		vscode.window.showInformationMessage('Create VCC EXE CPP Module!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.create-vcc-cpp-complex', () => {
		vscode.window.showInformationMessage('Create VCC Complex CPP Module!');
	}));

	// option
	vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.openOptionsPage', () => {
		vscode.commands.executeCommand('workbench.action.openSettings', 'vccprojectgeneratorvscodeextension');
	});
}

export function deactivate() {}


function validateVCCProjectGenerator() {
	validateVCCProjectGeneratorFoder();

}

async function validateVCCProjectGeneratorFoder() {
	let currentDirectory = __dirname;
	try {
		console.log('Check whether VCCProjectGenerator binary exists - begin');
		let documentPath = path.join(os.homedir(), 'Documents');
		console.log('cd ' + documentPath);
		process.chdir(documentPath);

		// check if vcc folder exists, if not then create directory
		// check if vcc/VCCProjectGeneratorDLL exists, if not then git
		let vccFolder = 'vcc';
		if (!fs.existsSync(vccFolder)) {
			console.log('Created Directory ' + vccFolder + ' begin');
			fs.mkdirSync(vccFolder);
			console.log('Created Directory ' + vccFolder + ' end');
		}
		console.log('cd ' + vccFolder);
		process.chdir(vccFolder);

		let vpgFolder = 'VCCProjectGenerator';
		if (!fs.existsSync(vpgFolder)) {
			console.log('git begin');
			await executeCommand('git', ['clone', 'https://github.com/s1155003185/' + vpgFolder, vpgFolder]);
			console.log('git end');
		}
		console.log('cd ' + vpgFolder);
		process.chdir(vpgFolder);

		let exePath = isWindow ? 'bin/Release/vpg.exe' : 'bin/Release/vpg';
		if (!fs.existsSync(exePath)) {
			console.log('make begin');
			await executeCommand('make', ['release']);
			console.log('make end');
		}
		exePath = path.join(process.cwd(), exePath);
		console.log('exe path: ' + exePath);
		if (!fs.existsSync(exePath)) {
			throw new Error(exePath + ' does not exist.');
		}
		console.log('Check whether VCCProjectGenerator binary exists - done');
	} catch (error) {
		throw error;
	} finally {
		process.chdir(currentDirectory);
	}
}

function executeCommand(command: string, args: string[]): Promise<void> {
	return new Promise((resolve, reject) => {
	  const process = spawn(command, args, { stdio: 'inherit' });
  
	  process.on('exit', (code) => {
		if (code === 0) {
		  console.log('Process complete.');
		  resolve();
		} else {
		  reject('Process failed with exit code ${code}.');
		}
	  });
	});
  }