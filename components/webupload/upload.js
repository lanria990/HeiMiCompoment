(function(factory) {
  if (typeof module != 'undefined' && module.exports && this.module !== module) {
    var $ = require("jquery");
    var WebUploader = require("webuploader");
    factory($, window, document, WebUploader);
  } else if (typeof define === 'function' && define.amd) {
    define(function(require) {
      var $ = require("jquery");
      var WebUploader = require("webuploader");
      factory($, window, document, WebUploader);
    })
  } else {
    factory();
  }
})(
  //普通上传图片，特殊用法直接重写该函数
  function($, window, document, WebUploader, undefined) {

    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
      this.$element = ele, this.defaults = {
        id: "",
        formDataValue: {
          uploadBusiness: "carousel"
        },
        pclass: '.J_Image',
        server: "http://192.168.2.222:80/admin/uploadimg_ajax.do",
        accept: {
          title: "Images",
          extensions: "gif,jpg,jpeg,bmp,png",
          mimeTypes: "image/*"
        },
        isDel: true,
        width: null,
        height: null,
        success: null //function(){}
      }, this.options = $.extend({}, this.defaults, opt);
    };
    //定义Beautifier的方法
    Beautifier.prototype = {
      _refresh: function() {
        this.uploader.refresh();
      },
      _creat: function() {
        var that = this,
          id = this.options.id,
          $append = $(id).parents(this.options.pclass),
          com,
          uploader, formValue = this.options.formDataValue;

        //绑定删除照片功能
        if (this.options.isDel) {
          $append.on("click", "a.del", function() {
            $(this).parent().html("");
            return false;
          });
        }


        if (that.options.width == null || that.options.height == null) {
          com = {
            width: 1600,
            height: 1600,

            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 90,

            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: false,

            // 是否允许裁剪。
            crop: false,

            // 是否保留头部meta信息。
            preserveHeaders: true,

            // 如果发现压缩后文件大小比原来还大，则使用原来图片
            // 此属性可能会影响图片自动纠正功能
            noCompressIfLarger: false,

            // 单位字节，如果图片大小小于此值，不会采用压缩。
            compressSize: 0


          };
        } else {
          com = {
            width: that.options.width,
            height: that.options.height,

            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 90,

            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: false,

            // 是否允许裁剪。
            crop: false,

            // 是否保留头部meta信息。
            preserveHeaders: true,

            // 如果发现压缩后文件大小比原来还大，则使用原来图片
            // 此属性可能会影响图片自动纠正功能
            noCompressIfLarger: false,

            // 单位字节，如果图片大小小于此值，不会采用压缩。
            compressSize: 1
          };
        }
        //console.log(that.options.server);
        uploader = WebUploader.create({
          header: "Access-Control-Allow-Origin:*",
          // 自动上传。
          auto: true,
          disableWidgets: "log",
          // swf文件路径
          swf: "/components/webupload/Uploader.swf",
          formData: formValue,
          //formValue,
          // 文件接收服务端。
          server: that.options.server, ///agent/uploader.action
          // 选择文件的按钮。可选。
          // 内部根据当前运行是创建，可能是input元素，也可能是flash.
          pick: {
            id: id,
            multiple: false
          },
          duplicate: true,
          //runtimeOrder: 'flash',
          // 只允许选择文件，可选。
          compress: com,
          accept: that.options.accept,
          fileNumLimit: 0,
          fileSingleSizeLimit: 2 * 1024 * 1024
        });
        if (this.options.success == null) {
          // 文件上传成功
          uploader.on("uploadSuccess", function(file, res) {
            if (res.code == '1003') {
              top.location.href = '/admin/login';
              return;
            }
            $("#" + file.id).remove();
            if (res.code == 0) {
              var business = res.map.uploadBusiness;

              var ddh = '<img src="' + res.message + '" class="img-img">'; //Jencode(JencodeCompleteURL(response.message))
              if (that.options.isDel) {
                ddh += '<a class="del" href="#" >删除</a>';
              }
              if (business == 'goods_phone_pic') {
                $append.find(".J_Preview").append(ddh);
              } else {
                $append.find(".J_Preview").html(ddh);
              }
            } else {
              alert("上传失败");
            }


          });
        } else {
          uploader.on("uploadSuccess", function(file, res) {
            if (res.code == '1003') {
              top.location.href = '/admin/login';
              return;
            }
            that.options.success(file, res, that.options.id);
          });

        }
        // 文件上传失败，现实上传出错。
        uploader.on("uploadError", function(file, reason) {
          $("#" + file.id).remove();
          alert("上传失败", file);
        });
        uploader.on("error", function(code) {
          if (code == "Q_EXCEED_NUM_LIMIT") {
            alert("只能上传一张");
            return false;
          }
          if (code == "F_EXCEED_SIZE") {
            alert("大小最大为2M");
            return false;
          }
        });
        this.uploader = uploader;
      },
      init: function() {
        this._creat();
      }
    };
    //在插件中使用上传图片对象
    $.fn.myUpload = function(options) {
      //创建Beautifier的实体
      var beautifier = new Beautifier(this, options);
      //调用其方法
      beautifier.init();
      this.refresh = function() {
        beautifier._refresh();
      };
      return this;
    };
  }
);
// );//(jQuery, window, document);