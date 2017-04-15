 var bsz = bsz || {};

 bsz.widget = {
 	ajax: function(ajaxUrl, ajaxData, ajaxDone) {
 		$.ajax({
 			url: ajaxUrl,
 			type: 'POST',
 			dataType: 'json',
 			data: ajaxData,
 		}).done(function(res) {
 			switch (res.code) {
 				case 0:
 					ajaxDone(res);
 					break;
 				case 10002:
 					top.location.href = '/admin/linqin/login';
 					break;
 				default:
 					bsz.alert.alert(res.msg);
 			}

 		}).fail(function() {
 			bsz.alert.code(-1);
 			throw new Error('failed xhr.');
 		});
 	},
 	initBox: function(id, ajaxFn, thisList, idFn) {
 		var $box = $(id + 'Box');
 		var that = this;
 		$box.find('.J_BSure').click(function() {
 			ajaxFn.call(this, thisList);
 		});
 		$box.find('.J_BCancel,.J_BClose').click(this.hideBox);
 		if ($(id).length) {
 			$(id).click(function() {
 				if (typeof _idFn == 'function') {
 					idFn(id);
 				} else {
 					that.clearBox($box);
 					that.showBox($box);
 				}
 			});
 		}
 		return this;
 	},
 	clearBox: function($box) {
 		var arrayType = $box.data('box').split(''); //input textarea img select
 		for (var i = 0, len = arrayType.length; i < len; i++) {
 			this.clearEventBox(arrayType[i], $box);
 		}
 	},
 	clearEventBox: function(type, $box) {
 		switch (type) {
 			case 'input':
 			case 'textarea':
 				$box.find(type).val('');
 				break;
 			case 'select':
 				$box.find('select').val(-1);
 				break;
 			case 'Img':
 				$box.find('img').attr('src', '/static/images/img2.jpg');
 				break;
 			default:
 				return;
 		}
 	},
 	showBox: function($box) {
 		$box.show();
 		$('#sharemask').show();
 	},
 	hideBox: function(obj) {
 		$(this).closest('.tip').hide();
 		$('#sharemask').hide();
 	}

 };