// prettier-ignore
/*********************************** API *************************************/
function API(t="untitled",i=!1){return new class{constructor(t,i){this.name=t,this.debug=i,this.isQX="undefined"!=typeof $task,this.isLoon="undefined"!=typeof $loon,this.isSurge="undefined"!=typeof $httpClient&&!this.isLoon,this.isNode="function"==typeof require,this.node=(()=>this.isNode?{request:require("request"),fs:require("fs")}:null)(),this.cache=this.initCache(),this.log(`INITIAL CACHE:\n${JSON.stringify(this.cache)}`),Promise.prototype.delay=function(t){return this.then(function(i){return((t,i)=>new Promise(function(e){setTimeout(e.bind(null,i),t)}))(t,i)})}}get(t){return this.isQX?("string"==typeof t&&(t={url:t,method:"GET"}),$task.fetch(t)):this.isLoon||this.isSurge?$httpClient.get(t):this.isNode?new Promise((i,e)=>{this.node.request(t,(t,s)=>{t?e(t):i(s)})}):void 0}post(t){return this.isQX?$task.fetch(t):this.isLoon||this.isSurge?$httpClient.post(t):this.isNode?new Promise((i,e)=>{this.node.request.post(t,(t,s)=>{t?e(t):i(s)})}):void 0}initCache(){if(this.isQX)return $prefs.valueForKey(this.name)||{};if(this.isLoon||this.isSurge)return $persistanceStore.read(this.name)||{};if(this.isNode){const t=`${this.name}.json`;return this.node.fs.existsSync(t)?JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(t,JSON.stringify({}),{flag:"wx"},t=>console.log(t)),{})}}persistCache(){const t=this.cache;this.isQX&&$prefs.setValueForKey(t,this.name),this.isSurge&&$persistanceStore.write(t,this.name),this.isNode&&this.node.fs.writeFileSync(`${this.name}.json`,JSON.stringify(t),{flag:"w"},t=>console.log(t))}write(t,i){this.log(`SET ${i} = ${t}`),this.cache={...this.cache,[i]:t}}read(t){return this.log(`READ ${t}`),this.cache[t]}delete(t){this.log(`DELETE ${t}`),this.write(void 0,t)}notify(t,i,e,s){const o="string"==typeof s?s:void 0,n=e+(null==o?"":`\n${o}`);this.isQX&&(void 0!==o?$notify(t,i,e,{"open-url":o}):$notify(t,i,e,s)),this.isSurge&&$notification.post(t,i,n),this.isLoon&&$notification.post(t,i,e,o),this.isNode&&console.log(`${t}\n${i}\n${n}`)}log(t){(this.debug=!0)&&console.log(t)}info(t){console.log(t)}error(t){this.log("ERROR: "+t)}wait(t){return new Promise(i=>setTimeout(i,t))}done(t={}){this.persistCache(),this.isQX&&$done(t),(this.isLoon||this.isSurge)&&$done(t)}formatTime(t){const i=new Date(t);return`${i.getFullYear()}年${i.getMonth()+1}月${i.getDate()}日${i.getHours()}时`}}(t,i)}
/*****************************************************************************/