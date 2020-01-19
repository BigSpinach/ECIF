const program = require('commander');
const chalk =require('chalk');
//console.dir(program);
/*
  Command {
    commands: [],
    options: [],
    _execs: Set(0) {},
    _allowUnknownOption: false,
    _args: [],
    _name: '',
    _optionValues: {},
    _storeOptionsAsProperties: true,
    _passCommandToAction: true,
    _actionResults: [],
    _helpFlags: '-h, --help',
    _helpDescription: 'output usage information',
    _helpShortFlag: '-h',
    _helpLongFlag: '--help',
    Command: [Function: Command],
    Option: [Function: Option],
    CommanderError: [Function: CommanderError]
  }
*/


//2.) 配置命令   用户在命令行输入命令后执行一些内容
program.command('create') //用户输入 create 命令
         .alias('c')   // create 命令的简写  c
         .description('创建project')  //命令的描述信息
         .action(()=>{
          //执行这个命令的回调函数，一般写这个命令的功能
          console.log("创建项目");
         });


//3.)
program.on('--help' ,()=>{
  console.log('\r\n Example');
  console.log('创建xxxx');
  console.log('xxxxxx'+chalk.red("红色提示"));

  //chalk 粉笔 模块 ，五颜六色的命令行提示

});


//1.) 配置属性---给代码传参
program.option('-p, --port <val>', 'set port')
  .version('1.0.1')
  .parse(process.argv)//解析参数


  //console.log(program.port);
/*
  命令行中 执行命令 node .\03-commander.js  -p 3333
  输出   3333

  执行命令 node .\03-commander.js  --version
  输出   1.0.1

*/

