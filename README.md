<strong>简答题</strong><br/>

1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。

*答：工程化就是项目整体的规划和架构，通过使用脚手架工具和自动化构建系统，来实现这种项目的工程化。工程化可以提高开发效率，保证代码质量，降低成本，比如，在项目创建初期可以用脚手架工具快速生成完整的可运行的项目，在开发过程中通过自动化构建直接生成生产环境代码，从而提高开发效率，并且脚手架和自动化构建的复用性可以降低开发成本。*	

2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？

*答：目前大部分都是协同开发，大家都要使用相同的开发范式，相同的模块依赖，相同的工具配置，甚至相同的基础代码，这样的前提下，脚手架可以完美解决这些问题*	

<strong>编程题</strong><br/>

1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具

	* 创建根目录文件 generator-slm-test
	* 进入文件夹 cd generator-slm-test
	* 初始化文件 yarn init
	* 安装依赖 yarn add yeoman-generator
	* 编辑器打开文件 创建目录 generators/app/index.js
	* 编辑index.js 导入yeoman-generator，导出一个继承自yeoman-generator的类型，在这个类型中定义一个propmting的方法，用于以命令行方式的方法问用户一些问题，在then方法中拿到获取的答案。然后用writng方法写入文件目录
	* 回到命令行，用 yarn link 命令将当前的文件链接到全局，使之成为一个全局模块包
	* 通过 yarn slm-test 下载我们生成的模块生成项目
  * 发布 generator-slm-test 到npm, 命令 npm publish

*generator-slm-test 模块包已发布，欢迎试用^.^*


2、尝试使用 Gulp 完成项目的自动化构建

  *代码在code/gulp-test*
	
  *说明文档在code/gulp-test/说明文档.md*

3、使用 Grunt 完成项目的自动化构建

  *代码在code/grunt-test*

  *说明文档在code/grunt-test/说明文档.md*

<strong>学习笔记</strong><br/>

在notes文件夹下 notes/学习笔记.md

