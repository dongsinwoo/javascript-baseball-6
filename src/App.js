import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async play() {
    

    function random (){
      const computer = [];
      while (computer.length < 3) {
      const number = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!computer.includes(number)) {
        computer.push(number);
        }
      }

      return computer;
    }

    let computer = random();
    
    let startMsg = MissionUtils.Console.print(`숫자 야구 게임을 시작합니다. `)
    
    while(true){
      
      let msg =  MissionUtils.Console.print(`숫자를 입력해주세요 : `);
      let user = await MissionUtils.Console.readLineAsync("");
      if (user === undefined || user === null) {
        throw new Error("[ERROR]");
      }
      let userNumber = user== undefined ? [] : user.split("");
      let hasDuplicate = userNumber.some((num, index) => userNumber.indexOf(num) !== index);
      
      
     
      if(hasDuplicate || userNumber.length != 3 || !/^\d+$/.test(user)){
        throw new Error("[ERROR]");;
      }

      if(
        computer[0] == userNumber[0] &&
        computer[1] == userNumber[1] &&
        computer[2] == userNumber[2] 
        ){
          MissionUtils.Console.print("3스트라이크");
          MissionUtils.Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
          MissionUtils.Console.print("게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.");
          let rePlay = await MissionUtils.Console.readLineAsync("");
          if (rePlay === undefined || rePlay === null) {
            throw new Error("[ERROR]");;
          }
          if(rePlay == 1){
            computer = random();
            userNumber = [];
            continue;
          }
          else if(rePlay == 2){
            MissionUtils.Console.print("게임 종료");
            return false
          }else{
            throw new Error("[ERROR]");;
          }
        }else{

          function bass (com,user){
            let strike = 0;
            let ball = 0;
        
            const comCount = {};
            const userCount = {};
          
            for (let i = 0; i < com.length; i++) {
              if (com[i] == user[i]) {
                strike += 1;
              } else {
                comCount[com[i]] = (comCount[com[i]] || 0) + 1;
                userCount[user[i]] = (userCount[user[i]] || 0) + 1;
              }
            }
          
            for (const num in userCount) {
              if (comCount[num]) {
                ball += Math.min(comCount[num], userCount[num]);
              }
            }
            let strikeStr = strike == 0 ? "" : `${strike}스트라이크`;
            let ballStr = ball == 0 ? "" : `${ball}볼 ` ;
            let passStr = ball == 0 && strike == 0 ? "낫싱" : "";
            
            MissionUtils.Console.print(ballStr + strikeStr + passStr);
          }

          bass(computer,userNumber);

        }
    }
     
  }
}

const app = new App();
app.play();

export default App;
