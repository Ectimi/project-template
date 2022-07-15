 <template>
    <div class="ScaleBox" ref="ScaleBox" :style="{
        width: width + 'px',
        height: height + 'px',
    }">
        <slot></slot>
    </div>
</template>
 
<script lang="ts" setup>
import { defineProps, onMounted, onUnmounted, ref, toRefs } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps({
    width: {
        type: Number,
        default: 1920
    },
    height: {
        type: Number,
        default: 1080
    }
})
const { width, height } = toRefs(props)
const scale = ref(0)
const ScaleBox = ref<HTMLElement | null>(null);
const getScale = () => {
    const wh = window.innerHeight / height.value;
    const ww = window.innerWidth / width.value;
    return ww < wh ? ww : wh;
}
const setScale = useDebounceFn(() => {
    scale.value = getScale();
    if (ScaleBox.value !== null) {
        ScaleBox.value.style.setProperty("--scale", scale.value + '');
    }
}, 200)

onMounted(() => {
    setScale();
    window.addEventListener("resize", setScale);
    setTimeout(() => {
        ScaleBox.value!.style.transition = '0.3s'
    }, 1000);
})

onUnmounted(() => {
    window.removeEventListener('resize', setScale)
})

</script>
 
<style lang="less">
#ScaleBox {
    --scale: 1;
}

.ScaleBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: scale(var(--scale)) translate(-50%, -50%);
    transform-origin: 0 0;
    display: flex;
    flex-direction: column;
    // transition: 0.3s;
    z-index: 999;
}
</style>
 
