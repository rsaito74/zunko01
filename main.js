//***** 東北ずん子のモンスター討伐・宮城編（仮）
//***** 開発：斉藤リイチ
//***** 素材提供（敬称略）
//***** ・キャラクター素材：東北ずん子（http://zunko.jp/）
//***** ・背景素材：ぴぽや（http://piposozai.blog76.fc2.com/）
//***** ・モンスター素材：【Rド】（http://www.geocities.co.jp/Milano-Cat/3319/）
//***** ・カットイン背景素材：臼井の会（http://usui.moo.jp/frame2.html）

enchant();

//画像ファイル名の定数セット
var BG_IMAGE = "pipo_battlebg001.jpg";
var ZUNP_NP_IMAGE = "zunp_name.png";
var HP_NP_IMAGE = "hp_name.png";
var STAGE_NP_IMAGE = "stage_np.png";

var CHARA01_IMAGE = "my_chara01.png";
var CHARA01_DAMAGE_IMAGE = "my_chara01d.png";
var ENE01_IMAGE = "ene01.png";
var ENE01_DAMAGE_IMAGE = "ene01d.png";
var ZUN_BTN_ATK1_IMAGE = "zun_btn_atk01.png";
var ZUN_BTN_ATK2_IMAGE = "zun_btn_atk02.png";
var ZUN_BTN_ATK3_IMAGE = "zun_btn_atk03.png";
var ZUN_BTN_ATK4_IMAGE = "zun_btn_atk04.png";
var ZUN_BTN_ATK5_IMAGE = "zun_btn_atk05.png";
var CUT_IN_BG_IMAGE = "cutin_bg.jpg";
var CUT_IN_CHARA1_IMAGE = "zun_atk01.png";
var CUT_IN_CHARA2_IMAGE = "zun_atk02.png";

var ZUN_BTN_COOK1_IMAGE = "zun_btn_cook01.png";
var ZUN_BTN_COOK2_IMAGE = "zun_btn_cook02.png";
var ZUN_BTN_COOK3_IMAGE = "zun_btn_cook03.png";
var ZUN_BTN_COOK4_IMAGE = "zun_btn_cook04.png";
var ZUN_EAT_IMAGE = "zzm_taberu.png";

var stage_no = 1;				//ステージ番号
var stage_name = "栗原市";		//ステージ名

var btn1_type = -1;			//ボタン１の種類
var btn2_type = -1;			//ボタン２の種類
var cut_in_no = -1;			//カットインの種類
var zunko_atk_pow = 0;		//ずん子攻撃値
var zunda_use_pow = 0;		//ずんだPow消費値
var ene_damage_flag = false;		//敵ダメージ演出表示フラグ
var zunko_damage_flag = false;		//ずん子ダメージ演出表示フラグ

var zunko_level = 1;			//ずん子レベル
var zunko_hp_max = 18;			//ずん子HP最大値
var zunko_hp = zunko_hp_max;	//ずん子HP
var zunko_zunda_pow_max = 100;	//ずん子ずんだPow最大値
var zunko_zunda_pow = zunko_zunda_pow_max;	//ずん子ずんだPow最大値
var zunko_str = 0;				//ずん子攻撃力

var ene_hp_max = 18;			//敵HP最大値
var ene_hp = ene_hp_max;		//敵HP
var ene_atk_pow = 0;			//敵攻撃値

window.onload = function(){
    var game = new Game(320, 480);

	//全画像のプレロード
	game.preload(BG_IMAGE);
	game.preload(ZUNP_NP_IMAGE);
	game.preload(HP_NP_IMAGE);
	game.preload(STAGE_NP_IMAGE);
	game.preload(CHARA01_IMAGE);
	game.preload(CHARA01_DAMAGE_IMAGE);
	game.preload(ENE01_IMAGE);
	game.preload(ENE01_DAMAGE_IMAGE);
	game.preload(ZUN_BTN_ATK1_IMAGE);
	game.preload(ZUN_BTN_ATK2_IMAGE);
	game.preload(ZUN_BTN_ATK3_IMAGE);
	game.preload(ZUN_BTN_ATK4_IMAGE);
	game.preload(ZUN_BTN_ATK5_IMAGE);
	game.preload(CUT_IN_BG_IMAGE);
	game.preload(CUT_IN_CHARA1_IMAGE);
	game.preload(CUT_IN_CHARA2_IMAGE);
	game.preload(ZUN_BTN_COOK1_IMAGE);
	game.preload(ZUN_BTN_COOK2_IMAGE);
	game.preload(ZUN_BTN_COOK3_IMAGE);
	game.preload(ZUN_BTN_COOK4_IMAGE);
	game.preload(ZUN_EAT_IMAGE);

    game.onload = function(){

        game.rootScene.backgroundColor = "#000000";

		//背景生成
		var bg_img = new Sprite(320,320);
		bg_img.image = game.assets[BG_IMAGE];
		game.rootScene.addChild(bg_img);

		//ステージ名（下敷き）生成
		var stage_np = new Sprite(128,32);
		stage_np.image = game.assets[STAGE_NP_IMAGE];
		stage_np.x = 320-128;
		stage_np.y = 16;
		game.rootScene.addChild(stage_np);
		//ステージ名（テキスト）生成
        var stage_name = new Label("");
		stage_name.x = 320-128+12;
		stage_name.y = 16+8;
		stage_name.font = "16px 'sans-serif'"
		stage_name.text = SetStageText();
		stage_name.color = "#cff15f";
		game.rootScene.addChild(stage_name);

		//ずん子生成
		var chara_img = new Sprite(160,144);
		chara_img.image = game.assets[CHARA01_IMAGE];
		chara_img.x = 320-160;
		chara_img.y = 320-144;
		chara_img.damage_count = 0;
		game.rootScene.addChild(chara_img);
		//ずん子毎フレームイベント
		chara_img.addEventListener("enterframe",function(){
			if (zunko_damage_flag) {
				chara_img.image = game.assets[CHARA01_DAMAGE_IMAGE];
				chara_img.opacity-=0.5;
				if (chara_img.opacity < 0.0) {
					chara_img.opacity = 1.0;
					if (chara_img.damage_count >= 2) {
						chara_img.image = game.assets[CHARA01_IMAGE];
						zunko_damage_flag = false;
						chara_img.damage_count = 0;
					}
					else {
						chara_img.damage_count++;
					}
				}
			}
		});

		//ずんだPow（バー下敷き）
		var zunp_bar_base = new Entity();
		zunp_bar_base.x = 8;
		zunp_bar_base.y = 320-62+24;
		zunp_bar_base.width = 150;
		zunp_bar_base.height = 8;
		zunp_bar_base.backgroundColor = "#444444";
		game.rootScene.addChild(zunp_bar_base);

		//ずんだPow（バー本体）
		var zunp_bar = new Entity();
		zunp_bar.x = 8;
		zunp_bar.y = 320-62+24;
		zunp_bar.width = 150;
		zunp_bar.height = 8;
		zunp_bar.backgroundColor = "#44ff44";
		game.rootScene.addChild(zunp_bar);

		//ずんだPow（ネームプレート）
		var zunp_np_img = new Sprite(96,32);
		zunp_np_img.image = game.assets[ZUNP_NP_IMAGE];
		zunp_np_img.x = 4;
		zunp_np_img.y = 320-62;
		game.rootScene.addChild(zunp_np_img);

		//HP（バー下敷き）
		var hp_bar_base = new Entity();
		hp_bar_base.x = 8;
		hp_bar_base.y = 320-40+24;
		hp_bar_base.width = 150;
		hp_bar_base.height = 8;
		hp_bar_base.backgroundColor = "#444444";
		game.rootScene.addChild(hp_bar_base);

		//HP（バー本体）
		var hp_bar = new Entity();
		hp_bar.x = 8;
		hp_bar.y = 320-40+24;
		hp_bar.width = 150;
		hp_bar.height = 8;
		hp_bar.backgroundColor = "#ffff00";
		game.rootScene.addChild(hp_bar);

		//HP（ネームプレート）
		var hp_np_img = new Sprite(32,16);
		hp_np_img.image = game.assets[HP_NP_IMAGE];
		hp_np_img.x = 8;
		hp_np_img.y = 320-40+12;
		game.rootScene.addChild(hp_np_img);
    	
		//敵キャラ生成
		var ene_img = new Sprite(120,96);
		ene_img.image = game.assets[ENE01_IMAGE];
		ene_img.x = 10;
		ene_img.y = 80;
		ene_img.damage_count = 0;
		game.rootScene.addChild(ene_img);
		//敵キャラ毎フレームイベント
		ene_img.addEventListener("enterframe",function(){
			if (ene_damage_flag) {		//敵ダメージ演出表示フラグ
				ene_img.image = game.assets[ENE01_DAMAGE_IMAGE];
				ene_img.opacity-=0.5;
				if (ene_img.opacity < 0.0) {
					ene_img.opacity = 1.0;
					if (ene_img.damage_count >= 2) {
						ene_img.image = game.assets[ENE01_IMAGE];
						ene_damage_flag = false;
						ene_img.damage_count = 0;
					}
					else {
						ene_img.damage_count++;
					}
				}
			}
		});
    	
		//メッセージ生成
        var message = new Label("");
		message.x = 8;
		message.y = 320+8;
		message.font = "24px 'sans-serif'"
		message.text = "【ずん子】 Lv 1 / HP " + zunko_hp + "<br>モンスターがあらわれた！";
		message.color = "#cff15f";
		game.rootScene.addChild(message);

		//▼カーソル生成
        var wait_cursor = new Label("▼");
		wait_cursor.x = 160-12;
		wait_cursor.y = 480-48;
		wait_cursor.font = "24px 'sans-serif'"
		wait_cursor.color = "#cff15f";
		game.rootScene.addChild(wait_cursor);
		//▼カーソル毎フレームイベント
		wait_cursor.addEventListener("enterframe",function(){
			wait_cursor.opacity -= 0.1;
			if (wait_cursor.opacity < 0.0) {
				wait_cursor.opacity = 1.0;
			}
		});

		//カットインBG生成
		var cut_in_bg = new Sprite(640,160);
		cut_in_bg.image = game.assets[CUT_IN_BG_IMAGE];
		cut_in_bg.x = 0;
		cut_in_bg.y = 80;
		cut_in_bg.visible = false;			//初期状態は非表示
		game.rootScene.addChild(cut_in_bg);

		//カットインキャラ生成
		var cut_in_chara = new Sprite(320,160);
		cut_in_chara.image = game.assets[CUT_IN_CHARA1_IMAGE];
		cut_in_chara.x = -32;
		cut_in_chara.y = 80;
		cut_in_chara.visible = false;			//初期状態は非表示
		game.rootScene.addChild(cut_in_chara);

		//カットインBG毎フレームイベント
		cut_in_bg.addEventListener("enterframe",function(){
			if (cut_in_bg.visible) {
				ZunAtkBtnVisibleOff();		//ボタン表示OFF
				chara_img.visible = false;			//ずん子顔CG非表示
				if (cut_in_no == 4) {
					cut_in_chara.image = game.assets[CUT_IN_CHARA2_IMAGE];
				}
				else {
					cut_in_chara.image = game.assets[CUT_IN_CHARA1_IMAGE];
				}
				cut_in_chara.visible = true;			//カットインキャラ表示
				cut_in_bg.x -= 10;
				cut_in_chara.x += 1;
				if (cut_in_bg.x <= -320) {
					//スクロール終了
					cut_in_bg.visible = false;
					cut_in_chara.visible = false;
					cut_in_bg.x = 0;
					cut_in_chara.x = -32;

					chara_img.visible = true;			//ずん子顔CG表示
					//zun_btn_atk.visible = true;

			    	//ずん子の攻撃（カットイン演出後）
					ZunkoAttack();
				}
			}
		});

		//攻撃ボタン１生成
		var zun_btn_atk1 = new Sprite(208,32);
		zun_btn_atk1.image = game.assets[ZUN_BTN_ATK1_IMAGE];
		zun_btn_atk1.x = (320-208)/2;
		zun_btn_atk1.y = zun_btn_atk1.ini_y = 370;
		zun_btn_atk1.visible = false;			//初期状態は非表示
		zun_btn_atk1.message = "";				//技名格納用
		game.rootScene.addChild(zun_btn_atk1);
		//「ずんだアロー」ボタン・タッチイベント（ずんだアロー発動）
		zun_btn_atk1.addEventListener("touchend",function(){
			ZunAtkBtnVisibleOff();		//ボタン表示OFF
			
			//zunko_atk_pow = (btn1_type + 1) + zunko_str + rand(2);		//ずん子攻撃値
			zunko_atk_pow = ZunkoAtkPowSet(btn1_type);
			
			cut_in_no = btn1_type;
			cut_in_bg.visible = true;			//表示
			
			//メッセージ表示
			message.text = zun_btn_atk1.message;
			message.visible = true;
		});
		//攻撃ボタン２生成
		var zun_btn_atk2 = new Sprite(208,32);
		zun_btn_atk2.image = game.assets[ZUN_BTN_ATK1_IMAGE];
		zun_btn_atk2.x = (320-208)/2;
		zun_btn_atk2.y = zun_btn_atk2.ini_y = 420;
		zun_btn_atk2.visible = false;			//初期状態は非表示
		zun_btn_atk2.message = "";				//技名格納用
		game.rootScene.addChild(zun_btn_atk2);
		//「ずんだアロー」ボタン・タッチイベント（ずんだアロー発動）
		zun_btn_atk2.addEventListener("touchend",function(){
			ZunAtkBtnVisibleOff();		//ボタン表示OFF
			
			//zunko_atk_pow = (btn2_type + 1) + zunko_str + rand(2);		//ずん子攻撃値
			zunko_atk_pow = ZunkoAtkPowSet(btn2_type);
			
			cut_in_no = btn2_type;
			cut_in_bg.visible = true;			//表示
			
			//メッセージ表示
			message.text = zun_btn_atk2.message;
			message.visible = true;
		});
		var ZunAtkBtnVisibleOff = function() {
			zun_btn_atk1.visible = false;		//非表示
			zun_btn_atk1.y = zun_btn_atk1.ini_y * -1;
			zun_btn_atk2.visible = false;		//非表示
			zun_btn_atk2.y = zun_btn_atk2.ini_y * -1;
		};
		var ZunAtkBtnVisibleOn = function() {
			zun_btn_atk1.y = zun_btn_atk1.ini_y;
			zun_btn_atk2.y = zun_btn_atk2.ini_y;
			zun_btn_atk1.visible = true;		//表示
			zun_btn_atk2.visible = true;		//表示
		};
		ZunAtkBtnVisibleOff();		//初期状態ではOFF

		//「ずんだアロー」ボタン配置
		var ZundaAttackButtonSet = function() {
			//▼カーソル非表示
			wait_cursor.visible = false;
			//メッセージ変更
			message.text = "攻撃方法を選んでね";

			//1つ目のボタンを設定
			btn1_type = rand(5);	//0～4
			switch (btn1_type) {
				case 0:
					zun_btn_atk1.image = game.assets[ZUN_BTN_ATK1_IMAGE];
					zun_btn_atk1.message = "ずん子<br>「プチずんだアロー！」";
					break;
				case 1:
					zun_btn_atk1.image = game.assets[ZUN_BTN_ATK2_IMAGE];
					zun_btn_atk1.message = "ずん子<br>「大粒ずんだアロー！」";
					break;
				case 2:
					zun_btn_atk1.image = game.assets[ZUN_BTN_ATK3_IMAGE];
					zun_btn_atk1.message = "ずん子<br>「こし餡ずんだアロー！」";
					break;
				case 3:
					zun_btn_atk1.image = game.assets[ZUN_BTN_ATK4_IMAGE];
					zun_btn_atk1.message = "ずん子<br>「極上ずんだアロー！」";
					break;
				case 4:
					zun_btn_atk1.image = game.assets[ZUN_BTN_ATK5_IMAGE];
					zun_btn_atk1.message = "ずん子<br>「ずんだイート！」";
					break;
				default:
					zun_btn_atk1.message = "ずん子<br>「エラーだよ！」";
					break;
			}

			//2つ目のボタンを設定
			btn2_type = rand(5);	//0～4
			while (btn1_type == btn2_type) {
				btn2_type = rand(5);
			}
			switch (btn2_type) {
				case 0:
					zun_btn_atk2.image = game.assets[ZUN_BTN_ATK1_IMAGE];
					zun_btn_atk2.message = "ずん子<br>「プチずんだアロー！」";
					break;
				case 1:
					zun_btn_atk2.image = game.assets[ZUN_BTN_ATK2_IMAGE];
					zun_btn_atk2.message = "ずん子<br>「大粒ずんだアロー！」";
					break;
				case 2:
					zun_btn_atk2.image = game.assets[ZUN_BTN_ATK3_IMAGE];
					zun_btn_atk2.message = "ずん子<br>「こし餡ずんだアロー！」";
					break;
				case 3:
					zun_btn_atk2.image = game.assets[ZUN_BTN_ATK4_IMAGE];
					zun_btn_atk2.message = "ずん子<br>「極上ずんだアロー！」";
					break;
				case 4:
					zun_btn_atk2.image = game.assets[ZUN_BTN_ATK5_IMAGE];
					zun_btn_atk2.message = "ずん子<br>「ずんだイート！」";
					break;
				default:
					zun_btn_atk2.message = "ずん子<br>「エラーだよ！」";
					break;
			}
			//ずんだボタン表示
			ZunAtkBtnVisibleOn();
			
			//自身をイベントリスナから削除
			game.rootScene.clearEventListener("touchend");
		};
		//画面をタッチしたら「ずんだアロー」ボタン配置
        game.rootScene.addEventListener("touchend",ZundaAttackButtonSet);

		//料理ボタン1生成
		var zun_btn_cook1 = new Sprite(208,32);
		zun_btn_cook1.image = game.assets[ZUN_BTN_COOK1_IMAGE];
		zun_btn_cook1.x = (320-208)/2;
		zun_btn_cook1.y = zun_btn_cook1.ini_y = 370;
		zun_btn_cook1.visible = false;			//初期状態は非表示
		zun_btn_cook1.message = "";				//メッセージ格納用
		game.rootScene.addChild(zun_btn_cook1);
		//料理ボタン1タッチイベント
		zun_btn_cook1.addEventListener("touchend",function(){
			//画面タップイベントのクリア
			//game.rootScene.clearEventListener("touchend");
			//this.clearEventListener("touchend");

			ZunCookBtnVisibleOff();		//ボタン表示OFF
			
			switch (btn1_type) {
				case 0:
					zun_btn_cook1.message = "ずん子はずんだを食べた！<br>HPが全回復！";
					//HP全回復
					zunko_hp = zunko_hp_max;
					//HPバー回復
		    		hp_bar.width = (zunko_hp / zunko_hp_max) * hp_bar_base.width;
					break;
				case 1:
					zun_btn_cook1.message = "ずん子はずんだを食べた！<br>ずんだPowが20%回復！";
					//ずんだPow20%回復
					zunko_zunda_pow += (zunko_zunda_pow_max * 0.2);
					//ずんだPowバー回復
					zunp_bar.width = (zunko_zunda_pow / zunko_zunda_pow_max) * zunp_bar_base.width;
					break;
				case 2:
					zun_btn_cook1.message = "ずん子はずんだを食べた！<br>HP最大値が1増えた！";
					zunko_hp_max++;
					zunko_hp++;
					//HPバー更新
		    		hp_bar.width = (zunko_hp / zunko_hp_max) * hp_bar_base.width;
					break;
				case 3:
					zun_btn_cook1.message = "ずん子はずんだを食べた！<br>攻撃力が1増えた！";
					zunko_str++;
					break;
				default:
					zun_btn_cook1.message = "ずん子<br>「エラーだよ！」";
					break;
			}
			//メッセージ表示
			message.text = zun_btn_cook1.message;
			//▼カーソル表示
			wait_cursor.visible = true;

			//画面のどこかをタッチしたら発生するイベント
        	//game.rootScene.addEventListener("touchend",NextStage);

			//ずんだモグモグ画像表示
			zunda_eat_img.anime = true;
		});
		//料理ボタン2生成
		var zun_btn_cook2 = new Sprite(208,32);
		zun_btn_cook2.image = game.assets[ZUN_BTN_COOK1_IMAGE];
		zun_btn_cook2.x = (320-208)/2;
		zun_btn_cook2.y = zun_btn_cook2.ini_y = 420;
		zun_btn_cook2.visible = false;			//初期状態は非表示
		zun_btn_cook2.message = "";				//メッセージ格納用
		game.rootScene.addChild(zun_btn_cook2);
		//料理ボタン2タッチイベント
		zun_btn_cook2.addEventListener("touchend",function(){
			//画面タップイベントのクリア
			//game.rootScene.clearEventListener("touchend");
			//this.clearEventListener("touchend");

			ZunCookBtnVisibleOff();		//ボタン表示OFF
			
			switch (btn2_type) {
				case 0:
					zun_btn_cook2.message = "ずん子はずんだを食べた！<br>HPが全回復！";
					//HP全回復
					zunko_hp = zunko_hp_max;
					//HPバー回復
		    		hp_bar.width = (zunko_hp / zunko_hp_max) * hp_bar_base.width;
					break;
				case 1:
					zun_btn_cook2.message = "ずん子はずんだを食べた！<br>ずんだPowが20%回復！";
					//ずんだPow20%回復
					zunko_zunda_pow += (zunko_zunda_pow_max * 0.2);
					//ずんだPowバー回復
					zunp_bar.width = (zunko_zunda_pow / zunko_zunda_pow_max) * zunp_bar_base.width;
					break;
				case 2:
					zun_btn_cook2.message = "ずん子はずんだを食べた！<br>HP最大値が1増えた！";
					zunko_hp_max++;
					zunko_hp++;
					//HPバー更新
		    		hp_bar.width = (zunko_hp / zunko_hp_max) * hp_bar_base.width;
					break;
				case 3:
					zun_btn_cook2.message = "ずん子はずんだを食べた！<br>攻撃力が1増えた！";
					zunko_str++;
					break;
				default:
					zun_btn_cook2.message = "ずん子<br>「エラーだよ！」";
					break;
			}
			//メッセージ表示
			message.text = zun_btn_cook2.message;
			//▼カーソル表示
			wait_cursor.visible = true;
			
			//画面のどこかをタッチしたら発生するイベント
			//game.rootScene.addEventListener("touchend",NextStage);
			
			//ずんだモグモグ画像表示
			zunda_eat_img.anime = true;
		});
		var ZunCookBtnVisibleOff = function() {
			zun_btn_cook1.visible = false;		//非表示
			zun_btn_cook1.y = zun_btn_cook1.ini_y * -1;
			zun_btn_cook2.visible = false;		//非表示
			zun_btn_cook2.y = zun_btn_cook2.ini_y * -1;
		};
		var ZunCookBtnVisibleOn = function() {
			zun_btn_cook1.y = zun_btn_cook1.ini_y;
			zun_btn_cook2.y = zun_btn_cook2.ini_y;
			zun_btn_cook1.visible = true;		//表示
			zun_btn_cook2.visible = true;		//表示
		};
		ZunCookBtnVisibleOff();		//初期状態ではOFF

    	//***** ずんだモグモグ演出 *****
    	var zunda_eat_img = new Sprite(128,128);
		zunda_eat_img.image = game.assets[ZUN_EAT_IMAGE];
		zunda_eat_img.x = (320-128)/2;
		zunda_eat_img.y = 120;
		zunda_eat_img.visible = false;			//初期状態は非表示
		zunda_eat_img.frame = 0;
		zunda_eat_img.count = 0;
		zunda_eat_img.anime = false;
		game.rootScene.addChild(zunda_eat_img);
		//ずんだモグモグ毎フレーム処理
		zunda_eat_img.addEventListener("enterframe",function(){
    		if (zunda_eat_img.anime) {
				zunda_eat_img.visible = true;
				//▼カーソル非表示
				wait_cursor.visible = false;
				//ずん子顔CG非表示
				chara_img.visible = false;

				zunda_eat_img.count++;
				if ((zunda_eat_img.count%10)==0) {
					if (zunda_eat_img.frame == 0) {
						zunda_eat_img.frame = 1;
					}
					else {
						zunda_eat_img.frame = 0;
					}
					if (zunda_eat_img.count >= 40) {
						zunda_eat_img.count = 0;
						zunda_eat_img.frame = 0;

						//ずん子モグモグアニメoff
						zunda_eat_img.anime = false;
						//▼カーソル表示
						wait_cursor.visible = true;

						//画面のどこかをタッチしたら発生するイベント
						game.rootScene.addEventListener("touchend",NextStage);
					}
				}
			}
    	});
    	
    	//***** ずん子の攻撃（カットイン演出後） *****
    	var ZunkoAttack = function() {
			//ずんだPow減少
    		zunko_zunda_pow-=zunda_use_pow;
			zunp_bar.width = (zunko_zunda_pow / zunko_zunda_pow_max) * zunp_bar_base.width;
    		
    		if (cut_in_no == 4) {	//ずんだイートなら
	    		//HP回復
	    		zunko_hp+=zunko_atk_pow;
	    		//HPバー回復
	    		hp_bar.width = (zunko_hp / zunko_hp_max) * hp_bar_base.width;

    			message.text = "ずん子のHPが<br>" + zunko_atk_pow + "回復した！";
    		}
    		else {
    			ene_damage_flag = true;
    			ene_hp-=zunko_atk_pow;
    			if (ene_hp < 0) ene_hp = 0;
	    		message.text = "モンスターに<br>" + zunko_atk_pow + "のダメージ！";
    		}
    		
			//▼カーソル表示
			wait_cursor.visible = true;
			//画面のどこかをタッチしたら発生するイベント
    		if (ene_hp <= 0) {
    			//敵を倒した！
	        	game.rootScene.addEventListener("touchend",BattleWin);
    		}
    		else {
	        	game.rootScene.addEventListener("touchend",EnemyAttack);
    		}
    	};
    	
    	//***** 敵の攻撃 *****
    	var EnemyAttack = function() {
			//画面タップイベントのクリア
	        game.rootScene.clearEventListener("touchend");

    		message.text = "モンスターの攻撃！";

			//画面のどこかをタッチしたら発生するイベント
        	game.rootScene.addEventListener("touchend",EnemyAttack2);
    	};
    	//敵の攻撃2
    	var EnemyAttack2 = function() {
			//画面タップイベントのクリア
	        game.rootScene.clearEventListener("touchend");

    		zunko_damage_flag = true;	//ずん子ダメージ演出

    		//敵攻撃値設定
    		ene_atk_pow = rand(3) + 1;	//1～3
    		
    		//HP減少
    		zunko_hp-=ene_atk_pow;
    		if (zunko_hp < 0) zunko_hp = 0;
    		//HPバー減少
    		hp_bar.width = (zunko_hp / zunko_hp_max) * hp_bar_base.width;
    		
    		message.text = message.text + "<br>ずん子は" + ene_atk_pow + "のダメージ！";

			//画面のどこかをタッチしたら発生するイベント
    		if (zunko_hp <= 0) {
    			//ゲームオーバー！
	        	game.rootScene.addEventListener("touchend",GameOver);
    		}
    		else {
	        	game.rootScene.addEventListener("touchend",ZundaAttackButtonSet);
    		}
    	};
    	
    	//***** 戦闘勝利 *****
    	var BattleWin = function() {
    		//画面タップイベントのクリア
	        game.rootScene.clearEventListener("touchend");

    		ene_img.visible = false;	//モンスター非表示
    		message.text = "モンスターを倒した！";
			
        	game.rootScene.addEventListener("touchend",ZundaCookButtonSet);
    	};
    	
    	//***** 料理ボタン表示 *****
    	var ZundaCookButtonSet = function() {
			//▼カーソル非表示
			wait_cursor.visible = false;

    		//画面タップイベントのクリア
	        game.rootScene.clearEventListener("touchend");

    		message.text = "モンスターをどう料理する？";
			
			//1つ目のボタンを設定
			btn1_type = rand(4);	//0～3
			switch (btn1_type) {
				case 0:
					zun_btn_cook1.image = game.assets[ZUN_BTN_COOK1_IMAGE];
					break;
				case 1:
					zun_btn_cook1.image = game.assets[ZUN_BTN_COOK2_IMAGE];
					break;
				case 2:
					zun_btn_cook1.image = game.assets[ZUN_BTN_COOK3_IMAGE];
					break;
				case 3:
					zun_btn_cook1.image = game.assets[ZUN_BTN_COOK4_IMAGE];
					break;
				default:
					zun_btn_cook1.message = "ずん子<br>「エラーだよ！」";
					break;
			}
			//2つ目のボタンを設定
			btn2_type = rand(4);	//0～3
			while (btn1_type == btn2_type) {
				btn2_type = rand(4);
			}
			switch (btn2_type) {
				case 0:
					zun_btn_cook2.image = game.assets[ZUN_BTN_COOK1_IMAGE];
					break;
				case 1:
					zun_btn_cook2.image = game.assets[ZUN_BTN_COOK2_IMAGE];
					break;
				case 2:
					zun_btn_cook2.image = game.assets[ZUN_BTN_COOK3_IMAGE];
					break;
				case 3:
					zun_btn_cook2.image = game.assets[ZUN_BTN_COOK4_IMAGE];
					break;
				default:
					zun_btn_cook2.message = "ずん子<br>「エラーだよ！」";
					break;
			}
			//料理ボタン表示
			ZunCookBtnVisibleOn();
			
			zun_btn_cook1.visible = true;		//表示

    		
			//自身をイベントリスナから削除
			game.rootScene.clearEventListener("touchend");
    	};

    	
    	//***** 次のステージへ *****
    	var NextStage = function() {
			//自身をイベントリスナから削除
			game.rootScene.clearEventListener("touchend");

			//ずん子もぐもぐCG非表示
			zunda_eat_img.visible = false;
			//ずん子顔CG表示
			chara_img.visible = true;
    		
    		message.text = "ずん子は<br>次のステージへと進んだ…";
    		
			//画面のどこかをタッチしたら発生するイベント
        	game.rootScene.addEventListener("touchend",NextStage2);
    	};
    	var NextStage2 = function() {
			//自身をイベントリスナから削除
			game.rootScene.clearEventListener("touchend");
			
			//ステージ番号・ステージ表記更新
			stage_no++;
			stage_name.text = SetStageText();
    		
    		//敵再セット
    		ene_img.visible = true;
    		ene_hp_max++;
			ene_hp = ene_hp_max;		//敵HP
    		
			message.text = "【ずん子】 Lv 1 / HP " + zunko_hp + "<br>モンスターがあらわれた！";
    		
			//画面のどこかをタッチしたら発生するイベント
        	game.rootScene.addEventListener("touchend",ZundaAttackButtonSet);
    	};
    	
    	var GameOver = function() {
			//▼カーソル非表示
			wait_cursor.visible = false;

			//画面タップイベントのクリア
	        game.rootScene.clearEventListener("touchend");

    		message.color = "#ff0000";
    		message.text = "ずん子は力尽きた…<br>***** GAME OVER *****";
    	};
    };

    game.start();
};

//ステージ番号、ステージ名のセット
function SetStageText() {
	var stage_str = "St" + stage_no + " ";

	switch (stage_no) {
		case 1:
			stage_str+="栗原市";
			break;
		case 2:
			stage_str+="登米市";
			break;
		case 3:
			stage_str+="気仙沼市";
			break;
		case 4:
			stage_str+="南三陸町";
			break;
		case 5:
			stage_str+="石巻市";
			break;
		case 6:
			stage_str+="女川町";
			break;
		case 7:
			stage_str+="涌谷町";
			break;
		case 8:
			stage_str+="美里町";
			break;
		case 9:
			stage_str+="大崎市";
			break;
		case 10:
			stage_str+="加美町";
			break;
		case 11:
			stage_str+="色麻町";
			break;
		case 12:
			stage_str+="大衡村";
			break;
		case 13:
			stage_str+="大和町";
			break;
		case 14:
			stage_str+="大郷町";
			break;
		case 15:
			stage_str+="松島町";
			break;
		case 16:
			stage_str+="東松島市";
			break;
		case 17:
			stage_str+="塩竃市";
			break;
		case 18:
			stage_str+="利府町";
			break;
		case 19:
			stage_str+="富谷町";
			break;
		case 20:
			stage_str+="仙台市";
			break;
		case 21:
			stage_str+="多賀城市";
			break;
		case 22:
			stage_str+="七ヶ浜町";
			break;
		case 23:
			stage_str+="名取市";
			break;
		case 24:
			stage_str+="岩沼市";
			break;
		case 25:
			stage_str+="柴田町";
			break;
		case 26:
			stage_str+="村田町";
			break;
		case 27:
			stage_str+="川崎町";
			break;
		case 28:
			stage_str+="蔵王町";
			break;
		case 29:
			stage_str+="大河原町";
			break;
		case 30:
			stage_str+="角田市";
			break;
		case 31:
			stage_str+="亘理町";
			break;
		case 32:
			stage_str+="山元町";
			break;
		case 33:
			stage_str+="丸森町";
			break;
		case 34:
			stage_str+="白石市";
			break;
		case 35:
			stage_str+="七ヶ宿町";
			break;
		default:
			stage_str+="NO DATA";
			break;
	}
	
	return stage_str;
};

//ずん子攻撃値セット
function ZunkoAtkPowSet(btn_type) {
	//zunko_atk_pow = (btn1_type + 1) + zunko_str + rand(2);		//ずん子攻撃値
	var ret_pow = 0;
	switch(btn_type) {
		case 0:		//プチずんだアロー
			zunda_use_pow = 1;
			ret_pow = 1 + zunko_str + rand(2);
			break;
		case 1:		//大粒ずんだアロー
			zunda_use_pow = 2;
			ret_pow = 2 + zunko_str + rand(2);
			break;
		case 2:		//こし餡ずんだアロー
			zunda_use_pow = 4;
			ret_pow = 4 + zunko_str + rand(2);
			break;
		case 3:		//極上ずんだアロー
			zunda_use_pow = 8;
			ret_pow = 8 + zunko_str + rand(2);
			break;
		case 4:		//ずんだイート
			zunda_use_pow = 2;	//ずんだイートは2消費
			ret_pow = Math.floor(zunko_hp_max / 2) + rand(2);
			break;
		default:
    		message.text = "エラーだよ";
			break;
	}
	return ret_pow;
};

//乱数の生成
function rand(num) {
    return Math.floor(Math.random() * num);
};
