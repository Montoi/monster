function getRandomValue(min, max){
    return   Math.floor( Math.random() * (max - min)) + min;
}



const app = Vue.createApp({
  data() {
    return {
        playerHealth: 100,
        monsterHealth: 100,
        currentRound: 0,
        winner: null,
        logMessages: []
    };
  },
  watch:{
    playerHealth(value){
        if (value <= 0 && this.monsterHealth <=0) {
            this.winner = 'draw'
        } else if(value <= 0){
            this.winner = 'monster'

        }
    },
    monsterHealth(value){
        if (value <= 0 && this.playerHealth <= 0) {
            this.winner = 'draw'
        } else if (value <= 0) {
            this.winner = 'player'
        }
    }
  },
  methods: {
    attackMonster(){
        this.currentRound++;
        const attackValue = getRandomValue(5,12);
        this.monsterHealth -= attackValue;
        this.attackPlayer();
        this.addLogMessage('Player', 'attack', attackValue);

    },
    attackPlayer(){
        const attackValue = getRandomValue(8,15);
        this.playerHealth -= attackValue;
        this.addLogMessage('Monster', 'attack', attackValue);

    },
    specialAttackMonster(){
        this.currentRound++;
        const attackValue = getRandomValue(10,25);
        this.monsterHealth -= attackValue;
        this.addLogMessage('Player', 'special-attack', attackValue);
        this.attackPlayer();
    },
    healPlayer(){
        this.currentRound++;
        const healValue = getRandomValue(8,20);
        if (this.playerHealth + healValue > 100) {
            this.playerHealth = 100;
        }
        else{
            this.playerHealth += healValue;
        }
        this.addLogMessage('Player', 'heal', healValue);
        this.attackPlayer();
    },
    startGame(){
        this.logMessages = [];
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.winner = null;
        this.currentRound = 0;
    },
    surrender(){
        this.winner = "monster";
    },
    addLogMessage(who,what,value){
        this.logMessages.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value
        });
    }
},
  computed: {
    monsterBarStyles(){
        if (this.monsterHealth < 0) {
            return {width: '0%'};
        }
        return {width: this.monsterHealth + '%'};
    },
    playerBarStyles(){
        if (this.playerHealth < 0) {
            return {width: '0%'}
        }
        return {width: this.playerHealth + '%'};
    },
    mayUseSpecialAttack(){
        return this.currentRound % 3 !== 0;
    }
  },
});

app.mount("#game");
