const solc=require('solc');
const fs = require('fs');
const path = require('path');

main();

function main()
{
    var solFile = process.argv[2];
    if(solFile === undefined)
    {
        const solFilesInContractsDir=fs.readdirSync(path.resolve(__dirname, 'contracts')).filter((file)=>{
            return path.extname(file).toLowerCase() === '.sol';
        });
        for (const solFile in solFilesInContractsDir) {
            if (solFilesInContractsDir.hasOwnProperty(solFile)) {
                e=solFilesInContractsDir[solFile];
                compileSolFile(e);
            }
        } 
    } 
    else
    {
        if(path.extname(solFile).toLowerCase()==='.sol')
            compileSolFile(solFile);
        else if(fs.existsSync(path.resolve(__dirname, 'contracts', solFile+'.sol')))
            compileSolFile(solFile+'.sol');
        else
            console.error("File not excist: "+ solFile);
    }
}

//Compile .sol file, ej: compileSolFile() 
function compileSolFile(solFileToCompile) {
    const source=fs.readFileSync(path.resolve(__dirname, 'contracts', solFileToCompile), 'utf8');

    var input = {
        solFileToCompile : source
    }

    let findImports = function (p){
        let filePath = path.resolve(__dirname, p);
        if(!fs.existsSync(filePath))
        {
            console.error("File not excist: "+filePath);
            return { error: 'File not found' }
        }
            
        return {contents:fs.readFileSync(filePath, 'utf8')};
    }

    const output=solc.compile({sources:input},1,findImports);

    for (let contractName in output.contracts) {
            var currentName=contractName.split(':')[1];
            
            var currentCompiledContract=output.contracts[contractName];
            
            var myJsonOutput={
                abi : currentCompiledContract.interface,
                bytecode : currentCompiledContract.bytecode,
                gasEstimates : currentCompiledContract.gasEstimates,
                runtimeBytecode : currentCompiledContract.runtimeBytecode,
                metadata: currentCompiledContract.metadata
            }
            if(!fs.existsSync('builds'))
                fs.mkdirSync('builds');

            fs.writeFileSync("builds/"+ currentName +".json",JSON.stringify(myJsonOutput, null, "\t"));

        
        
    }

}