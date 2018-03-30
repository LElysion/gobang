<template>
  <div class="wrap">
    <div class="checkerboard">
      <div class="lattice" v-for="item in checkerboard"></div>
      <div class="pieces">
        <div class="piece" v-for="item in pieces"></div>
        <div style="clear:both;"></div>
      </div>
      <div style="clear:both;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      checkerboard: new Array(224),
      pieces: new Array(195)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{ max-width: 750px; margin: 0 auto; }
.checkerboard{ width: 308px; margin:0 auto;}
.lattice{ float:left; width: 22px; height: 22px; border: 1px solid #333;  box-sizing:border-box; border-right:0; border-bottom: 0;}
.checkerboard{ border-right: 1px solid #333; border-bottom: 1px solid #333; position: relative;}
.pieces { position:absolute; top: 8px; left: 8px; }
.piece{ float:left; border-radius: 50%; width: 16px; height: 16px; margin-left: 0; margin-top:0; margin-left: 6px; margin-top: 6px; }

.black{ background: #000; }
.white{ background: #fff; border: 1px solid #ccc; box-sizing: border-box; }
</style>
