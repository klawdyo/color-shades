<template>
  <div>
    {{ color }} <br />
    {{ hexToHsl(color) }} <br />
    {{ hexToRgb(color) }} <br />
    <ul style="display: flex; gap: 4px ; flex-wrap: wrap; list-style:none;">
      <li v-for="item in colors" :style="`width:80px;height:48px; border-radius:8px; display:flex;  align-items: end;
      justify-content: center; padding:4px; 
        background: ${rgbToHex(hslToRgb(item))};`">
        <!-- {{ item }} -->
        <span :style="`color:${item.lightness < 50 ? 'white' : 'black'}`">
          {{ rgbToHex(hslToRgb(item), false) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue';
import { hexToHsl, hslToString, setLightness, hslToRgb, rgbToString, rgbToHex, hexToRgb } from './use-hsl';


const props = defineProps<{
  color: string;
}>()

// const colors = computed(() => useColor(props.color))

const colors = computed(() => {
  const color = hexToHsl(props.color)
  const pirocas = meupa(color.lightness)
  return pirocas.map(item => {
    // const carai = JSON.stringify(JSON.stringify(color))
    // color.lightness = item
    return setLightness(color, item);
  })

})

/**
 * Gera as luminosidades antes e depois
 */
function meupa(num: number) {
  const min = <number[]>[]
  for (let i = num; i >= 0; i -= 10) {
    min.push(i)
  }

  min.reverse()

  for (let i = num + 10; i <= 100; i += 10) {
    min.push(i)
  }

  return min

}



</script>

<style scoped></style>