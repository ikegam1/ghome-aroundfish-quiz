'use strict';
 
const functions = require('firebase-functions');
const { dialogflow, SimpleResponse } = require('actions-on-google');

//mp3
const drumrole_mp3 = "https://s3-ap-northeast-1.amazonaws.com/xxxxxxxx/quiz/drum-japanese2.mp3";
const question_mp3 = "https://s3-ap-northeast-1.amazonaws.com/xxxxxxxx/quiz/question1.mp3";
const correct_mp3 = "https://s3-ap-northeast-1.amazonaws.com/xxxxxxxx/quiz/correct2.mp3";
const incorrect_mp3 = "https://s3-ap-northeast-1.amazonaws.com/xxxxxxxx/quiz/incorrect1.mp3";

const app = dialogflow({ debug: true });

const Quizzes = {
    "鯵": { "q": "魚へんに<emphasis level='moderate'><sub alias='参上のさん'>参</sub></emphasis>を書いて何という魚？", "a": "あじ" }, 
    "鯨": { "q": "魚へんに<emphasis level='moderate'><sub alias='京都のきょう'>京</sub></emphasis>を書いて何という魚？", "a": "くじら" }, 
    "鯱": { "q": "魚へんに<emphasis level='moderate'><sub alias='とら'>虎</sub></emphasis>を書いて何という魚？", "a": "しゃち" }, 
    "鯰": { "q": "魚へんに<emphasis level='moderate'><sub alias='念仏のねん'>念</sub></emphasis>を書いて何という魚？", "a": "なまず" }, 
    "鯖": { "q": "魚へんに<emphasis level='moderate'><sub alias='あおの旧字体'>青の旧字体</sub></emphasis>を書いて何という魚？", "a": "さば" }, 
    "鯉": { "q": "魚へんに<emphasis level='moderate'><sub alias='さと'>里</sub></emphasis>を書いて何という魚？", "a": "こい" }, 
    "鯛": { "q": "魚へんに<emphasis level='moderate'><sub alias='一周のしゅう'>周</sub></emphasis>を書いて何という魚？", "a": "たい" }, 
    "鮑": { "q": "魚へんに<emphasis level='moderate'><sub alias='包む'>包</sub></emphasis>を書いて何という魚？", "a": "あわび" }, 
    "鮎": { "q": "魚へんに<emphasis level='moderate'><sub alias='占いのせん'>占</sub></emphasis>を書いて何という魚？", "a": "あゆ" }, 
    "鮭": { "q": "魚へんに<emphasis level='moderate'><sub alias='本田圭佑のけい'>圭</sub></emphasis>を書いて何という魚？", "a": "さけ" }, 
    "鮫": { "q": "魚へんに<emphasis level='moderate'><sub alias='交わるのこう'>交</sub></emphasis>を書いて何という魚？", "a": "さめ" }, 
    "鮪": { "q": "魚へんに<emphasis level='moderate'><sub alias='有無のゆう'>有</sub></emphasis>を書いて何という魚？", "a": "まぐろ" }, 
    "鱈": { "q": "魚へんに<emphasis level='moderate'><sub alias='ゆき'>雪</sub></emphasis>を書いて何という魚？", "a": "たら" }, 
    "鱚": { "q": "魚へんに<emphasis level='moderate'><sub alias='喜ぶのき'>喜</sub></emphasis>を書いて何という魚？", "a": "きす" }, 
    "鱒": { "q": "魚へんに<emphasis level='moderate'><sub alias='尊敬のけいの旧字体'>尊の旧字体</sub></emphasis>を書いて何という魚？", "a": "ます" }, 
    "鮃": { "q": "魚へんに<emphasis level='moderate'><sub alias='たいらのへい'>平</sub></emphasis>を書いて何という魚？", "a": "ひらめ" }, 
    "鮒": { "q": "魚へんに<emphasis level='moderate'><sub alias='付属のふ'>付</sub></emphasis>を書いて何という魚？", "a": "ふな" }, 
    "鰯": { "q": "魚へんに<emphasis level='moderate'><sub alias='弱い'>弱</sub></emphasis>を書いて何という魚？", "a": "いわし" }, 
    "鰻": { "q": "魚へんに<emphasis level='moderate'><sub alias='曼荼羅のまん'>曼</sub></emphasis>を書いて何という魚？", "a": "うなぎ" }, 
    "鰹": { "q": "魚へんに<emphasis level='moderate'><sub alias='堅気の堅い'>堅</sub></emphasis>を書いて何という魚？", "a": "かつお" }, 
    "鰤": { "q": "魚へんに<emphasis level='moderate'><sub alias='師匠のし'>師</sub></emphasis>を書いて何という魚？", "a": "ぶり" }, 
    "鰐": { "q": "魚へんに<emphasis level='moderate'><sub alias='あごの左側'>顎の左側</sub></emphasis>を書いて何という魚？", "a": "わに" }, 
    "鰆": { "q": "魚へんに<emphasis level='moderate'><sub alias='はる'>春</sub></emphasis>を書いて何という魚？", "a": "さわら" }, 
    "鰍": { "q": "魚へんに<emphasis level='moderate'><sub alias='あき'>秋</sub></emphasis>を書いて何という魚？", "a": "かじか" }, 
    "鮗": { "q": "魚へんに<emphasis level='moderate'><sub alias='ふゆ'>冬</sub></emphasis>を書いて何という魚？", "a": "このしろ" }, 
    "鱧": { "q": "魚へんに<emphasis level='moderate'><sub alias='ゆたか'>豊</sub></emphasis>を書いて何という魚？", "a": "はも" }, 
    "鯣": { "q": "魚へんに<emphasis level='moderate'><sub alias='貿易のえき'>易</sub></emphasis>を書いて何という魚？", "a": "するめ" }, 
    "鮴": { "q": "魚へんに<emphasis level='moderate'><sub alias='休暇のきゅう'>休</sub></emphasis>を書いて何という魚？", "a": "ごり" }, 
    "鮹": { "q": "魚へんに<emphasis level='moderate'><sub alias='不肖のしょう'>肖</sub></emphasis>を書いて何という魚？", "a": "たこ" }, 
    "鮠": { "q": "魚へんに<emphasis level='moderate'><sub alias='危険のき'>危</sub></emphasis>を書いて何という魚？", "a": "はや" }, 
    "鰰": { "q": "魚へんに<emphasis level='moderate'><sub alias='かみの旧字体'>神の旧字体</sub></emphasis>を書いて何という魚？", "a": "はたはた" }, 
    "鰕": { "q": "魚へんに<emphasis level='moderate'><sub alias='ひまの右側の部位'>暇の右側</sub></emphasis>を書いて何という魚？", "a": "えび" }, 
    "鰌": { "q": "魚へんに<emphasis level='moderate'><sub alias='酋長のしゅう'>酋</sub></emphasis>を書いて何という魚？", "a": "どじょう" },  
    "鱠": { "q": "魚へんに<emphasis level='moderate'><sub alias='会議の会の旧字体'>会の旧字体</sub></emphasis>を書いて何という魚？", "a": "なます" }, 
    "鯆": { "q": "魚へんに<emphasis level='moderate'><sub alias='浦賀のうら'>浦の右側</sub></emphasis>を書いて何という魚？", "a": "いるか" }, 
    "鯑": { "q": "魚へんに<emphasis level='moderate'><sub alias='希望のき'>希</sub></emphasis>を書いて何という魚？", "a": "かずのこ" }, 
    "鱵": { "q": "魚へんに<emphasis level='moderate'><sub alias='箴言のしん'>箴</sub></emphasis>を書いて何という魚？", "a": "さより" }, 
    "鱶": { "q": "魚へんに<emphasis level='moderate'><sub alias='養分のよう'>養</sub></emphasis>を書いて何という？", "a": "ふか" }, 
    "鮍": { "q": "魚へんに<emphasis level='moderate'><sub alias='皮膚のかわ'>皮</sub></emphasis>を書いて何という魚？", "a": "かわはぎ" }, 
    "鯏": { "q": "魚へんに<emphasis level='moderate'><sub alias='利益のり'>利</sub></emphasis>を書いて何という魚？", "a": "あさり" }, 
    "鯎": { "q": "魚へんに<emphasis level='moderate'><sub alias='成人のせい'>成</sub></emphasis>を書いて何という魚？", "a": "うぐい" }, 
    "鯢": { "q": "魚へんに<emphasis level='moderate'><sub alias='児童のじの旧字体'>睨の右側</sub></emphasis>を書いて何という魚？", "a": "さんしょううお" }, 
    "鯳": { "q": "魚へんに<emphasis level='moderate'><sub alias='そこ'>底</sub></emphasis>を書いて何という魚？", "a": "すけとうだら" }, 
    "鯧": { "q": "魚へんに<emphasis level='moderate'><sub alias='繁昌のじょう'>昌</sub></emphasis>を書いて何という魚？", "a": "まながつお" }, 
    "鯥": { "q": "魚へんに<emphasis level='moderate'><sub alias='りくの右側の部首'>陸の右側</sub></emphasis>を書いて何という魚？", "a": "むつ" }, 
    "魦": { "q": "魚へんに<emphasis level='moderate'><sub alias='少ない'>少</sub></emphasis>を書いて何という魚？", "a": "いさざ" },  
    "鰡": { "q": "魚へんに<emphasis level='moderate'><sub alias='留守のる'>留</sub></emphasis>を書いて何という魚？", "a": "ぼら" }, 
    "鯇": { "q": "魚へんに<emphasis level='moderate'><sub alias='完結のかん'>完</sub></emphasis>を書いて何という魚？", "a": "あめのうお" }, 
    "鮇": { "q": "魚へんに<emphasis level='moderate'><sub alias='未完成のみ'>未</sub></emphasis>を書いて何という魚？", "a": "いわな" }, 
    "鰉": { "q": "魚へんに<emphasis level='moderate'><sub alias='始皇帝のこう'>皇</sub></emphasis>を書いて何という魚？", "a": "ひがい" }, 
    "鱪": { "q": "魚へんに<emphasis level='moderate'><sub alias='猛暑のしょ'>暑</sub></emphasis>を書いて何という魚？", "a": "しいら" }, 
    "鮐": { "q": "魚へんに<emphasis level='moderate'><sub alias='台車のだい'>台</sub></emphasis>を書いて何という魚？", "a": "ふぐ" }, 
    "鱫": { "q": "魚へんに<emphasis level='moderate'><sub alias='あい'>愛</sub></emphasis>を書いて何という魚？", "a": "むつ" }, 
    "鰙": { "q": "魚へんに<emphasis level='moderate'><sub alias='若い'>若</sub></emphasis>を書いて何という魚？", "a": "わかさぎ" }
};
var quizzes = Object.assign({}, Quizzes);

app.intent('QuizIntent', (conv) => {
  　console.log(quizzes);

    if (Object.keys(quizzes).length < 1){
      conv.close("あれ？もう出す問題がなくなっちゃいました。ごめんなさい。またやってね！");
      return true;
    }
    
    //quizを選択
    let keys = Object.keys(quizzes);
    let choice = Math.floor( Math.random() * keys.length);
    let q = quizzes[keys[choice]];
    q.k = keys[choice];
    //set data
    conv.data.current = q;
    conv.ask(new SimpleResponse({
      text: q.q,
      speech: `<speak><audio src="${question_mp3}" />${q.q}</speak>`
    }));
});

app.intent('AnswerIntent', (conv, params) => {
    let q = conv.data.current;
    let collect = false;
    console.log(conv.input.raw);
    if (conv.parameters.answers !== ''){
      console.log(`answers is ${conv.parameters.answers}`);
      if (conv.parameters.answers == q.k){
        collect = true;
      }
    }
    if (conv.parameters.any !== ''){
      console.log(`answers is ${conv.parameters.any}`);
    }
    
    let prize = [
      "すごい!","素晴らしい!","アメージング!","天才!","この、イケメン!"   
    ];
    let p = prize[Math.floor( Math.random() * prize.length)];
    if (collect){
      conv.ask(new SimpleResponse({
        text: `正解！答えは、${q.a}でした。${p}。次の問題もやりますか？はい、かいいえで答えてね。`,
        speech: 
          `<speak><audio src="${drumrole_mp3}" /><audio src="${correct_mp3}" />
           <prosody rate="110%" pitch="+10%">正解!</prosody><break time="500ms"/>
           答えは、、${q.a}でした。<break time="200ms"/>
           <prosody rate="110%" pitch="+10%">${p}</prosody>
           次の問題もやりますか？<break time="500ms"/>
           はい、かいいえで答えてね。</speak>`
       }));
    }else{
      conv.ask(new SimpleResponse({
        text: `残念！答えは、${q.a}でした。次の問題もやりますか？はい、かいいえで答えてね。`,
        speech: 
          `<speak><audio src="${drumrole_mp3}" /><audio src="${incorrect_mp3}" />
           <prosody rate="105%" pitch="+5%">残念!</prosody><break time="500ms"/>
           答えは、、${q.a}でした。
           次の問題もやりますか？<break time="500ms"/>
           はい、かいいえで答えてね。</speak>`
       }));
    }
    //今の問題は使用済みに
    delete quizzes[q.k];
    //clear context
    conv.data.current = {};
});
  
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

