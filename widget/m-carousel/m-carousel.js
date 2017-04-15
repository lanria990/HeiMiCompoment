  /*!
   * m-carousel.js 列表组件
   * @author YJL
   * @version 0.0.1
   * @copyright BOSSONZ
   * Date 2015/06/27
   */

  var $ = require('jquery');
  require('upload');
  require('carousel');
  var RJSON = require('json3');
  var bsz = require('bsz.core');
  var $editBox = $('#carouselBox');
  var carTplFn = __inline('./_carousel.tmpl');
  var carBoxTplFn = __inline('./_carouselBox.tmpl');
  var BASEURL = $('#carType').data('base');


  /**
   * 排序
   */
  function _lisort() {
    var $tr = $editBox.find('tr.J_Image');
    var len = $tr.length;
    var up, down;
    var data = [];

    $editBox.find('input[type=radio]').each(function() {
      data.push(this.checked);
    });

    $tr.each(function(i) {
      $(this).find('input[type="radio"]').attr('name', 'type' + i);
      up = $(this).find('.J_Up');
      down = $(this).find('.J_Down');
      if (i === 0) {
        up.addClass('dis-up');
        down.removeClass('dis-down');
        if (len === 1) {
          down.addClass('dis-down');
        }
      } else if (i === len - 1) {
        down.addClass('dis-down');
        up.removeClass('dis-up');
      } else {
        up.removeClass('dis-up');
        down.removeClass('dis-down');
      }
      $(this).attr('data-order', i);
    });

    $editBox.find('input[type=radio]').each(function(i) {
      this.checked = data[i];
    });
  }


  function _tmplCarousel(data) {

  }

  /**
   * 初始化弹窗事件
   */
  function _initCarousel() {
    this.carousel = null;
    this.carousel = $('#carousel').myCarousel({
      width: 640,
      auto: false,
      setbtn: false
    });
  }

  /**
   * 获取数据
   * @param  {obejct} that [description]
   * @return {[type]}      [description]
   */
  function _postCarouselGet(that) {
    var _url = BASEURL + 'findCarouselAjax.do';
    bsz.widget.ajax(_url, {}, function(res) {
      var dom = carTplFn({
        items: res.map.list
      })
      $('#carCont').html(dom);
      _initCarousel();
      if (that) {
        bsz.widget.hideOBox(that);
      }
    }, this);
  }


  /**
   * 获取数据
   * @return {[type]} [description]
   */
  function _getData() {
    var $input, o = {},
      data = [];
    var _vdata = true;
    $editBox.find('.J_Image').each(function(i) {
      $input = $(this).find('input[type=radio]:checked').parents('li').find('input[name=url]');
      o = {};
      o.type = parseInt($input.data('type'));
      if (o.type === 0) {
        o.id = $input.attr('data-id');
        o.url = '';
      } else {
        o.id = 0;
        o.url = $input.val();
      }
      if (o.type === 1 && o.url === '') {
        bsz.alert.alert('地址链接不能为空');
        _vdata = false;
        return false;
      }
      if (o.type === 0 && (o.id === '' || typeof o.id === 'undefined')) {
        bsz.alert.alert('资讯不能为空');
        _vdata = false;
        return false;
      }
      o.imgUrl = $(this).find('img').attr('src');
      o.order = parseInt($(this).attr('data-order'));
      data.push(o);
    });
    if (!_vdata) {
      return null;
    }
    return RJSON.stringify(data);
  }

  /**
   * 保存轮播图
   * @return {[type]} [description]
   */
  function _postCarouselSave() {
    var data = _getData();
    var that = this;
    var _url = BASEURL + 'saveCarouselAjax.do';
    if (data == null) {
      return;
    }
    bsz.widget.ajax(_url, {}, function(res) {
      _postCarouselGet(that);
    }, this);
  }



  /**
   * 初始化弹窗
   * @return {[type]} [description]
   */
  function _initShowBox() {
    var _url = BASEURL + 'findCarouselAjax.do';
    bsz.widget.ajax(_url, {}, function(res) {
      var dom = carBoxTplFn({
        items: res.map.list
      });
      $('#carBoxCont').html(dom);
      bsz.widget.showBox($editBox);
    }, this);
  }


  /**
   * 图片上传成功
   * @param  {object} file 插件参数
   * @param  {object} res  ajax返回参数
   */
  function _uploadSuccess(file, res) {
    $('#' + file.id).remove();
    if (res.code === 0) {
      var $box = $('#carBoxCont');
      var len = $box.find('tr.J_Image').length;
      if (len > 3) {
        bsz.alert.alert('轮播图片最多4张');
        return;
      }
      var dom = carBoxTplFn({
        items: [{
          id: '',
          title: '',
          classify: '',
          url: '',
          order: len,
          imgUrl: res.map.imgUrl
        }]
      });
      $box.append(dom);
      _lisort();
    } else {
      bsz.alert.alert(res.msg);
    }
  }


  $(function() {
    //初始化上传控件
    var formDataValue = $('#carType').data('upload');
    $('#addUpload').myUpload({
      id: '#addUpload',
      formDataValue: {
        uploadBusiness: formDataValue
      },
      isDel: false,
      success: _uploadSuccess
    });

    // 初始化绑定上移下移删除等事件;
    $editBox.on('click', '.J_Up', function() {
      if ($(this).hasClass('dis-up')) {
        return;
      }
      var $tr = $(this).parents('tr');
      $tr.insertBefore($tr.prev());
      _lisort();
    }).on('click', '.J_Down', function() {
      if ($(this).hasClass('dis-down') || $('.J_Down').length === 1) return;
      var $tr = $(this).parents('tr');
      $tr.insertAfter($tr.next());
      _lisort();
    }).on('click', '.J_Del', function() {
      var $tr = $(this).parents('tr');
      $tr.remove();
      _lisort();
    });

    //保存
    $editBox.find('.J_BSave').click(_postCarouselSave);

    //取消
    $editBox.find('.J_BCancel,.J_BClose').click(bsz.widget.hideBox);


    $('#carouselSet').click(_initShowBox);

    //初始化
    _postCarouselGet();

  });