(function() {
	jQuery.fn.dododo = function(config){

		config = jQuery.extend({
			moving_time: 3000, //移動時間
			str_interval: 500, //文字移動間隔
			start_interval: 0, //開始までの時間
			roop_interval: 0, //繰り返し間隔
			top_from: '10%', //始点位置top
			left_from: '80%', //始点位置left
			size_from: '10px', //始点フォントサイズ
			top_to: '40%', //終点位置top
			left_to: '10%', //終点位置left
			size_to: '100px', //終点フォントサイズ
		},config);

		var obj = this;
		
		//移動する文字列をstrに格納
		var str = '';
		if(obj.children('span').size() == 0){
			//初回のみspanタグを作り文字列を退避、非表示にする
			str = obj.text();
			obj.text('');
			obj.append('<span>'+str+'</span>');
			obj.children('span').hide();
		}else{
			//再帰処理の場合は初回に生成したspanタグから文字列を取り出す
			str = obj.children('span').text();
		}

		var last_word = false;
		setTimeout(function(){
			for (var j = 0; j < str.length; j++) {
				//1文字ずつ移動用のdivタグ生成
				obj.append('<div>'+str.substr(j, 1)+'</div>');
				var char = obj.children('div:last');
				char.hide();
				char.css("position", "absolute");
				char.css("font-size", config.size_from);
				char.css("top", config.top_from);
				char.css("left", config.left_from);
	
				if(j == str.length -1){
					last_word = true;
				}

				//移動処理
				char.delay(config.str_interval * j).show(1).animate(
					{
						fontSize:config.size_to,
						top:config.top_to,
						left:config.left_to
					},
					config.moving_time,
					"linear",
					function(is_last){
						return function() {
							//移動後は生成したdivタグ削除
							this.remove();
							if (is_last) {
								//最終文字の場合は繰り返し処理
								setTimeout(function(){
									config.start_interval = 0;
									obj.dododo(config);
								}, config.roop_interval);
							}
						}
					}(last_word)
				);
			}
		}, config.start_interval);
		
		return this;
	};
})(jQuery);
