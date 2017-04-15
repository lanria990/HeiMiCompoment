// --------------------------------
// 支持 amd 设置
// --------------------------------
fis.config.set('modules.postprocessor.vm', 'amd');
fis.config.set('modules.postprocessor.js', 'amd');

fis.config.set('settings.postprocessor.amd', {

    // 设置 baseUrl 后，js 中可以使用绝对路径引用的 module， 都在 baseUrl 中查找
    baseUrl: './',

    paths: {
        jquery: 'components/jquery/jquery.js',
        'jquery.zclip': 'components/zclip/jquery.zclip.js',
        // bootstrap:'components/bootstrap/js/bootstrap.js',
        // zTree:'components/ui/jquery.ztree.all-3.5.js',
        // validate:'components/ui/jquery.validate.js',
        // sellUpload:'components/ui/sellUpload.js',
        // sellImage:'components/ui/sellImage.js',
        // sell:'components/ui/sell.js',
        // bszValidate:'components/ui/validate.js',
        json3: 'components/other/json3.js',
        'bsz.core': 'components/bossonz/bsz.core.js',
        // 'bsz.core':'components/bossonz/bsz.core.js',
        page: 'components/page/jquery-lingpage.js',
        minpage: 'components/page/jquery-minpage.js',
        webuploader: 'components/webupload/webuploader.js',
        upload: 'components/webupload/upload.js',
        carousel: 'components/carousel/jquery-carousel.js',
        selectgoods: 'components/selectgoods/jquery-selectgoods.js',
        // date:'components/bossonz/bossonz-setDate.js',
        // list:'components/list/jquery-list.js'
        // store:'components/store/store.js'
    },


    packages: [

        // 用来存放 libs 库
        {
            name: 'libs',
            location: 'static/libs/',
            main: 'index'
        }
    ],

    // 设置 bootstrap 依赖 jquery
    shim: {
        'components/bootstrap/js/bootstrap.js': ['jquery']
    }
});

// --------------------------------
// js uglify 后生成 sourcemap 方便调试。
// --------------------------------
fis.config.set('settings.optimizer.uglify-js', {
    sourceMap: true
});

// --------------------------------
// sass/scss 配置
// --------------------------------

// 设置 sass 的 include_paths 便于组件引入
fis.config.set('settings.parser.sass.include_paths', [
    'components/compass',
    'static/scss'
]);

// 项目排除掉_xxx.scss、_xxx.md、xxx.min.js
fis.config.set('project.exclude', /((.*\/)?\_[^\/]*\.scss$|.*\.min\.js$)/i);

// 使用 depscombine 是因为，在配置 pack 的时候，命中的文件其依赖也会打包进来。
fis.config.set('modules.packager', 'depscombine');

fis.config.set('pack', {
    // css
    // 暂没有太多 css 文件，先不合并
    // 'pkg/all.css': [],

    // js
    // 依赖也会自动打包进来。

    // 'pkg/boot.js': ['static/js/require.js', 'components/jquery/jquery.js', 'components/bootstrap/js/bootstrap.js'],
    // 'pkg/app.js': ['page/examples/form.js']

});

fis.config.set('root', '/WEB-INF/views/page');
// fis.config.set('root', 'WEB-INF/views/page')
fis.config.set('roadmap.path', [


    // 不在 jello 规范里面，暂时放在此配置
    // 文件名以 _ 下划线打头的，最终都不 release
    {
        reg: '**/_*.*',
        release: false,
        useAMD: false,
        useOptimizer: false
    },
    // 设置 page/**.js 为 isMod 可以自动包装成 amd
    {
        reg: /^\/page\/(.*\.js)$/i,
        isMod: true,
        release: '${statics}/${namespace}/page/$1'
    },

    {
        reg: /^\/static\/libs\/(.*\.js)$/i,
        isMod: true,
        release: '${statics}/${namespace}/libs/$1'
    }, {
        reg: /^\/rule\/(.*\.md)$/i,
        useMap: true, //文件加入到map.json中索引
        // release: '${pages}/rules/$1'
        // charset: 'utf8',
        release: 'page/rules/$1'
    }, {
        reg: /^\/rule\/design\/(.*\.*)$/i,
        useMap: true, //文件加入到map.json中索引
        // useCompile: false,
        release: 'page/rules/design/$1'
    }, {
        reg: /^\/share\/(.*\.md)$/i,
        useMap: true, //文件加入到map.json中索引
        // charset: 'utf8',
        // release: '${pages}/rules/$1'
        release: 'page/shares/$1'
    }
].concat(fis.config.get('roadmap.path', [])));

// markdown 支持，因为需要写文档，不用 markdown 真是不习惯
// npm install -g fis-parser-marked
// use the `fis-parser-marked` plugin to parse *.md file
fis.config.set('modules.parser.md', 'marked');
// *.md will be released as *.html
fis.config.set('roadmap.ext.md', 'html');

// js 模板支持
fis.config.set('modules.parser.tmpl', 'utc');
// fis.config.set('roadmap.ext.tmpl', 'js');