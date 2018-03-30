<template>
  <div class="wrap">
  <div class="output">{{output}}</div>
    <div class="checkerboard">
      <div class="lattice" v-for="(item, index) in checkerboard" :key="index"></div>
      <div class="pieces">
        <div v-for="(item, index) in pieces"  :key="index">
          <div class="piece" v-for="(pitem, pindex) in item" :key="pindex"
          :class="pitem==1? 'white':pitem==2? 'black':'' "
          @click="userChess(index, pindex)"
          ></div>
          <div style="clear:both;"></div>
        </div>
        <div style="clear:both;"></div>
      </div>
      <div style="clear:both;"></div>
    </div>
    <div class="btn-grounp">
      <a class="btn" @click="start" v-if="!isStart">开始游戏</a>
      <a class="btn" @click="reStart" v-if="isStart">重新开始</a>
      <a class="btn" @click="backMove">悔棋</a>
      <a class="btn" @click="playAgain">回放</a>
      <a class="btn" @click="getVersion">获取版本</a>
    </div>

  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState, mapMutations, mapActions } from 'vuex'
import jQuery from '../assets/js/jquery-1.8.0.js'

export default {
  name: 'HelloWorld',
  methods: {
    // injection mutations
    ...mapMutations([
      'getVersion', 'setPiece', 'backMove', 'start', 'reStart', 'playAgain'
    ]),
    // injection actions
    ...mapActions([
      'getVersionAction', 'setPieceAction'
    ]),
    userChess: function (x, y) {
      var data = {
        x, y
      }
      this.setPieceAction(data)
    }
  },
  store,
  computed: {
    ...mapState([
      'pieces', 'output', 'isStart'
    ])
  },
  data () {
    return {
      checkerboard: new Array(224)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('../assets/css/main.css');
.wrap{ max-width: 750px; margin: 0 auto; }
.checkerboard{ width: 308px; margin:0 auto 22px;}
.lattice{ float:left; width: 22px; height: 22px; border: 1px solid #333;  box-sizing:border-box; border-right:0; border-bottom: 0;}
.checkerboard{ border-right: 1px solid #333; border-bottom: 1px solid #333; position: relative;}
.pieces { position:absolute; top: 8px; left: 8px; }
.piece{ float:left; border-radius: 50%; width: 16px; height: 16px; margin-left: 0; margin-top:0; margin-left: 6px; margin-top: 6px; }

.black{ background: #000; }
.white{ background: #fff; border: 1px solid #ccc; box-sizing: border-box; }
.btn{ display: inline-block; width: 100px; line-height: 32px; background: rgb(24,183,135); border-radius: 4px; color: #fff; cursor: pointer; text-align: center;}
.btn:hover{ background:rgb(51,73,93);box-shadow: 0 0 10px rgb(24,183,135); transition: .5s all; user-select:none; }
.btn-grounp { }
.btn-grounp > .btn{ margin-top:12px; }
.output{ height: 32px; color: rgb(24,183,135); }
</style>
