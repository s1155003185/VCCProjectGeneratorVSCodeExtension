import { exec, execSync, spawn } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.create-cpp-dll', () => {
		let workspace = getCurrentWorkspaceName();
		if (workspace) {
			execute(['-Add', '-interface', 'CPPDLL', '-workspace-destination', workspace]);
			logMessage('Create CPP DLL Template!');
		} else {
			logError('No workspace open.');
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.create-cpp-exe', () => {
		let workspace = getCurrentWorkspaceName();
		if (workspace) {
			execute(['-Add', '-interface', 'CPPEXE', '-workspace-destination', workspace]);
			logMessage('Create CPP EXE Template Complete!');
		} else {
			logError('No workspace open.');
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.create-cpp-complex', () => {
		let workspace = getCurrentWorkspaceName();
		if (workspace) {
			execute(['-Add', '-interface', 'CPPCOMPLEX', '-workspace-destination', workspace]);
			logMessage('Create CPP Complex Template Complete!');
		} else {
			logError('No workspace open.');
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.create-vcc-cpp-dll', () => {
		let workspace = getCurrentWorkspaceName();
		if (workspace) {
			execute(['-Add', '-interface', 'VCCDLL', '-workspace-destination', workspace]);
			logMessage('Create VCC DLL CPP Module Complete!');
		} else {
			logError('No workspace open.');
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.create-vcc-cpp-exe', () => {
		let workspace = getCurrentWorkspaceName();
		if (workspace) {
			execute(['-Add', '-interface', 'VCCEXE', '-workspace-destination', workspace]);
			logMessage('Create VCC EXE CPP Module Complete!');
		} else {
			logError('No workspace open.');
		}
	}));
	
	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.create-vcc-cpp-complex', () => {
		let workspace = getCurrentWorkspaceName();
		if (workspace) {
			execute(['-Add', '-interface', 'VCCCOMPLEX', '-workspace-destination', workspace]);
			logMessage('Create VCC Complex CPP Module!');
		} else {
			logError('No workspace open.');
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.update-vcc-cpp', () => {
		let workspace = getCurrentWorkspaceName();
		if (workspace) {
			execute(['-Update', '-workspace-destination', workspace]);
			logMessage('Update VCC Module!');
		} else {
			logError('No workspace open.');
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vccprojectgeneratorvscodeextension.generate-vcc-cpp', () => {
		let workspace = getCurrentWorkspaceName();
		if (workspace) {
			execute(['-Generate', '-workspace-destination', workspace]);
			logMessage('Generate VCC Module!');
		} else {
			logError('No workspace open.');
		}
	}));
}

export function deactivate() {}

function logMessage(message: string) {
	console.log(message);
	vscode.window.showInformationMessage(message);
}

function logError(message: string) {
	console.error(message);
	vscode.window.showErrorMessage(message);
}

function getCurrentWorkspaceName(): string | undefined {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (workspaceFolders && workspaceFolders.length > 0) {
		const workspaceFolder = workspaceFolders[0];
		const fullPath = workspaceFolder.uri.fsPath;
		return `"${path.normalize(fullPath)}"`;
	}
	return undefined;
}

function validateVSCodeExtension() {
	try {
		execSync('git --version');
	} catch (error) {
		throw new Error('Git is not installed.');
	}
	try {
		execSync('make -version');
	} catch (error) {
		throw new Error('Make is not installed.');
	}
}

function execute(vpgCmds: string[]) {
	executeAsync(vpgCmds);
}

async function executeAsync(vpgCmds: string[]) {
	try {
		validateVSCodeExtension();
	} catch (error) {
		logError('' + error);
		throw error;
	}

	let currentDirectory = __dirname;
	try {
		let isWindow = process.platform === 'win32';
		const extension = vscode.extensions.getExtension('VCCProject.vccprojectgeneratorvscodeextension');
		let version = '';
		if (extension) {
			version = extension.packageJSON.version;
			if (!version.startsWith('v')) {
				version = 'v' + version;
			}
		} else {
			version = 'main';
		}

		// -------------------------------------------------- //
		// Validate VCCProjectGenerator
		// -------------------------------------------------- //
		logMessage('Check whether VCCProjectGenerator binary exists - begin');
		let documentPath = path.join(os.homedir(), 'Documents');
		process.chdir(documentPath);

		// check if vcc folder exists, if not then create directory
		// check if vcc/VCCProjectGeneratorDLL exists, if not then git
		let vccFolder = documentPath + '/VCC';
		if (!fs.existsSync(vccFolder)) {
			logMessage('Created Directory ' + vccFolder + ' begin');
			fs.mkdirSync(vccFolder);
			logMessage('Created Directory ' + vccFolder + ' end');
		}
		process.chdir(vccFolder);

		let vpgFolder = vccFolder + '/VCCProjectGenerator';
		if (!fs.existsSync(vpgFolder)) {
			logMessage('git begin');
			await executeCommand('git', ['clone', 'https://github.com/s1155003185/VCCProjectGenerator', vpgFolder]);
			logMessage('git end');
		}
		// check version
		logMessage('git check version begin');
		let currentHashID = '';
		let projectGeneratorVersion = "";
		try {
			process.chdir(vpgFolder);

			logMessage('Current VCCProjectGenerator Extension version: ' + version);

			currentHashID = await executeCommand('git', ['rev-parse', 'HEAD']);
			// check VCCProjectGenerator version
			try {
				await executeCommand('git', ['pull']);
			} catch (error) {
			}
			try {
				// tag
				projectGeneratorVersion = await executeCommand('git', ['describe', '--tags']);
			} catch (error) {
				// branch
				projectGeneratorVersion = await executeCommand('git', ['branch', '--show-current']);
			}
			logMessage('Current VCCProjectGenerator version: ' + projectGeneratorVersion);
		} catch (error) {
			logMessage('Cannot get VCCProjectGenerator version');
			throw new Error('Cannot get VCCProjectGenerator version');
		}
		try {
			if (!projectGeneratorVersion.startsWith(version)) {
				logMessage('Switch to version: ' + version);
				await executeCommand('git', ['reset', '--hard']);
				await executeCommand('git', ['checkout', version]);
			}
		} catch (error) {
			logMessage('Cannot get Switch to version ' + projectGeneratorVersion + ': ' + error);
			throw new Error('Cannot get Switch to version ' + projectGeneratorVersion + ': ' + error);
		}

		logMessage('git check version end');

		process.chdir(vpgFolder);

		var exePath = isWindow ? 'bin/Release/vpg.exe' : 'bin/Release/vpg';

		let newHashID = await executeCommand('git', ['rev-parse', 'HEAD']);
		exePath = path.join(process.cwd(), exePath);
		logMessage('exe path: ' + exePath);
		if (currentHashID !== newHashID || !fs.existsSync(exePath)) {
			logMessage('make begin');
			await executeCommand('make', ['release_exe', '-j10']);
			logMessage('make end');
		}
		if (!fs.existsSync(exePath)) {
			throw new Error(exePath + ' does not exist.');
		}
		logMessage('Check whether VCCProjectGenerator binary exists - done');

		// -------------------------------------------------- //
		// Execute VCC Project Generator
		// -------------------------------------------------- //
		logMessage('Execute vpg ' + vpgCmds.join(' '));
		execSync('"' + exePath + '" ' + vpgCmds.join(' '));
	} catch (error) {
		console.error(`executeAsync error: ${error}`);
		logError(`executeAsync error: ${error}`);
		throw error;
	} finally {
		process.chdir(currentDirectory);
	}
}

function executeCommand(command: string, args: string[]): Promise<string> {
	return new Promise((resolve, reject) => {
	  const process = spawn(command, args);
  
	  let stdout = '';
  
	  process.stdout.on('data', (data) => {
		stdout += data.toString();
	  });
  
	  process.on('exit', (code) => {
		if (code === 0) {
		  logMessage('Process complete.');
		  resolve(stdout.trim());
		} else {
		  reject(`Process failed with exit code ${code}.`);
		}
	  });
	});
  }