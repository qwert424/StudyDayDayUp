<template>
  <div class="container">
    <div class="block">
      <h2>区域1</h2>
      <p>
        <button @click="handleChangeMask">关闭蒙层</button>
      </p>
      <Teleport to="body">
        <MaskComponent v-show="ifshowMask">
          <button @click="ifshowMask = false">关闭蒙层</button></MaskComponent
        >
      </Teleport>
    </div>

    <div class="block mid">
      <h2>区域2</h2>
    </div>
    <div class="block big"><zoneThree /></div>
    <div class="block big"><h2>区域4</h2></div>
    <div class="block mid"><zoneOther /></div>
    <div class="block"><h2>区域6</h2></div>
  </div>
</template>

<script>
import { ref } from "vue";
import { asyncComponent } from "../../util/index";
import MaskComponent from "../../components/MaskComponent/index.vue";
const zoneThree = asyncComponent("../components/zoneThree/index.vue");
const zoneOther = asyncComponent("../components/zoneOther/index.vue");
export default {
  components: {
    zoneThree,
    zoneOther,
    MaskComponent,
  },
  setup() {
    let ifshowMaskRef = ref(false);
    const handleChangeMask = () => {
      ifshowMaskRef.value = true;
    };
    return {
      handleChangeMask,
      ifshowMask: ifshowMaskRef,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  flex-wrap: wrap;
  padding: 0 50px;
  justify-content: space-between;
}
.block {
  width: 200px;
  margin: 15px;
  height: 250px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mid {
  width: 300px;
}
.big {
  width: 400px;
}
</style>