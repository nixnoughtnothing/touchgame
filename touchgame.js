/*
* touchgame.js : 無名関数で全体をまとめる
*/
(function(){
        
        var size = 3;
        var currentNum; // 次に押すべきボタンを管理する変数
        var timer;      // タイマー用の変数
        var startTime;  // startボタンを押した時間を格納する変数
        var isPlaying = false; //falseの状態だとスタートボタンの2度押しでのイベント発生を防げる。


        /**
        * スタートボタンが押されたら、timerStart()メソッドを発動
        */
        document.getElementById('timerStart').onclick = function(){
            timerStart();
        }

        /**
        * スタートボタンが押されたら、発動するメソッド
        */
        function timerStart(){

            if(!isPlaying){
                currentNum = 0; // 最初に押すべきボタンは「0」なので、「0」を代入する
                initBoard(); // initBoard()メソッドを発動する
                startTime = (new Date()).getTime(); // startボタンを押した時間を格納
                isPlaying = true;
                runTimer(); // rumTimerメソッドを発動する
            }
        }


        /**
        * ボタンを生成して返す
        * @param Number num
        * @return btn
        */
        function createButton(num){

            var btn;

            // inputタグの作成 →　createElement('param') paramで指定された要素を作成
            btn = document.createElement('input');
            // type: エレメントの種類を決める
            btn.type = 'button';
            // value:エレメントのvalueを決める.createButton()メソッドからparam:numを指定する
            btn.value = num;

            btn.onclick = function(){

                // 押されたボタンと押すべきボタンが一致しているかチェック
                if(this.value == currentNum){

                    // 一致すれば、①disabledにして、②currenNumを+1する。
                    this.disabled = true;
                    currentNum++;
                }

                // currentNumが size * sizeと＝になったら終了。
                if(currentNum == size * size){
                    clearTimeout(timer);
                    alert('Your Score:' + document.getElementById('time').innerHTML + '秒！');
                    isPlaying = false; // 再度スタートボタンを押してrunTimerメソッドを発動できるようにするため。
                }
            }

            // ボタンを返す <input type='button' value="0〜n" onclick="①currentNumと一致 OR ②全てのボタンを押し切ったら.イベント発生">
            return btn;
        }



        /**
        * size * sizeで指定した数字の数字をランダムに割り当てるメソッド
        */
        function initBoard(){

            var buttons = [];
            var board;
            var button;

            for(var i = 0; i < size * size; i++){

                // array.push(param): arrayの末尾に引数の要素を追加
                buttons.push(createButton(i));
            }

            board = document.getElementById('board');



            while(board.firstChild){
                board.removeChild(board.firstChild);
            }




            // ループ:var buttonsの配列の要素がある限り。buttons配列に要素を103行目のbuttons.pushで追加している
            while(buttons.length){

                // splice(取り出し開始要素番号,取り出す要素数)
                button = buttons.splice(Math.floor(Math.random() * buttons.length),1);


                //board + button[0] : appendChild(obj)　→ ノードの末尾にオブジェクトを追加 
                board.appendChild(button[0]);


                // if:ボタンの要素数がsizeで割り切れるなら。
                if(buttons.length % size == 0){

                    // board + <br> e.g-> 2 * 2 =2/  3 * 3 = 3 
                    board.appendChild(document.createElement('br'));
                }
            }


            /*
            var nums = [0,1,2,3,4,5,6,7,8,];
            var num;
            var btn;

            for (var i = 0; i < 9; i++){

                // splice(取り出し開始要素番号,取り出す要素数)
                num = nums.splice(Math.floor(Math.random() * nums.length),1);

                
                btn = document.getElementById('button' + i)

                // ?:なぜnum[0]なのか。
                btn.value = num[0];

                // [2回目のチャレンジ以降]各ボタンに数字を割り振ったら、同時にボタンのdisabledも解除する
                btn.disabled = false;
            }
            */
        }



        /**
        * タイマーを走らせるメソッド
        */
        function runTimer(){

            // スタートボタンを押した時刻からの経過秒数を小数点1位まで表示する
            document.getElementById('time').innerHTML = (((new Date()).getTime() - startTime) / 1000).toFixed(1);

            // 0.1秒後にこのメソッド(runTimer)自体を発動させる　→　つまり0.1秒毎にスタートボタンを押した時刻からの経過秒数が表示される。
            // 変数timerはclearTimeoutでセットするために使っておく。
            timer = setTimeout(function(){

                runTimer();

            },100);
        }


        /**
        * リセットボタンが押されたら、timerReset()メソッドを発動
        */
        document.getElementById('timerReset').onclick = function(){
            timerReset();
        }

        /**
        * resetメソッド
        */
        function timerReset(){

            clearTimeout(timer);
            isPlaying = false; // 再度スタートボタンを押してrunTimerメソッドを発動できるようにするため。

            // 0.00をid='time'のinnerHTMLに表示する。
            document.getElementById('time').innerHTML = '0.00';
        }


        /**
        * ボタンが押されたら、touchできないようにするメソッド
        * @param Number n
        */
        /*
        function touched(n){

            var btn = document.getElementById('button' + n); // 押されたボタンのIDを変数btnに代入する(e.g 0ボタンなら button0が代入される)

            // 押されたボタンと押すべきボタンが一致しているかチェック
            if(btn.value == currentNum){

                // 一致すれば、①disabledにして、②currenNumを+1する。
                btn.disabled = true;
                currentNum++;
            }

            if(currentNum == 9){
                clearTimeout(timer);
                alert('Your Score:' + document.getElementById('time').innerHTML + '秒！');
                isPlaying = false; // 再度スタートボタンを押してrunTimerメソッドを発動できるようにするため。
            }
        }
        */
}   ());

