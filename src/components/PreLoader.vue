<template>
<div class='fieldPreLoad' v-if="state !== 'ready'">
            <div  >
              <button @click.prevent="this.$emit('reload');" v-if="state == 'error'">
                Попробовать<br>еще раз
              </button>
              <div class="containerPreload" v-if="state == 'loading'">
                <div class="blockPreload"></div>
                <div class="blockPreload"></div>
                <div class="blockPreload"></div>
                <div class="blockPreload"></div>
              </div>
            </div>
</div>
</template>

<script>
export default {
  props: ['state'],
};
</script>

<style>
.fieldPreLoad {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  animation: showin 1s ease .0s 1;
}

@keyframes showin {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.containerPreload {
width: 50px;
height: 50px;
margin-left: auto;
margin-right: auto;
}

.blockPreload {
  position: relative;
  box-sizing: border-box;
  float: left;
  margin: 0 10px 10px 0;
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: #f90;
}

.blockPreload:nth-child(4n+1) { animation: wave 2s ease .0s infinite; }
.blockPreload:nth-child(4n+2) { animation: wave 2s ease .2s infinite; }
.blockPreload:nth-child(4n+3) { animation: wave 2s ease .4s infinite; }
.blockPreload:nth-child(4n+4) { animation: wave 2s ease .6s infinite; margin-right: 0; }

@keyframes wave {
  0%   { top: 0;     opacity: 1; }
  50%  { top: 30px;  opacity: .2; }
  100% { top: 0;     opacity: 1; }
}
</style>
