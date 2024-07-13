function lexer(input){

    const tokens = [];
    let cursor = 0;

//read char by char
 while(cursor <input.length){
     let char = input[cursor]; //init 0

     //skip whitespace
     if(/\s/.test(char)){
        cursor++;
        continue;
     }
 
            
    if(/[a-zA-Z]/.test(char)){
        let word = '';
        while(/[a-zA-Z0-9]/.test(char)){
            word +=char;
            char = input[++cursor];
        }
        //keys
        if(word === 'ye' || word ==='bol'){
            tokens.push({type : "keyword" , value : word});
        } else {
            tokens.push({type : "indentifer" , value : word});
        }
        continue;
    }  


    //number

    if(/[0-9]/.test(char)){
        let num ='';
        while(/[0-9]/.test(char)){
            num +=char;
            char = input[++cursor];       
        }
        tokens.push({type :'number' , value : parseInt(num)});
        continue;
    }

    //tokenize opratores and equals sign
    if(/[\+\-\*\=]/.test(char)){
        tokens.push({type : "opreator" , value : char});
        cursor++;
        continue;
    }
     
 
    }

    return tokens;
}


function parser(tokens){
    const ast = {
        type : "program",
        body : []
    };
    //travers on token

    while(tokens.length > 0){
        let token = tokens.shift();

        if(token.type === "keyword" && token.value === "ye"){
            let declaration = {
                type : "Declaration",
                name : tokens.shift().value,
                value : null
            };
            //check for assi
            if(tokens[0].type === "opreator" && tokens[0].value === "="){
                tokens.shift() //consume '='

                //parse the expression
                let expression = ''; //10 + 20 expresion

                while(tokens.length > 0 && tokens[0].type !== "keyword"){

                    expression += tokens.shift().value;
                }
                    declaration.value = expression.trim();
            }

            ast.body.push(declaration)
        
        }

        if(token.type === "keyword" && token.value === "bol"){
            ast.body.push({
                type : "print",
                expression : tokens.shift().value
            })
        }

    }
    
    return ast;

}


//code gen

function codeGen(node){
 
     switch(node.type){
        case 'program' : return node.body.map(codeGen).join('\n');
        case 'Declaration' : return `const ${node.name} = ${node.value}`;
        case 'print' : return `console.log(${node.expression})`;
     }

}




function compiler(input){
    const tokens = lexer(input);
    console.log(tokens)
    const ast = parser(tokens)
    console.log(ast)
    const exeutableCode = codeGen(ast)
    console.log(exeutableCode)
    return exeutableCode

}

function runner(input ){
    eval(input)
}

const code = `
ye x = 10 
ye y = 20

ye sum = x + y

 bol sum
`
const exec = compiler(code);
runner(exec);




