const rpc = require('discord-rpc');
const client = new rpc.Client({ transport: "ipc" });
const path = require('path');
const vscode = require('vscode');
let det = "deneme";
let sta = "deneme2";

function activate(context){
    client.on('ready', () => {
        rpcConnect();
    });

client.login({ clientId: "1531316119632085072" });
    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(() => rpcConnect())
    )
    context.subscriptions.push(
            vscode.workspace.onDidChangeTextDocument(() => rpcConnect())
    )
    context.subscriptions.push(
            vscode.window.onDidChangeActiveTextEditor(() => rpcConnect())
    )
}

function rpcConnect(){
    const editor = vscode.window.activeTextEditor;
    if(!editor){
        client.setActivity({
    details: "Henüz Projeye Başlanmadı",
    state: `Boşta`,
    largeImageText: "Arduino IDE",
    largeImageKey: "arduino_logo",
    instance: false,
});
    }
    let file = editor.document.fileName;
    let file_name = path.basename(file);
    let lang_text = path.extname(file_name).replace('.', '');
    let lang_key = `${path.extname(file_name).replace('.', '')}lang`;
    let klasor = path.basename(path.dirname(file));
        client.setActivity({
    details: `Şu Klasörde: ${klasor}`,
    state: `Düzenleniyor: ${file_name}`,
    largeImageText: lang_text,
    largeImageKey: lang_key,
    smallImageKey: "arduino_logo",
    smallImageText: "Arduino IDE",
    instance: false,
});
}

function deactivate(){
    client.destroy();
}
module.exports ={ activate, deactivate };