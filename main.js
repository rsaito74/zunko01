//***** 東北ずん子のモンスター討伐・宮城編（仮）
//***** 開発：斉藤リイチ
//***** 素材提供（敬称略）
//***** ・キャラクター素材：東北ずん子（http://zunko.jp/）
//***** ・背景素材：ぴぽや（http://piposozai.blog76.fc2.com/）
//***** ・モンスター素材：【Rド】（http://www.geocities.co.jp/Milano-Cat/3319/）

enchant();

//画像ファイル名の定数セット
var BG_IMAGE = "pipo_battlebg001.jpg";
var ZUNP_NP_IMAGE = "zunp_name.png";
var HP_NP_IMAGE = "hp_name.png";
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

    game.onload = function(){

        game.rootScene.backgroundColor = "#000000";

		var bg_img = new Sprite(320,320);
		bg_img.image = game.assets[BG_IMAGE];
		game.rootScene.addChild(bg_img);

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
			
			if (btn1_type == 4) {
				zunda_use_pow = 2;	//ずんだイートは2消費
			}
			else {
				zunda_use_pow = btn1_type + 1;
			}
			zunko_atk_pow = (btn1_type + 1) + zunko_str + rand(2);		//ずん子攻撃値
			
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
			
			if (btn2_type == 4) {
				zunda_use_pow = 2;	//ずんだイートは2消費
			}
			else {
				zunda_use_pow = btn2_type + 1;
			}
			zunko_atk_pow = (btn2_type + 1) + zunko_str + rand(2);		//ずん子攻撃値
			
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
					zun_btn_atk1.message = "ずん子<br>「一口ずんだアロー！」";
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
					zun_btn_atk1.message = "ずん子<br>「味噌ずんだアロー！」";
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
			switch (btn2_type) {
				case 0:
					zun_btn_atk2.image = game.assets[ZUN_BTN_ATK1_IMAGE];
					zun_btn_atk2.message = "ずん子<br>「一口ずんだアロー！」";
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
					zun_btn_atk2.message = "ずん子<br>「味噌ずんだアロー！」";
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
        	game.rootScene.addEventListener("touchend",NextStage0);
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
			game.rootScene.addEventListener("touchend",NextStage0);
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
    	
    	//***** ずん子の攻撃（カットイン演出後） *****
    	var ZunkoAttack = function() {
			//ずんだPow減少
    		zunko_zunda_pow-=zunda_use_pow;
			zunp_bar.width = (zunko_zunda_pow / zunko_zunda_pow_max) * zunp_bar_base.width;
    		
    		if (cut_in_no == 4) {	//ずんだイートなら
	    		//HP回復
    			//zunko_atk_pow = zunko_atk_pow * 2;
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
    	var NextStage0 = function() {
			//自身をイベントリスナから削除
			game.rootScene.clearEventListener("touchend");
    		
			//画面のどこかをタッチしたら発生するイベント
        	game.rootScene.addEventListener("touchend",NextStage);
    	};
    	var NextStage = function() {
			//自身をイベントリスナから削除
			game.rootScene.clearEventListener("touchend");
    		
    		message.text = "ずん子は次のステージへと進んだ…";
    		
			//画面のどこかをタッチしたら発生するイベント
        	game.rootScene.addEventListener("touchend",NextStage2);
    	};
    	var NextStage2 = function() {
			//自身をイベントリスナから削除
			game.rootScene.clearEventListener("touchend");
    		
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

//乱数の生成
function rand(num) {
    return Math.floor(Math.random() * num);
};
