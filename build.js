const fs = require('fs');
// 手动修改html文件
const sources = fs.readdirSync('./build');
const map = {};
for (let i = 0; i < sources.length; i++) {
    const name_hash = sources[i].split('.');
    if (name_hash[1] === 'html') {
        continue;
    }
    if (name_hash[2] === 'css') {
        map[name_hash[0] + '_css'] = name_hash[1];
        continue;
    }
    map[name_hash[0]] = name_hash[1];
}
// 写入文件
let files = require('./webpack.config.build.js').entry;
let names = Object.keys(files).filter(ele => {
    return files[ele] instanceof Array === false;
});
names.forEach(name => {
    let cssLink = '',cssHash = map[name + '_css'];
    if (cssHash != null) {
        cssLink = `<link rel="stylesheet" href="./${name}.${cssHash}.css">`;
    }
    fs.writeFileSync(`./build/${name}.html`, `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${name}</title>
     ${cssLink}
    </head>
    <body>
    <div id="root"></div>
    <script type="text/javascript" src="./manifest.${map.manifest}.js"></script>
    <script type="text/javascript" src="./venders.${map.venders}.js"></script>
    <script type="text/javascript" src="./${name}.${map[name]}.js"></script>
    </body>
    </html>`)
})